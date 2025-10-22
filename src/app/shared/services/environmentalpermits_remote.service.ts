import { Injectable, Injector, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, from, Subject, of } from 'rxjs';
import { debounceTime, delay, first, map, switchMap, tap } from 'rxjs/operators';
import { BoundingBox} from '@models/boundingBox.model';
import { Permit_projects} from '@models/prermit_projects.model';
import { ProspectionParcelAttribute} from '@models/prospection_parcels.model';

//import { BoundingBox, Permit_projects, ProspectionParcelAttribute, ProspectionParcels} from '@models/';
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
export  class EnvironmentalpermitsRemoteService
{

  private _searchPoints: BehaviorSubject<Array<Permit_projects>>=new BehaviorSubject<Array<Permit_projects>>([]);
  public  searchPoints: Observable<Array<Permit_projects>>=this._searchPoints.asObservable();

  private _searchPointsFiltered: BehaviorSubject<Array<Permit_projects>>=new BehaviorSubject<Array<Permit_projects>>([]);
  public  searchPointsFiltered: Observable<Array<Permit_projects>>=this._searchPointsFiltered.asObservable();

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
 get projetsArray$() { return this._searchProjects.value }

 set page(page: number) { this._set({page}); }
 set pageSize(pageSize: number) { this._set({pageSize}); }
 set searchTerm(searchTerm: string) { this._set({searchTerm}); }
 
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

