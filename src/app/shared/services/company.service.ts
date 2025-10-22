import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from, Subject, of } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import {SortColumn, SortDirection} from '@shared/directives/sortable.directive';


import { environment } from '@env/environment';
import { Company, CompanyLicense, Licenses, Licenses_Packages, ResponseApi } from '@shared/models';
import { DatePipe } from '@angular/common';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
   private _companies$ = new BehaviorSubject<Array<Company>>([]);
   public  companies$$: Observable<Array<Company>> = this._companies$.asObservable();
   private _company$: BehaviorSubject<Company> = new BehaviorSubject<Company>(null);
   public  company$$: Observable<Company> = this._company$.asObservable();

   private _companyEdit$: BehaviorSubject<Company> = new BehaviorSubject<Company>(null);
   public  companyEdit$$: Observable<Company> = this._companyEdit$.asObservable();

   private companieLicense$: BehaviorSubject<CompanyLicense> = new BehaviorSubject<CompanyLicense>(null);
   public  companieLicense$$: Observable<CompanyLicense> = this.companieLicense$.asObservable();
   public Mydata: any

   private _loading$ = new BehaviorSubject<boolean>(true);
   private _onSearch$ = new BehaviorSubject<boolean>(false);
   private _search$ = new Subject<void>();
   private _searchParams$ = new BehaviorSubject<Company>(null);
 
   private _total$ = new BehaviorSubject<number>(0);
   private _state: State = {
     page: 1,
     pageSize: 20,
     searchTerm: '',
     sortColumn: '',
     sortDirection: ''
   };

 // get companies$() { return this._companies$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get searchParams$() { return this._searchParams$.asObservable(); }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  
  set sortColumn(sortColumn: SortColumn<Company>) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private pipe: DatePipe,
    private accountService: AuthService,
    private alertService: AlertService,
  ) {
    /*
      if  (environment.production==false){
        this.companies$ = new BehaviorSubject<Company>(JSON.parse(localStorage.getItem('defaultCompany')));
        this.companies$$ = this.companies$.asObservable();
      }
    */

  }


  public get companyValue(): Company {
    return this._company$.value;
  }

  public get companyEditValue(): Company {
    return this._companyEdit$.value;
  }



public  getMyCompany(id: number): Observable<Company>{
    return from(this._getCompany(id).then((data: Company) => {
     this._company$.next(data);     
      return data;   
    }))
  }

  public  getCompanyByID(id: number): Observable<Company>{
    return from(this._getCompany(id).then((data: Company) => {  
        this._companyEdit$.next(data); 
        return data;   
    }))
  }

private _getCompany(id: number) {
  return this.http.get(`${environment.apiBaseUrl}/companies/${id}`).pipe(
    map((dataCompany: ResponseApi<Company>) =>  this.Mydata = dataCompany.data ))
    .toPromise()
    .catch(this.alertService.handleError);
}

public  checkBIVNumber(bivnumber: string){
  return this.http.get(`${environment.apiBaseUrl}/companies/bivcheck?biv=${bivnumber}`);
}


updateMyCompany(id, params) {
  params.id=id;
  return this.http.put(`${environment.apiBaseUrl}/companies/${id}`, params)
      .pipe(map((dataCompany: ResponseApi<Company>) => {
          // update stored user if the logged in user updated their own record
          if (this.companyValue ==null || id == this.companyValue.id  ) {
            const company = { ...this.companyValue, ...params };              
            this._company$.next(company);
          }
          return dataCompany.data;
      }));
}

updateCompanyOnEdit(id, params) {
  params.id=id;
  return this.http.put(`${environment.apiBaseUrl}/companies/${id}`, params)
      .pipe(map((dataCompany: ResponseApi<Company>) => {
          // update stored user if the logged in user updated their own record         
          if (this.companyEditValue ==null || id == this.companyEditValue.id  ) {
            const company = { ...this.companyEditValue, ...params};
            company.id=dataCompany.data.id;
            this._companyEdit$.next(company);
          }
          return dataCompany.data;
      }));
}


AddCompany(company: Company) {
  return this.http.post(`${environment.apiBaseUrl}/companies`, company);
}


delete(id: number) {
  return this.http.delete(`${environment.apiBaseUrl}/companies/${id}`)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.companyValue.id) {
              this.logout();
          }
          return x;
      }));
}



public  getCompanyLicense(id: string): Observable<CompanyLicense>{
  return from(this._getCompanyLicense(id).then((data: CompanyLicense) => {
    
    this.companieLicense$.next(data);
    return data;
 
  }))
}

