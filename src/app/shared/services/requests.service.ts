import { Inject, inject, Injectable, Injector, PipeTransform } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, Subject, of } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';

import { RequestCompanyAccess, Requests, ResponseApi, RequestsArray, User } from '@models/index';
import { environment } from '@env/environment';
import { AlertService} from '@services/alert.service';
import { AuthService } from '@services/auth.service';

import { DatePipe } from '@angular/common';

// import * as CryptoJS from 'crypto-js';

import { SHA1, AES, enc, mode, pad, SHA256, MD5, lib, format, algo } from 'crypto-js';
import { Buffer } from 'buffer';
import { SortColumn, SortDirection } from '@directives/sortable.directive';
// import { SHA384 } from 'crypto-js/x64-core';
import '@extension/date.extensions';
import { AuthServiceHelper } from './authHelper.service';
//import { NGX_LOADING_BAR_IGNORED } from '@ngx-loading-bar/http-client';

const sDecryptKey = 'GV4Qh2S8dQb8j26R';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get searchParams$() { return this._searchParams$.asObservable(); }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  set sortColumn(sortColumn: SortColumn<Requests>) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  get bPending$() { return this._bPending$; }
  set bPending$(value) { this._bPending$ = value; }  

  constructor(  
    private http: HttpClient,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private pipe: DatePipe,
    private accountService: AuthServiceHelper, 
    ) {      
      if (this.accountService.checkMode('Test') === false){
        this.klimUrl = 'https://klim-cicc.be';
        this.klimClient_Id = 'klim-prod';
      }else{
       /* Acceptatie not working more this.klimUrl = 'https://klim-acc.geosolutions.be';
          this.klimClient_Id = 'klim-acc';
        */

        this.klimUrl = 'https://klim-cicc.be';
        this.klimClient_Id = 'klim-prod';

      }

    }

  /*private get accountService() {
      return this.injector.get(AuthService);
  }*/

  private _lstRequests$: BehaviorSubject<RequestsArray> = new BehaviorSubject<RequestsArray>(null);
  public  lstRequests$$: Observable<RequestsArray> = this._lstRequests$.asObservable();


  private _lstRequestsCompany$: BehaviorSubject<RequestsArray> = new BehaviorSubject<RequestsArray>(null);
  public  lstRequestsCompany$$: Observable<RequestsArray> = this._lstRequestsCompany$.asObservable();



  private oRequestCompanyAccess$: BehaviorSubject<RequestCompanyAccess> = new BehaviorSubject<RequestCompanyAccess>(null);
  public  oRequestCompanyAccess$$: Observable<RequestCompanyAccess> = this.oRequestCompanyAccess$.asObservable();

  private oRequestEditCompanyAccess$: BehaviorSubject<RequestCompanyAccess> = new BehaviorSubject<RequestCompanyAccess>(null);
  public  oRequestEditCompanyAccess$$: Observable<RequestCompanyAccess> = this.oRequestEditCompanyAccess$.asObservable();

  private reqListChanged = new Subject<void>();
  reqListChanged$ = this.reqListChanged.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _onSearch$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _searchPending$ = new Subject<void>();
  private _searchParams$ = new BehaviorSubject<Requests>(null);
  private _bPending$: boolean;


  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
      page: 1,
      pageSize: 20,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    };


  Mydata: any;

  private  klimUrl: string | '';
  private  klimClient_Id: string | '';

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    if (this._bPending$){
      this._searchPending$.next();
    }else{
      this._search$.next();
    }
  }


  public  getByUserId(id: string): Observable<RequestsArray>{
      return from(this._getByUserId(id).then((data: RequestsArray) => {
        this._lstRequests$.next(data);
        return data;

      }));
  }

  private _getByUserId(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/requests/users/${id}`).pipe(
      map((dataRequest: ResponseApi<RequestsArray>) =>  this.Mydata = dataRequest.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


  AddRequest(orequest: Requests) {
    return this.http.post(`${environment.apiBaseUrl}/requests`, orequest);
  }

public  getByCompanyId(id: number): Observable<RequestsArray>{
    return from(this._getByCompanyId(id).then((data: RequestsArray) => {
      this._lstRequestsCompany$.next(data);
      return data;

    }));
  }

private _getByCompanyId(id: number) {
  return this.http.get(`${environment.apiBaseUrl}/requests/client/${id}`).pipe(
    map((dataRequest: ResponseApi<RequestsArray>) =>  this.Mydata = dataRequest.data ))
    .toPromise()
    .catch(this.alertService.handleError);
 }

public  getRequestAccesByCompanyId(id: number): Observable<RequestCompanyAccess>{
  return from(this._getRequestAccesByCompanyId(id).then((data: RequestCompanyAccess) => {
    this.oRequestCompanyAccess$.next(data);
    return data;
  }));
}

public getCountByCompanyId(id: number) {
  return this.http.get(`${environment.apiBaseUrl}/requests/client/${id}/count`).pipe(
    map((dataRequest: ResponseApi<number>) => {return dataRequest.data } ));

 }

public  getRequestsStats(dStartDate: Date, dEndDate: Date){
  return this.http.post(`${environment.apiBaseUrl}/requests/statistic/periode/`, { startDate: dStartDate.DateGetLocaleDate(), endDate: dEndDate.DateGetLocaleDate()});
}

public  getRequestsStatsPerClient(dStartDate: Date, dEndDate: Date){
  return this.http.post(`${environment.apiBaseUrl}/requests/statistic/periode/perclient`, { startDate: dStartDate.DateGetLocaleDate(), endDate: dEndDate.DateGetLocaleDate()});
}

public  getRequestAccesOnEditByCompanyId(id: number): Observable<RequestCompanyAccess>{
  return from(this._getRequestAccesByCompanyId(id).then((data: RequestCompanyAccess) => {
    this.oRequestEditCompanyAccess$.next(data);
    return data;
  }));
}

private _getRequestAccesByCompanyId(id: number) {
return this.http.get(`${environment.apiBaseUrl}/requests/clientaccess/${id}`).pipe(
  map((dataRequest: ResponseApi<RequestCompanyAccess>) =>  this.Mydata = dataRequest.data ))
  .toPromise()
  .catch(this.alertService.handleError);
}

public  getRequestsByCompanyAndStatus(companyid: number, sStatus= ''): Observable<RequestsArray>{
  return from(this._getRequestsByCompanyAndStatus(companyid, sStatus).then((data: RequestsArray) => {
    return data;
  }));
}

private _getRequestsByCompanyAndStatus(companyid: number, sStatus= '') {
return this.http.get(`${environment.apiBaseUrl}/requests/client/${companyid}?s=${sStatus}`).pipe(
  map((dataRequest: ResponseApi<RequestsArray>) =>   this.Mydata = new ResponseApi(dataRequest).data))
  .toPromise()
  .catch(this.alertService.handleError);
}

public downloadDocuments(sRequestID: string){
  return this.http.get( this.getAbsoluteDomainUrl() + '/download/' + sRequestID + '.zip', {
    responseType: 'arraybuffer'
 });

}

public  getAbsoluteDomainUrl(): string {
  const url = new URL(environment.apiBaseUrl);
  return url.protocol + '//' + url.host;


}


resetCompanyRequest(nRequestId){
  return this.http.put(`${environment.apiBaseUrl}/requests/reset/${nRequestId}`, {})
  .pipe(map((dataResponse: ResponseApi<Requests>) => {
   const lstRequestsTemp = this._lstRequestsCompany$.value;
   const index = lstRequestsTemp.requests.findIndex(elem => elem.id === dataResponse.data.id);
   if (index >= 0){
    lstRequestsTemp.requests[index].status_id = dataResponse.data.status_id;
    lstRequestsTemp.requests[index].status = dataResponse.data.status;
    this._lstRequestsCompany$.next(lstRequestsTemp);
   }
   return dataResponse.data;
  }));
}
resetRequest(nRequestId){
  return this.http.put(`${environment.apiBaseUrl}/requests/reset/${nRequestId}`, {})
  .pipe(map((dataResponse: ResponseApi<Requests>) => {
   const lstRequestsTemp = this._lstRequests$.value;
   const index = lstRequestsTemp.requests.findIndex(elem => elem.id === dataResponse.data.id);
   if (index >= 0){
    lstRequestsTemp.requests[index].status_id = dataResponse.data.status_id;
    lstRequestsTemp.requests[index].status = dataResponse.data.status;
    this._lstRequests$.next(lstRequestsTemp);
   }
   return dataResponse.data;
  }));
}

private createRequestHeader(token:string){
  const headerDict = { 
    'Content-Type': 'application/vnd.api+json',  
    'Accept': 'application/vnd.api+json',
    'AuthorizationBearer': `Bearer ${token}`
  }
  const requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(headerDict), 
  };
  return requestOptions;
}

public async  addRequestWithKlim(oKlimRequest: any, oRequest: Requests){
  const sToken = await this.GetKlimToken();
  console.log('=================== KLIM TOKEN =============================');
  console.log(sToken);
  console.log('=================== END KLIM TOKEN =============================');

  if (sToken !== ''){

      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + sToken);
      headers = headers.append('Accept', 'application/vnd.api+json');
      headers = headers.append('Content-Type', 'application/vnd.api+json');
      headers = headers.append('Content-Type', 'application/vnd.api+json');

      if (this.accountService.checkMode('Test') === true){
        headers = headers.append('type', 'TEST');
      }

      console.log('URL is : ' + this.klimUrl);
     // return this.http.post(this.klimUrl + '/api/v1/Requestor/planrequest', oKlimRequest, {headers }).pipe(
      return this.http.post(`${environment.apiBaseUrl}/cors/PROXYTEST?url=${this.klimUrl}/api/v1/Requestor/planrequest`,oKlimRequest,this.createRequestHeader(sToken)).pipe(   
        map((DataResponse: any) => {
           console.log(DataResponse);
           if (DataResponse.Data.Attributes.length > 0 && DataResponse.Data.Attributes[0].RequestId !== undefined){
            oRequest.klim_id = DataResponse.Data.Attributes[0].RequestId;
            this.AddRequest(oRequest).subscribe((data) => {
              this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
              this.getByUserId(oRequest.user_id);
            });
           }
           return DataResponse;
        } ))
        .toPromise();   
    }
}




private _searchRequestsByCompany(nCompanyId: number, contactKey: Requests, pageSize: number, pageNumber: number) {
  return this.http.post(`${environment.apiBaseUrl}/requests/companies/${nCompanyId}/search?pagesize=${pageSize}&pagenumber=${pageNumber}`, contactKey)
          .pipe(map((ResponseData: ResponseApi<RequestsArray>) =>
             {
                this._lstRequestsCompany$.next(ResponseData.data);
                this._total$.next(ResponseData.totalRecords);
                return ResponseData;
             }
            ))
            .toPromise()
            .catch(this.alertService.handleError);
}




public searchRequestsByCompany(nCompanyId: number, oSearchParams: Requests){
  this._searchParams$.next(oSearchParams);
  this._search$.pipe(
    tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(() => this._search(nCompanyId, this._searchParams$.value)),
      delay(10),
      tap(() => this._loading$.next(false))
  ).subscribe(result => {
    this._lstRequestsCompany$.next(result.requests);
    this._total$.next(result.total);
  });
  this._search$.next();
}

private _search(nCompanyId: number, oSearchParams: Requests): Observable<SearchResult> {
  const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
  if (this._onSearch$.value === false) {
    this._onSearch$.next(true);

    return from(this._searchRequestsByCompany(nCompanyId, oSearchParams, pageSize, page).then((dataResponse: ResponseApi<RequestsArray>) => {
      // 1. sort
      const oSearch = dataResponse.data;
      oSearch.requests = sort(dataResponse.data.requests, sortColumn, sortDirection);
      // 2. filter
      if (searchTerm !== '') {
        oSearch.requests =  oSearch.requests.filter(request => matches(request, searchTerm, this.pipe));
      }
      // const total = users.length;
      const total = dataResponse.totalRecords;
      // 3. paginate if you have all elements in once
      // users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      this._onSearch$.next(false);
      return { requests: oSearch, total };
    }));
  }
  else {
    const oSearch = this._lstRequestsCompany$.value;
    if (oSearch != null){
      oSearch.requests = sort(oSearch?.requests, sortColumn, sortDirection);
    }

    const total = this._total$.value;
    this._onSearch$.next(false);
    return of({ requests: oSearch, total });
  }

}



public searchPendingRequests(oSearchParams: Requests){
  this._searchParams$.next(oSearchParams);
  this._searchPending$.pipe(
    tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(() => this._searchPending(this._searchParams$.value)),
      delay(10),
      tap(() => this._loading$.next(false))
  ).subscribe(result => {
    this._lstRequests$.next(result.requests);
    this._total$.next(result.total);
  });
  this._searchPending$.next();
}

private _searchPendingRequests(contactKey: Requests, pageSize: number, pageNumber: number) {
  return this.http.post(`${environment.apiBaseUrl}/requests/pending/search?pagesize=${pageSize}&pagenumber=${pageNumber}`, contactKey)
          .pipe(map((ResponseData: ResponseApi<RequestsArray>) =>
             {
                this._lstRequests$.next(ResponseData.data);
                this._total$.next(ResponseData.totalRecords);
                return ResponseData;
             }
            ))
            .toPromise()
            .catch(this.alertService.handleError);
}

private _searchPending(oSearchParams: Requests): Observable<SearchResult> {
  const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
  if (this._onSearch$.value === false) {
    this._onSearch$.next(true);

    return from(this._searchPendingRequests(oSearchParams, pageSize, page).then((dataResponse: ResponseApi<RequestsArray>) => {
      // 1. sort
      const oSearch = dataResponse.data;
      oSearch.requests = sort(dataResponse.data.requests, sortColumn, sortDirection);
      // 2. filter
      if (searchTerm !== '') {
        oSearch.requests =  oSearch.requests.filter(request => matches(request, searchTerm, this.pipe));
      }
      // const total = users.length;
      const total = dataResponse.totalRecords;
      // 3. paginate if you have all elements in once
      // users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      this._onSearch$.next(false);
      return { requests: oSearch, total };
    }));
  }
  else {
    const oSearch = this._lstRequests$.value;
    if (oSearch != null){
      oSearch.requests = sort(oSearch?.requests, sortColumn, sortDirection);
    }

    const total = this._total$.value;
    this._onSearch$.next(false);
    return of({ requests: oSearch, total });
  }
}

public resetSearchResult(){
  this._onSearch$.next(false);
  this._lstRequestsCompany$.next(null);
  this._lstRequests$.next(null);
  this.page = 1;
}




private GetKlimToken(){
  const iv = enc.Utf8.parse(sDecryptKey);
  const config = {
    keySize: 128 / 8,
    // iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7
};
  let headers = new HttpHeaders();
  headers = headers.append('username', 'support@exon-ict-group.be');

  const passenc = this.enc_data(this.datePipe.transform(Date.now(), 'yyyyMMdd').toString() + 'Framboos07', sDecryptKey);

  headers = headers.append('paswoord', passenc);
  if (this.accountService.checkMode('Test') === true){
    headers = headers.append('type', 'TEST');
  }


  return this.http.get(`https://app.mijnperceel.be/KLIM/GetToken`, {headers }).pipe(
    map((dataToken: any) => {
      const sToken = dataToken.accesToken;
      // return this.decrypt( sToken.trim(), sDecryptKey.trim());
      return sToken;

    }  ))
    .toPromise();

}