    public async  searchingPoints(bbox:BoundingBox,filter_publication: Array<string>,filter_goverment: Array<string>){  
     let  searchParams:SearchParams= <SearchParams>{bbox:bbox,filter_publication:filter_publication,filter_goverment:filter_goverment}
      
     let arrPub:Array<Object>=[];
     let arrGov:Array<Object>=[];
     let body:Array<object>=[];
     
     let bboxSearch= 
       {
               "filterType":"BOUNDING_BOX",
               "abstractFilterInhoud":
               {
                   "@type":"InzageFilterinhoudMetBoundingBox",
                   "boundingBoxResource":{
                       "minX":searchParams.bbox.lowerLeft.x,
                       "minY":searchParams.bbox.lowerLeft.y,
                       "maxX":searchParams.bbox.upperRight.x,
                       "maxY":searchParams.bbox.upperRight.y
                       },
                   "coordinatenStelsel":"EPSG:31370"
               }
       }      
       
       body.push(bboxSearch);
 
       if(searchParams.filter_publication!=undefined){
        
         searchParams.filter_publication.forEach(elPublication=>{
           if(elPublication=="1"){
             arrPub.push("OPENBAARONDERZOEK");   
           }else if (elPublication=="2"){
             arrPub.push("BESLISSING");        
           }else if (elPublication=="3"){
             arrPub.push("AKTENAME");
           }          
         })
 
         let bodyFIlterPublication={
             "filterType":"INZAGE_GEGEVENS_TYPE",
             "abstractFilterInhoud":
             {
               "@type":"InzageFilterInhoudMetInzageGegevensType",
               "inzageGegevensTypeEnumSet":arrPub
             }
           }
           arrPub.length>0? body.push(bodyFIlterPublication):"";         
       }
 
       if(searchParams.filter_goverment!=undefined){
        
         searchParams.filter_goverment.forEach(elPublication=>{
           if(elPublication=="1"){
             arrGov.push("GEMEENTE");   
           }else if (elPublication=="2"){
             arrGov.push("PROVINCIE");        
           }else if (elPublication=="3"){
             arrGov.push("GEWEST");
           }          
         })
         let bodyFIlterGoverment={
             "filterType":"VVO",
             "abstractFilterInhoud":{
               "@type":"InzageFilterInhoudMetVvoType",
               "aviTypeEnumSet":arrGov
             }
           }
           arrGov.length>0? body.push(bodyFIlterGoverment):"";         
       }
      
        return new Promise((resolve) => {
          const PostObject: any = new Object();
          PostObject.url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/inzage/projecten/punten`;
          PostObject.body = JSON.stringify(body);
  
       return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject)
                .pipe(map((ResponseData: any) => 
                    {  
                      this._searchPoints.next(ResponseData);
                      resolve(ResponseData.content);                                        
                    }
                  ))
                  .toPromise()
                  .catch(this.alertService.handleError);
                 
          })
      }

  async  searchingProjectsRemote(searchParams:SearchParams) {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    let arrPub:Array<Object>=[];
    let arrGov:Array<Object>=[];
    let body:Array<object>=[];
    
    let bboxSearch= 
      {
              "filterType":"BOUNDING_BOX",
              "abstractFilterInhoud":
              {
                  "@type":"InzageFilterinhoudMetBoundingBox",
                  "boundingBoxResource":{
                      "minX":searchParams.bbox.lowerLeft.x,
                      "minY":searchParams.bbox.lowerLeft.y,
                      "maxX":searchParams.bbox.upperRight.x,
                      "maxY":searchParams.bbox.upperRight.y
                      },
                  "coordinatenStelsel":"EPSG:31370"
              }
      }      
      
      body.push(bboxSearch);

      if(searchParams.filter_publication!=undefined){
       
        searchParams.filter_publication.forEach(elPublication=>{
          if(elPublication=="1"){
            arrPub.push("OPENBAARONDERZOEK");   
          }else if (elPublication=="2"){
            arrPub.push("BESLISSING");        
          }else if (elPublication=="3"){
            arrPub.push("AKTENAME");
          }          
        })

        let bodyFIlterPublication={
            "filterType":"INZAGE_GEGEVENS_TYPE",
            "abstractFilterInhoud":
            {
              "@type":"InzageFilterInhoudMetInzageGegevensType",
              "inzageGegevensTypeEnumSet":arrPub
            }
          }
          arrPub.length>0? body.push(bodyFIlterPublication):"";         
      }

      if(searchParams.filter_goverment!=undefined){
       
        searchParams.filter_goverment.forEach(elPublication=>{
          if(elPublication=="1"){
            arrGov.push("GEMEENTE");   
          }else if (elPublication=="2"){
            arrGov.push("PROVINCIE");        
          }else if (elPublication=="3"){
            arrGov.push("GEWEST");
          }          
        })
        let bodyFIlterGoverment={
            "filterType":"VVO",
            "abstractFilterInhoud":{
              "@type":"InzageFilterInhoudMetVvoType",
              "aviTypeEnumSet":arrGov
            }
          }
          arrGov.length>0? body.push(bodyFIlterGoverment):"";         
      } 

    
      return new Promise((resolve, reject) => {
        const PostObject: any = new Object();
        PostObject.url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/inzage/projecten/zoeken?page=${page}&size=${pageSize}&sort=projectnummer`;
        PostObject.body = JSON.stringify(body);

     return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject)
              .pipe(map((ResponseData: any) => 
                  {  
                    this._total$.next(ResponseData?.totalElements);
                    resolve(ResponseData.content);                                        
                  }
                ))
                .toPromise()
                .catch(this.alertService.handleError);
               
        })
    }

  public searchRemote(bbox:BoundingBox,filter_publication: Array<string>,filter_goverment: Array<string>){  
      this._searchParams$.next({bbox:bbox,filter_publication:filter_publication,filter_goverment:filter_goverment});
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
          debounceTime(100),
          switchMap(() => this._searchRemote(this._searchParams$.value)),
          delay(10),
          tap(() => {})
      ).subscribe(result => {
        this._searchProjects.next(result.projects);
        this._loading$.next(false);
        

      });      
      
      this._search$.next();  
    }

  public _searchRemote(searchParams: SearchParams): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      if (this._onSearch$.value == false) {
        this._onSearch$.next(true);
          return from(this.searchingProjectsRemote(searchParams).then((dataResponse: Array<Permit_projects>) => {
            // 1. sort
            let projects = sort(dataResponse, sortColumn, sortDirection);
      
            // 2. filter
            if (searchTerm != "") {
              projects = projects.filter(capa => matches(capa, searchTerm, this.pipe));
            }
      
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
        this._onSearch$.next(false);
        return of({ projects, total });
      }
    }

    LoadParamProjectTypes(){
      const PostObject: any = new Object();
          PostObject.url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/parameters/75/code-lijst-waarden?categorie=PROJECT`;          
          const  reqData:any=new Object();
          PostObject.body=JSON.stringify(reqData);
  
       return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject)
          .pipe(map((ResponseData: Array<any>) => 
                    {  
                          return ResponseData;             
                    }
          ))               
      }

      LoadProjectCategorie(categorie:string,aard_code:string=""){
        const PostObject: any = new Object();
            PostObject.url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/parameters/75/code-lijst-waarden?categorie=${categorie}`; 
            if(aard_code!=""){
              PostObject.url+=`&dossier-inhoud-aard-code=${aard_code}`
            }         
            const  reqData:any=new Object();
            PostObject.body=JSON.stringify(reqData);
    
         return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject)
            .pipe(map((ResponseData: Array<any>) => 
                      {  
                            return ResponseData;             
                      }
            ))               
        }
      LoadProjectComponenttranslations(blockId:string){
          const PostObject: any = new Object();
              PostObject.url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/parameters/datablokDefinitie-form-io-formulier/${blockId}`; 
               
              const  reqData:any=new Object();
              PostObject.body=JSON.stringify(reqData);
      
           return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject)
              .pipe(map((ResponseData: any) => 
                  {  
                      return ResponseData;             
                  }
              ))               
          }
  
}    



interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<Permit_projects>;
  sortDirection: SortDirection;
}

interface SearchResult {
  projects: Permit_projects[];
  total: number;
}

interface SearchParams {
  bbox: BoundingBox;
  filter_publication: Array<string>
  filter_goverment: Array<string>
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





