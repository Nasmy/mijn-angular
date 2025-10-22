import { Injectable, Injector, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, from, Subject, of } from 'rxjs';
import { debounceTime, delay, first, map, switchMap, tap } from 'rxjs/operators';
import { Combo, Permit_projects, ProspectionParcelAttribute, ResponseApi} from '@models/index';
import { AlertService} from '@services/alert.service';
// import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SortColumn, SortDirection } from '@directives/sortable.directive';
import Multipoint from "@arcgis/core/geometry/Multipoint";
import * as query from "@arcgis/core/rest/query.js";
import config from '@arcgis/core/config';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export  class EnvironmentalpermitsLocalService
{

  private _searchProjects: BehaviorSubject<Array<Permit_projects>>=new BehaviorSubject<Array<Permit_projects>>([]);
  public  searchProjects: Observable<Array<Permit_projects>>=this._searchProjects.asObservable();

  private _searchProjectsFiltered: BehaviorSubject<Array<Permit_projects>>=new BehaviorSubject<Array<Permit_projects>>([]);
  public  searchProjectsFiltered: Observable<Array<Permit_projects>>=this._searchProjectsFiltered.asObservable();


  private _loading$ = new BehaviorSubject<boolean>(false);
  private _onSearch$ = new BehaviorSubject<boolean>(false);

  private _resetSearch$ = new BehaviorSubject<boolean>(true);
  

  private _search$ = new Subject<void>();
  private _searchParams$ = new BehaviorSubject<SearchParams>(null);

  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
    page: 0,
    pageSize: 10000,
    searchTerm: {},
    sortColumn: '',
    sortDirection: ''
  };

   arrCombos: { [key: string]: Array<Combo> } = {};
// get companies$() { return this._companies$.asObservable(); }
 get total$() { return this._total$.asObservable(); }
 get loading$() { return this._loading$.asObservable(); }
 get page() { return this._state.page; }
 get pageSize() { return this._state.pageSize; }
 get searchTerm() { return this._state.searchTerm; }
 get searchParams$() { return this._searchParams$.asObservable(); }
 get projetsArray$() { return this._searchProjects.value }

 set page(page: number) { this._set({page}); }
 set pageSize(pageSize: number) { this._set({pageSize}); }
 set searchTerm(searchTerm: { [key: string]: any }) { this._set({searchTerm}); }
 
 set sortColumn(sortColumn: SortColumn<ProspectionParcelAttribute>) { this._set({sortColumn}); }
 set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
 set resetSearch(reset: boolean) { this._resetSearch$.next(reset); }

 private _set(patch: Partial<State>) {
   Object.assign(this._state, patch);
   this._search$.next();
 }

 clearSearch(){
  this._searchProjects.next([]);
}

  constructor(    
    public http: HttpClient,
    private alertService: AlertService,
    private pipe: DatePipe,
    private translateService: TranslateService,
    )
    {
      config.request.timeout = 30000;
    }
    
  set setProjects(value){
      this._searchProjects.next(value);
  }

  set setProjectsFiltered(value){
      this._searchProjectsFiltered.next(value);
  }


  async  searchingProjectsLocal(searchParams:SearchParams) {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    
      return new Promise((resolve, reject) => {
        return  this.http.post(`${environment.apiBaseUrl}/environmentalpermit/project/search?pageNumber=${page}&pageSize=${pageSize}`, searchParams)
                  .pipe(map((ResponseData: any) => 
                      {  
                        this._total$.next(ResponseData?.totalRecords);
                        resolve(ResponseData.data);                                        
                      }
                    ))
                    .toPromise()
                    .catch(this.alertService.handleError);               
            })
    }

 public ExportLocal(searchParams:SearchParams) { 
          return  this.http.post(`${environment.apiBaseUrl}/environmentalpermit/project/export`, searchParams)
          .pipe(
            map((ResponseData: ResponseApi<Array<any>>) => 
              {  
               return ResponseData.data;                                 
              }
          ));           
  }

  public searchLocal(searchParams:SearchParams){  
      this._searchParams$.next(searchParams);
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
          debounceTime(250),
          switchMap(() => this._searchLocal(this._searchParams$.value)),
          delay(10)
      ).subscribe(result => {
        this._searchProjects.next(result.projects);
        this._loading$.next(false);
        this._onSearch$.next(false);
        

      });      
      
      this._search$.next();  
    }

  public _searchLocal(searchParams: SearchParams): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      if (this._onSearch$.value == false) {
        this._onSearch$.next(true);

          if (searchTerm != undefined && Object.keys(searchTerm).length > 0) {
              Object.keys(searchTerm).forEach(key => {              
                 searchParams[key] = searchTerm[key];                
              })
              //projects = projects.filter(capa => matches(capa, searchTerm, this.pipe));
            }

          return from(this.searchingProjectsLocal(searchParams).then((dataResponse: Array<Permit_projects>) => {
            // 1. sort
            let projects = sort(dataResponse, sortColumn, sortDirection);
      
            // 2. filter
            /*if (searchTerm != undefined && Object.keys(searchTerm).length > 0) {
              Object.keys(searchTerm).forEach(key => {
                if (searchTerm[key] && searchTerm[key].length > 0) {
                  projects = projects.filter(capa => matches(capa, searchTerm, this.pipe));
                }
              })
              //projects = projects.filter(capa => matches(capa, searchTerm, this.pipe));
            }*/
      
            //const total = users.length;
            const total = dataResponse.length;
      
            // 3. paginate if you have all elements in once
            //projects = projects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      
            this._onSearch$.next(false);
            this._resetSearch$.next(false);
           
            return { projects, total };
          }))
        
      }
      else {
    
        const projects = sort(this._searchProjects.value, sortColumn, sortDirection);
        const total = this._total$.value;
        //this._onSearch$.next(false);
        return of({ projects, total });
      }
    }


    public saveProjectIntoHistory(arrProjects: Array<Permit_projects>){
      return this.http.post(`${environment.apiBaseUrl}/EnvironmentalPermit`,arrProjects)
      .pipe(
        map( (dataResponse: any)=> {

        })
      )
    }

LoadProjectDetails(nProjectId:string){
  return  this.http.get(`${environment.apiBaseUrl}/environmentalpermit/project/${nProjectId}`)
  .pipe(map((ResponseData: ResponseApi<any>) => 
      {  
            return ResponseData.data;                      
      }
    ))            
  }

}

interface State {
  page: number;
  pageSize: number;
  searchTerm: { [key: string]: any};
  sortColumn: SortColumn<Permit_projects>;
  sortDirection: SortDirection;
}

interface SearchResult {
  projects: Permit_projects[];
  total: number;
}

interface SearchParams {
  uuid: string;
  adress: string;
  project_number: string;
  project_name: string;
  screening_city: string;
  date_from: string;
  date_to: string;
  betreft: string;
  betrefts: Array<string>;
  zipcodes: string;
  beslising: string;
}

//Functions
const compare = (v1: string | number | Array<number>| boolean|Date , v2: string | number | Array<number> | boolean|Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(capakeys: Permit_projects[], column: SortColumn<Permit_projects>, direction: string): Permit_projects[] {
  if (direction === '' || column === '') {
    return capakeys;
  } else {
    return [...capakeys].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(parcel: Permit_projects, term: string, pipe: PipeTransform) {
  return parcel.uuid.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(parcel.puuid).includes(term)
    || pipe.transform(parcel.behandelendeOverheid).includes(term)
    || pipe.transform(parcel.projectnummer).includes(term)
    || pipe.transform(parcel.adres).includes(term)
    || pipe.transform(parcel.projectNaam).includes(term);
}





