import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Configuration, ResponseApi } from '@models/index';
import { environment } from '@env/environment';
import { AlertService} from '@services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private lstConfiguration$: BehaviorSubject<Array<Configuration>> = new BehaviorSubject<Array<Configuration>>(null);
  public  lstConfiguration$$: Observable<Array<Configuration>> = this.lstConfiguration$.asObservable();

  public get ConfigurationListValue(): Array<Configuration> {
    return this.lstConfiguration$.value;
}

  private  _jsonURL: string;
  public arrCombosRegion: { [key: string]: string} = {};

  Mydata
  constructor(
    private router: Router,
    private http: HttpClient,
    private  alertService:AlertService
  ) {
    this._jsonURL =this.getAbsoluteDomainUrl()+"/assets/configuration.json"
    this.arrCombosRegion[1]="Vlaanderen";
    this.arrCombosRegion[2]="Wallonie";
    this.arrCombosRegion[3]="Brussel";

   }


public  getAllByUserID(nUserID): Observable<Array<Configuration>>{
    return from(this._getAllByUserID(nUserID).then((data: Array<Configuration>) => {
      data.forEach(element => {
        element.regionName= this.arrCombosRegion[element.region_id]
      });
      this.lstConfiguration$.next(data);
      return data;
    }))
}

private _getAllByUserID(nUserID) {
  //return this.http.get(this._jsonURL).pipe(
  return this.http.get(`${environment.apiBaseUrl}/configurations/users/${nUserID}`).pipe(
    map((dataRequest: ResponseApi<Array<Configuration>>) =>  this.Mydata = dataRequest.data ))
    .toPromise()
    .catch(this.alertService.handleError);

}



public  getAllActiveByUserID(nUserID): Observable<Array<Configuration>>{
  return from(this._getAllActiveByUserID(nUserID).then((data: Array<Configuration>) => {
    data.forEach(element => {
      element.regionName= this.arrCombosRegion[element.region_id]
    });
    this.lstConfiguration$.next(data);
    return data;
  }))
}

private _getAllActiveByUserID(nUserID) {
//return this.http.get(this._jsonURL).pipe(
return this.http.get(`${environment.apiBaseUrl}/configurations/users/${nUserID}/active`).pipe(
  map((dataRequest: ResponseApi<Array<Configuration>>) =>  this.Mydata = dataRequest.data ))
  .toPromise()
  .catch(this.alertService.handleError);

}






public getByID(nconfId) {
  return this.http.get(`${environment.apiBaseUrl}/configurations/${nconfId}`).pipe(
    map((dataRequest: ResponseApi<Configuration>) =>  this.Mydata = dataRequest.data ))
    .toPromise()
    .catch(this.alertService.handleError);

}

public  getAbsoluteDomainUrl(): string {
  if (window
      && "location" in window
      && "protocol" in window.location
      && "host" in window.location) {
      return window.location.protocol + "//" + window.location.host;
  }
  return null;
}


saveConfiguration(oConfiguration: Configuration) {
  return this.http.put(`${environment.apiBaseUrl}/configurations/${oConfiguration.id}`, oConfiguration)
    .pipe(map((conf :ResponseApi<Configuration>)=> {
      const tempData = conf.data
      if (tempData.id == undefined) {
       this.addOrUpdate(tempData);
      }
      return tempData;
  }));
}

addConfiguration(oConfiguration: Configuration) {
  return this.http.post(`${environment.apiBaseUrl}/configurations`, oConfiguration)
    .pipe(map((conf :ResponseApi<Configuration>)=> {
      const tempData = conf.data
      if (tempData.id == undefined) {
       this.addOrUpdate(tempData);
      }
      return tempData;
  }));
}

delConfiguration(id) {
  return this.http.delete(`${environment.apiBaseUrl}/configurations/${id}`)
  .pipe(map(x => {
    return x;
  }));
}



private addOrUpdate(oConfiguration: Configuration){

  const tmpLstConfigurations:Array<Configuration>=this.lstConfiguration$.getValue();
  if (oConfiguration.id!=undefined && oConfiguration.id>""){
    const index=tmpLstConfigurations.findIndex(elem=>{
      return elem.id==oConfiguration.id;
    })

    if(index>=0){
      tmpLstConfigurations[index]=oConfiguration;
    }else{
      tmpLstConfigurations.push(oConfiguration);
    }
    this.lstConfiguration$.next(tmpLstConfigurations)

  }


}



}
