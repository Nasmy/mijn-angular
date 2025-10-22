import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from, Subject, of } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap ,catchError,first} from 'rxjs/operators';
import { Guid, Layers, Layer_legend, klimConfigs, ResponseApi } from '@shared/models';
import { environment } from '@env/environment';
import { AlertService} from '@shared/services/alert.service';
import { SortColumn, SortDirection } from '@shared/directives/sortable.directive';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KlimConfigService {
  private _MyConfigs$: BehaviorSubject<klimConfigs> = new BehaviorSubject<klimConfigs>(null);
  public  MyConfigs$$: Observable<klimConfigs> = this._MyConfigs$.asObservable();

  private _Configs$: BehaviorSubject<klimConfigs> = new BehaviorSubject<klimConfigs>(null);
  public  Configs$$: Observable<klimConfigs> = this._Configs$.asObservable();

  private _lstConfigs$: BehaviorSubject<Array<klimConfigs>> = new BehaviorSubject<Array<klimConfigs>>(null);
  public  lstConfigs$$: Observable<Array<klimConfigs>> = this._lstConfigs$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _onSearch$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchParams$ = new BehaviorSubject<klimConfigs>(null);

  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
      page: 1,
      pageSize: 20,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    };



  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get searchParams$() { return this._searchParams$.asObservable(); }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  
  set sortColumn(sortColumn: SortColumn<klimConfigs>) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }




  public get PackageValue(): klimConfigs {
    return this._Configs$.value;
  }

  Mydata: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService:AlertService,
    private pipe: DatePipe,
    ) { }


  public getById(nId: number): Observable<klimConfigs>{
      return from(this._getById(nId).then((data: klimConfigs) => {
        this._Configs$.next(data);
        return data;

      }))
  }

  private _getByClientTypeId(nId: number) {
    return this.http.get(`${environment.apiBaseUrl}/configklim/clienttype/${nId}`).pipe(
      map((dataResponse: ResponseApi<klimConfigs>) =>  this.Mydata = dataResponse.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  
  public getByClientTypeId(nId: number): Observable<klimConfigs>{
    return from(this._getByClientTypeId(nId).then((data: klimConfigs) => {
      this._MyConfigs$.next(data);
      return data;
    }))
}

private _getById(nId: number) {
  return this.http.get(`${environment.apiBaseUrl}/configklim/${nId}`).pipe(
    map((dataResponse: ResponseApi<klimConfigs>) =>  this.Mydata = dataResponse.data ))
    .toPromise()
    .catch(this.alertService.handleError);
}


  create(oPackage: klimConfigs) {
    return this.http.post(`${environment.apiBaseUrl}/configklim/`, oPackage);
  }

  update(id, params) {
    return this.http.put(`${environment.apiBaseUrl}/configklim/${id}`, params)
      .pipe(map(x => {       
        if (this.PackageValue!=null && id == this.PackageValue.id) {          
          const pack = { ...this.PackageValue, ...params }; 
          this._Configs$.next(pack);
        }
        return new ResponseApi(x).data;
      }));
  }

  delete(id) {
    return this.http.delete(`${environment.apiBaseUrl}/configklim/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

  public  getAll(): Observable<Array<klimConfigs>>{
      return from(this._getAll().then((data: Array<klimConfigs>) => {
        this._lstConfigs$.next(data);
        return data;
      }))
  }

  private _getAll() {
    return this.http.get(`${environment.apiBaseUrl}/configklim`).pipe(
      map((dataResponse: ResponseApi<Array<klimConfigs>>) =>  this.Mydata = dataResponse.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


  
  searchConfigs(oSearchParams: klimConfigs){  
    this._searchParams$.next(oSearchParams);
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
        debounceTime(100),
        //switchMap(() => this._search(this._searchParams$.value)),
        switchMap(() => this._search()),
        delay(10),
        tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._lstConfigs$.next(result.packages);
      this._total$.next(result.total);
    });
    this._search$.next();  
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    if (this._onSearch$.value == false) {
        this._onSearch$.next(true);      
        const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;    
        // 1. sort
        
        let packagesTemp= sort(this._lstConfigs$.value, sortColumn, sortDirection);    
        // 2. filter
        packagesTemp = packagesTemp.filter(tests => matches(tests, searchTerm, this.pipe));
        const  total = packagesTemp.length;    
        // 3. paginate
        let ReferenceArray= [...packagesTemp];
        ReferenceArray = ReferenceArray.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        this._onSearch$.next(false);
        return of({packages:ReferenceArray, total});  

      
    }
    else {
      const packagesTemp = sort(this._lstConfigs$.value, sortColumn, sortDirection);
      const total = this._total$.value;
      return of({ packages:packagesTemp, total });
    }
 
  }


public resetSearchResult(){
  this._lstConfigs$.next(null);
}


public onAddPackage(){
  const oNewPackage=new klimConfigs();
  oNewPackage.clientType="New Klim Configuration";
  //oNewPackage.active=true;
  //oNewPackage.total_req=100;
  //oNewPackage.sGuid=Guid.newGuid().toString();

  const TmpPackages=this._lstConfigs$.value;
  TmpPackages.unshift(oNewPackage);
  this._lstConfigs$.next(TmpPackages);
}

addOrUpdate(oOldObject: klimConfigs,oNewObject: klimConfigs){
  const TmpPackages=this._lstConfigs$.value;
  const index=TmpPackages.findIndex(elem=>{return elem.id==oOldObject.id})
  if(index>=0){
    TmpPackages[index]=oNewObject;
  }
 
  this._lstConfigs$.next(TmpPackages);
}

}




//Functions for pagination
const compare = (v1: string | number | Array<number>| boolean|Date , v2: string | number | Array<number> | boolean|Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(requests: klimConfigs[], column: SortColumn<klimConfigs>, direction: string): klimConfigs[] {
  if (direction === '' || column === '') {
    return requests;
  } else {
    return [...requests].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(packages: klimConfigs, term: string, pipe: PipeTransform) {
  return packages.clientType.toLowerCase().includes(term.toLowerCase())
    //|| pipe.transform(packages.total_req).includes(term);
}

interface SearchResult {
  packages: Array<klimConfigs>;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<klimConfigs>;
  sortDirection: SortDirection;
}
