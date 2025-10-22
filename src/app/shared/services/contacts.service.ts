import { Injectable, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Licenses, Licenses_Packages, ResponseApi, Contact } from '../models';
import { debounceTime, delay, map, switchMap, tap ,catchError} from 'rxjs/operators';

import { AES, enc, mode, pad, format, algo } from 'crypto-js';
import { EncryptionService } from './encryption.service';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { DatePipe } from '@angular/common';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ContactsService {

  private _contacts$ = new BehaviorSubject<Array<Contact>>([]);
  public contacts$$: Observable<Array<Contact>> = this._contacts$.asObservable();
  private _contact$: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(null);
  public contact$$: Observable<Contact> = this._contact$.asObservable();



  private _loading$ = new BehaviorSubject<boolean>(true);
  private _onSearch$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchParams$ = new BehaviorSubject<Contact>(null);

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
  
  set sortColumn(sortColumn: SortColumn<Contact>) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private contactAddedSource = new Subject<void>();
  contactAdded$ = this.contactAddedSource.asObservable();

  constructor(  
    private http: HttpClient,
    private pipe: DatePipe,
    private encriptionService: EncryptionService,
    private alertService: AlertService
  ) { }

  public get contactValue(): Contact {
    return this._contact$.value;
  }

  notifyContactAdded() {
    this.contactAddedSource.next();
  }

  getById(id: string) {
    return this.http.get<ResponseApi<Contact>>(`${environment.apiBaseUrl}/contact/${id}`);
  }

  create(contact: Contact) {
    return this.http.post(`${environment.apiBaseUrl}/contact/`, contact);
  }

  update(id, params) {
    //console.log(params);
    return this.http.put(`${environment.apiBaseUrl}/contact/${id}`, params);

    /*return this.http.put(`${environment.apiBaseUrl}/contact/${id}`, params)
      .pipe(map((responsecontact:ResponseApi<Contact>) => {
        return new ResponseApi(responsecontact).data;
      }));*/
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/contact/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }

  getAllContacts() {
    return this.http.get(`${environment.apiBaseUrl}/contact`);
}    
  /*getAllContacts() {
    return this.http.get<ResponseApi<Contact[]>>(`${environment.apiUrl}/contact/`);
  }*/

  searchcontactsByCompany(nCompanyId: number,contactKey: Contact,pageSize: number,pageNumber: number) {
    return this.http.post(`${environment.apiBaseUrl}/companies/contacts/${nCompanyId}/search?pagesize=${pageSize}&pagenumber=${pageNumber}`,contactKey)
            .pipe(map((ResponseData: ResponseApi<Array<Contact>>) => 
               {                         
                  this._contacts$.next(ResponseData.data);  
                  this._total$.next(ResponseData.totalRecords);             
                  return ResponseData;
               }
              ))
              .toPromise()
              .catch(this.alertService.handleError);
  }
  
  
  searchcontacts(nCompanyId: number,oSearchParams: Contact){  
    this._searchParams$.next(oSearchParams);
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
        debounceTime(100),
        switchMap(() => this._search(nCompanyId,this._searchParams$.value)),
        delay(10),
        tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._contacts$.next(result.contacts);
      this._total$.next(result.total);
    });
    this._search$.next();  
  }
  
  private _search(nCompanyId: number,oSearchParams: Contact): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    if (this._onSearch$.value == false) {
      this._onSearch$.next(true);
  
      return from(this.searchcontactsByCompany(nCompanyId,oSearchParams, pageSize, page).then((dataResponse: ResponseApi<Array<Contact>>) => {
        // 1. sort
        let contacts = sort(dataResponse.data, sortColumn, sortDirection);
  
        // 2. filter
        if (searchTerm != "") {
          contacts = contacts.filter(company => matches(company, searchTerm, this.pipe));
        }
  
        //const total = contacts.length;
        const total = dataResponse.totalRecords;
  
        // 3. paginate if you have all elements in once
        // contacts = contacts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  
        this._onSearch$.next(false);
        return { contacts, total };
      }))
    }
    else {
  
      const contacts = sort(this._contacts$.value, sortColumn, sortDirection);
      const total = this._total$.value;
      return of({ contacts:contacts, total });
    }
  
  }
  
  resetSearchResult(){
    this._contacts$.next([]);
    this.page=1;
  }
  onEditReset(){
    this._contact$.next(null);
  }
  
  onEditAdd(ocontact: Contact){
    this._contact$.next(ocontact);
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
  }
 
}



//Functions for pagination
const compare = (v1: string | number | Array<number>| boolean|Date | Array<Licenses>| Array<Licenses_Packages>, v2: string | number | Array<number> | boolean|Date | Array<Licenses>| Array<Licenses_Packages>) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(contacts: Contact[], column: SortColumn<Contact>, direction: string): Contact[] {
  if (direction === '' || column === '') {
    return contacts;
  } else {
    return [...contacts].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(contact: Contact, term: string, pipe: PipeTransform) {
  return contact.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(contact.name).includes(term)
    || pipe.transform(contact.name).includes(term);
}

interface SearchResult {
  contacts: Contact[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<Contact>;
  sortDirection: SortDirection;
}