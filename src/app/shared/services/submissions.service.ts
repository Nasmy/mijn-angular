import { Injectable, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Submission, ResponseApi } from '@shared/models';
import { debounceTime, delay, map, switchMap, tap ,catchError} from 'rxjs/operators';

import { AES, enc, mode, pad, Format, algo } from 'crypto-js';
import { EncryptionService } from '@shared/services';
import { DatePipe } from '@angular/common';
import { AlertService } from '@shared/services/alert.service';

@Injectable({ providedIn: 'root' })

export class SubmissionsService {

  constructor(  
    private http: HttpClient,
    private pipe: DatePipe,
    private encriptionService: EncryptionService,
    private alertService: AlertService
  ) { }

  createSubmission(submission: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/submission`, submission);
  }
  
  updateSubmission(id, params): Observable<any> {
    
    return this.http.put(`${environment.apiBaseUrl}/submission/${id}`, params);
    
    /*return this.http.put(`${environment.apiBaseUrl}/submission/${id}`, params)
      .pipe(map((responseForm:ResponseApi<Submission>) => {
        return new ResponseApi(responseForm).data;
      })); */
  }

  deleteSubmission(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/submission/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

  getAllSubmissions() {
    return this.http.get(`${environment.apiBaseUrl}/submission`);
  }    

  getById(id: string) {
    return this.http.get<ResponseApi<Submission>>(`${environment.apiBaseUrl}/submission/${id}`);
  }

  /*getAllForms() {
    return this.http.get<ResponseApi<Form[]>>(`${environment.apiUrl}/Form/`);
  }*/

  /*searchFormsByCompany(nCompanyId: number,FormKey: Form,pageSize: number,pageNumber: number) {
    return this.http.post(`${environment.apiUrl}/companies/Forms/${nCompanyId}/search?pagesize=${pageSize}&pagenumber=${pageNumber}`,FormKey)
            .pipe(map((ResponseData: ResponseApi<Array<Form>>) => 
               {                         
                  this._Forms$.next(ResponseData.data);  
                  this._total$.next(ResponseData.totalRecords);             
                  return ResponseData;
               }
              ))
              .toPromise()
              .catch(this.alertService.handleError);
  }
  
  
  searchForms(nCompanyId: number,oSearchParams: Form){  
    this._searchParams$.next(oSearchParams);
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
        debounceTime(100),
        switchMap(() => this._search(nCompanyId,this._searchParams$.value)),
        delay(10),
        tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._Forms$.next(result.Forms);
      this._total$.next(result.total);
    });
    this._search$.next();  
  }
  
  private _search(nCompanyId: number,oSearchParams: Form): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    if (this._onSearch$.value == false) {
      this._onSearch$.next(true);
  
      return from(this.searchFormsByCompany(nCompanyId,oSearchParams, pageSize, page).then((dataResponse: ResponseApi<Array<Form>>) => {
        // 1. sort
        let Forms = sort(dataResponse.data, sortColumn, sortDirection);
  
        // 2. filter
        if (searchTerm != "") {
          Forms = Forms.filter(company => matches(company, searchTerm, this.pipe));
        }
  
        //const total = Forms.length;
        const total = dataResponse.totalRecords;
  
        // 3. paginate if you have all elements in once
        // Forms = Forms.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  
        this._onSearch$.next(false);
        return { Forms, total };
      }))
    }
    else {
  
      const Forms = sort(this._Forms$.value, sortColumn, sortDirection);
      const total = this._total$.value;
      return of({ Forms:Forms, total });
    }
  
  }
  
  resetSearchResult(){
    this._Forms$.next([]);
    this.page=1;
  }
  onEditReset(){
    this._Form$.next(null);
  }
  
  onEditAdd(oForm: Form){
    this._Form$.next(oForm);
  }
  

  processError(err) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }

  public getAbsoluteDomainUrl(): string {
    if (window
      && "location" in window
      && "protocol" in window.location
      && "host" in window.location) {
      return window.location.protocol + "//" + window.location.host;
    }
    return null;
  }*/
 
 
}



//Functions for pagination
/*const compare = (v1: string | number | Array<number>| boolean|Date | Array<Licenses>| Array<Licenses_Packages>, v2: string | number | Array<number> | boolean|Date | Array<Licenses>| Array<Licenses_Packages>) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(Forms: Form[], column: SortColumn<Form>, direction: string): Form[] {
  if (direction === '' || column === '') {
    return Forms;
  } else {
    return [...Forms].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(Form: Form, term: string, pipe: PipeTransform) {
  return Form.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(Form.name).includes(term)
    || pipe.transform(Form.name).includes(term);
}

interface SearchResult {
  Forms: Form[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<Form>;
  sortDirection: SortDirection;
}*/