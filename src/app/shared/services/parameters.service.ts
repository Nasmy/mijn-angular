import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  constructor(
    private http: HttpClient,

  ) { }

getParamsBySysCode(sCode: string){
  return this.http.get(`${environment.apiBaseUrl}/parameter/loadByCode?code=${sCode}`)
}

getParamsByGroupSysCode(sCode: string){
  return this.http.get(`${environment.apiBaseUrl}/parameter/loadbyGroupCode?code=${sCode}`)
}


getGroupSysCode(sCode: string){
  return this.http.get(`${environment.apiBaseUrl}/parameter/loadGroupByCode?code=${sCode}`)
}

getGroupsByParentSysCode(sCode: string){
  return this.http.get(`${environment.apiBaseUrl}/parameter/loadParamByParentcode?code=${sCode}`)
}
getGroupsByGroupParentSysCode(sCode: string){
  return this.http.get(`${environment.apiBaseUrl}/parameter/loadGroupByParentCode?code=${sCode}`)
}


}