private _getCompanyLicense(id: string) {
return this.http.get(`${environment.apiBaseUrl}/companylicense/${id}`).pipe(
  map((dataCompany: ResponseApi<CompanyLicense>) =>  this.Mydata = dataCompany.data ))
  .toPromise()
  .catch(this.alertService.handleError);
}







logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');  
  this.router.navigate(['/account/login']);
}




searchCompany(contactKey: Company,pageSize: number,pageNumber: number) {
  return this.http.post(`${environment.apiBaseUrl}/companies/search?pagesize=${pageSize}&pagenumber=${pageNumber}`,contactKey)
          .pipe(map((ResponseData: ResponseApi<Array<Company>>) => 
             {                         
                this._companies$.next(ResponseData.data);  
                this._total$.next(ResponseData.totalRecords);             
                return ResponseData;
             }
            ))
            .toPromise()
            .catch(this.alertService.handleError);
}


searchCompanies(oSearchParams: Company){  
  this._searchParams$.next(oSearchParams);
  this._search$.pipe(
    tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(() => this._search(this._searchParams$.value)),
      delay(10),
      tap(() => this._loading$.next(false))
  ).subscribe(result => {
    this._companies$.next(result.companies);
    this._total$.next(result.total);
  });
  this._search$.next();  
}

private _search(oSearchParams: Company): Observable<SearchResult> {
  const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
  if (this._onSearch$.value == false) {
    this._onSearch$.next(true);

    return from(this.searchCompany(oSearchParams, pageSize, page).then((dataResponse: ResponseApi<Array<Company>>) => {
      // 1. sort
      let companies = sort(dataResponse.data, sortColumn, sortDirection);

      // 2. filter
      if (searchTerm != "") {
        companies = companies.filter(company => matches(company, searchTerm, this.pipe));
      }

      //const total = users.length;
      const total = dataResponse.totalRecords;

      // 3. paginate if you have all elements in once
      // users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

      this._onSearch$.next(false);
      return { companies, total };
    }))
  }
  else {

    const companies = sort(this._companies$.value, sortColumn, sortDirection);
    const total = this._total$.value;
    return of({ companies, total });
  }

}

resetSearchResult(){
  this._companies$.next([]);
}
onEditReset(){
  this._companyEdit$.next(null);
}

onEditAdd(oCompany: Company){
  this._companyEdit$.next(oCompany);
}


public updateSecurityByCompany(id, params) {
  const myData: any = new Object();
  myData.modules = new Object();
  myData.modules = params;

  return this.http.put(`${environment.apiBaseUrl}/access/company/${id}`, myData)
    .pipe(map(data => {
      // update stored user if the logged in user updated their own record
      if (this.companyEditValue!=null && id == this.accountService.userValue.client_id) {
        if (this.accountService.userValue.company_admin==true){
            this.accountService.loadSecurityByCompanyId(id);
        }else{
          this.accountService.loadSecurityByUserID(this.accountService.userValue.id);
        }
      }
      return data;
    }));
}

public async loadSecurityByCompanyId(nCompanyId: number) {
  return await this.http.get(`${environment.apiBaseUrl}/access/company/${nCompanyId}`)
    .pipe(
      map(data => {
        if (data != undefined) {
          return new ResponseApi(data).data
        }
        return new ResponseApi(null);
      }),
      catchError( this.alertService.handleError)
    ).toPromise()
}

public async adminloadSecurityByCompanyId(nCompanyId: number) {
  if(nCompanyId!=undefined){
    return await this.http.get(`${environment.apiBaseUrl}/access/admin/company/${nCompanyId}`)
      .pipe(
        map(data => {
          if (data != undefined) {
            return new ResponseApi(data).data
          }
          return new ResponseApi(null);
        }),
        catchError(this.alertService.handleError)
      ).toPromise()
  }else{
    return new ResponseApi(null);
  }
}


}


//Functions
const compare = (v1: string | number | Array<number>| boolean|Date | Array<Licenses>| Array<Licenses_Packages>, v2: string | number | Array<number> | boolean|Date | Array<Licenses>| Array<Licenses_Packages>) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(companies: Company[], column: SortColumn<Company>, direction: string): Company[] {
  if (direction === '' || column === '') {
    return companies;
  } else {
    return [...companies].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(company: Company, term: string, pipe: PipeTransform) {
  return company.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(company.name).includes(term)
    || pipe.transform(company.name).includes(term);
}

interface SearchResult {
  companies: Company[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<Company>;
  sortDirection: SortDirection;
}