public enc_data( dataToEncrypt: string ,  key: string) {

  const _key = enc.Utf8.parse(key);
  const _iv = enc.Utf8.parse(key);

  const encrypted = AES.encrypt(dataToEncrypt, _key, {
    keySize: 16,
    iv: _iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
    format: format.Hex,
    algo: algo.AES,
  });
  return  encrypted.iv + '' + encrypted.ciphertext;
}


private  web_safe(bytes) {
  return bytes.map(function(byte) {
    return (byte & 0xFF).toString(16);
  }).join('');
}

private  padString(source) {
  const paddingChar = ' ';
  const size = 16;
  const x = source.length % size;
  const padLength = size - x;

  for (let i = 0; i < padLength; i++) { source += paddingChar; }

  return source;
}





 private  decrypt(valueStringHex, key) {
      const _key = enc.Utf8.parse(key);
      const _iv = enc.Utf8.parse(key);
      const message = valueStringHex.substring(32, valueStringHex.length);

      const decrypted = AES.decrypt(message, _key, {
        keySize: 16,
        iv: _iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
        format: format.Hex,
        algo: algo.AES,
      }).toString();

      return decrypted;
 }




  hex_to_ascii(str1)
  {
    const hex  = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }


  stringtoBytes(str){
    const myBuffer = [];
    const buffer = new Buffer(str, 'utf16le');
    for (let i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i]);
    }
    return myBuffer;
  }
  stringToByteArray(s){

    // Otherwise, fall back to 7-bit ASCII only
    const result = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++){
        result[i] = s.charCodeAt(i); /* w ww. ja  v  a 2s . co  m*/
    }
    return result;
  }
  // https://crm.exon-ict-group.be/api/request/6?t=company


  toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }
  toByteArray(hexString) {
    const result = [];
    for (let i = 0; i < hexString.length; i += 2) {
      result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return result;
  }

  DecodeHexStringToByteArray = function(hexString) {
    const result = [];
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16));
        hexString = hexString.substring(2, hexString.length);
    }
    return result;
 };

 
 notifyReqChanged() {
  this.reqListChanged.next();
}


}


// Functions for pagination
const compare = (v1: string | number | Array<number>| boolean|Date | Array<User>, v2: string | number | Array<number> | boolean|Date | Array<User>) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function sort(requests: Requests[], column: SortColumn<Requests>, direction: string): Requests[] {
  if (direction === '' || column === '') {
    return requests;
  } else {
    return [...requests].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(company: Requests, term: string, pipe: PipeTransform) {
  return company.capakey.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(company.capakey).includes(term)
    || pipe.transform(company.reference).includes(term)
    || pipe.transform(company.filenumber).includes(term)
    || pipe.transform(company.created_at).includes(term)
    || pipe.transform(company.date_send).includes(term);
}

interface SearchResult {
  requests: RequestsArray;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<User>;
  sortDirection: SortDirection;
}
