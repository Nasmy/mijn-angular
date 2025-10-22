import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { SortColumn,SortDirection } from '@shared/directives/sortable.directive';
import { FileTemplates, ResponseApi, Templates } from '@shared/models';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, from, map, of, switchMap, tap, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AuthService } from '@shared/services';
import { User } from '@shared/models';


interface SearchResult {
  templates: Templates[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<Templates>;
  sortDirection: SortDirection;
}



const compare = (v1: string | number | Array<number>| boolean | Array<string> | Date , v2: string | number | Array<number> | boolean | Array<string>| Date ) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(user_test: Templates[], column: SortColumn<Templates>, direction: string): Templates[] {
  if (direction === '' || column === '') {
    return user_test;
  } else {
    return [...user_test].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(utest: Templates, term: string, pipe: PipeTransform) {
  return ""+utest.id==term
  || term=="";
   
}

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private _lstTemplates$ = new BehaviorSubject<Array<Templates>>([]);
  public _lstTemplates$$: Observable<Array<Templates>> = this._lstTemplates$.asObservable();


  private _loading$ = new BehaviorSubject<boolean>(true);
  private _onSearch$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchParams$ = new BehaviorSubject<Templates>(null);
  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  private _templates$ = new BehaviorSubject<Array<Templates>>([]);
  get templates$() { return this._templates$.asObservable(); }
  get templatesValue() { return this._templates$.value; }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get searchParams$() { return this._searchParams$.asObservable(); }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  
  set sortColumn(sortColumn: SortColumn<Templates>) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private user: User;
  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  private Mydata: any

  constructor(
    private http: HttpClient,
    private pipe: DatePipe,
    private accountService: AuthService , 
  ) {
    this.user = this.accountService.userValue;

   }

getCountPerCategoryId(id: string){
    return this.http.get(`${environment.apiBaseUrl}/templates/count/${id}`)
  }

staredTemplate(id: string){
    return this.http.put(`${environment.apiBaseUrl}/templates/stared/${id}`,{})
}

downloadTemplate(id: string){
  return this.http.put(`${environment.apiBaseUrl}/templates/download/${id}`,{})
}
getById(id: string){
  return this.http.get(`${environment.apiBaseUrl}/templates/${id}`)
}

create(template: Templates){
  return this.http.post(`${environment.apiBaseUrl}/templates/admin`,template)
}


update(id:string,template: Templates){
  return this.http.put(`${environment.apiBaseUrl}/templates/admin/${id}`,template)
}

delete(id: string){
  return this.http.delete(`${environment.apiBaseUrl}/templates/admin/${id}`)
}


createFile(template: Templates){
  return this.http.post(`${environment.apiBaseUrl}/templates/saved`,template)
}

updateFile(id:string,template: Templates){
  return this.http.put(`${environment.apiBaseUrl}/templates/saved/${id}`,template)
}

deleteFile(id: string){
  return this.http.delete(`${environment.apiBaseUrl}/templates/saved/${id}`)
}

updateListValue(template:Templates,prop,value){

  let lstTemplates = this._lstTemplates$.value;
  let index = lstTemplates.findIndex(templ=>{return templ.id === template.id});
  if (index>=0) {
    lstTemplates[index][prop]=value;
    this._lstTemplates$.next(lstTemplates);
  }
}

search(oSearchParams: Templates){
  //demo loading    
  this._searchParams$.next(oSearchParams);
  this._search$.pipe(
    tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(() => this._search(this._searchParams$.value)),
      delay(10),
      tap(() => this._loading$.next(false))
  ).subscribe(result => {
    this._templates$.next(result.templates);
    this._total$.next(result.total);
  });
  this._search$.next();    
}

private _search(oSearchParams: Templates): Observable<SearchResult> {
  const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
  if (this._onSearch$.value == false) {
    this._onSearch$.next(true);

    return from(this.searchTemplates(oSearchParams, pageSize, page).then((dataResponse: ResponseApi<Array<Templates>>) => {
      // 1. sort
      let templates = sort(dataResponse.data, sortColumn, sortDirection);

      // 2. filter
      if (searchTerm != "") {
        templates = templates.filter(company => matches(company, searchTerm, this.pipe));
      }

      //const total = users.length;
      const total = dataResponse.totalRecords;

      // 3. paginate if you have all elements in once
      // users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

      this._onSearch$.next(false);
      return { templates, total };
    }))
  }
  else {

    let templates = sort(this._lstTemplates$.value, sortColumn, sortDirection);
    const total = this._total$.value;
    return of({ templates, total });
  }

}

createFileTemplates(template: FileTemplates){
  return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/filemanagment/template`,template);
}

updateFileTemplate(id: string,fileManagmentId:number,template: FileTemplates){
  return this.http.put(`${environment.apiBaseUrl}/${this.user.client_id}/filemanagment/template/${fileManagmentId}/${id}`,template);
}
deleteFileTemplate(id: string,fileManagmentId:number){
  return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/filemanagment/template/${fileManagmentId}/${id}`);
}

loadFileTemplatesByFilemanagment(id: number){
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/filemanagment/template/${id}`);
}

loadFileTemplatesByid(id: string,fileManagmentId:number){
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/filemanagment/template/${fileManagmentId}/${id}`);
}


searchTemplates(contactKey: Templates,pageSize: number,pageNumber: number) {
  return this.http.post(`${environment.apiBaseUrl}/templates/admin/search?pagesize=${pageSize}&pagenumber=${pageNumber}`,contactKey)
          .pipe(map((usersData: ResponseApi<Array<Templates>>) => 
             {                         
                this._lstTemplates$.next(usersData.data);  
                this._total$.next(usersData.totalRecords);             
                return usersData;
             }
            ))
            .toPromise()
            .catch(this.handleError);
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.

    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);

  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}


}
