import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from } from 'rxjs';
import { first, map } from 'rxjs/operators';


import { Layers, Layer_legend, ResponseApi, LayerCategory } from '@shared/models';
import { environment } from '@env/environment';
import { AlertService} from '@shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  private lstLayers$: BehaviorSubject<Array<Layers>> = new BehaviorSubject<Array<Layers>>(null);
  public  lstLayers$$: Observable<Array<Layers>> = this.lstLayers$.asObservable();  
  
  private lstLayersCategory$: BehaviorSubject<Array<LayerCategory>> = new BehaviorSubject<Array<LayerCategory>>(null);
  public  lstLayersCategory$$: Observable<Array<LayerCategory>> = this.lstLayersCategory$.asObservable();

  private lstLayerLegends$: BehaviorSubject<Array<Layer_legend>> = new BehaviorSubject<Array<Layer_legend>>(null);
  public  lstLayerLegends$$: Observable<Array<Layer_legend>> = this.lstLayerLegends$.asObservable();

  public get legendsValue(): Array<Layer_legend> {
    return this.lstLayerLegends$.value;
  }

  Mydata: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private  alertService:AlertService
    ) { }


  public  getByRegion(sRegion: string): Observable<Array<Layers>>{
      return from(this._getByRegion(sRegion).then((data: Array<Layers>) => {
        this.lstLayers$.next(data);
        return data;

      }))
  }

  private _getByRegion(sRegion: string) {
    return this.http.get(`${environment.apiBaseUrl}/maps/region/${sRegion}`).pipe(
      map((dataRequest: ResponseApi<Array<Layers>>) =>  this.Mydata = dataRequest.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  public  getByRegionCategorized(sRegion: string): Observable<Array<LayerCategory>>{
    return from(this._getByRegionCategorized(sRegion).then((data: Array<LayerCategory>) => {
      this.lstLayersCategory$.next(data);
      return data;

    }))
}

private _getByRegionCategorized(sRegion: string) {
  return this.http.get(`${environment.apiBaseUrl}/maps/region/${sRegion}/categorized`).pipe(
    map((dataRequest: ResponseApi<Array<LayerCategory>>) =>  this.Mydata = dataRequest.data ))
    .toPromise()
    .catch(this.alertService.handleError);
}



  public  getAll(): Observable<Array<Layers>>{
      return from(this._getAll().then((data: Array<Layers>) => {
        this.lstLayers$.next(data);
        return data;

      }))
  }

  private _getAll() {
    return this.http.get(`${environment.apiBaseUrl}/maps`).pipe(
      map((dataRequest: ResponseApi<Array<Layers>>) =>  this.Mydata = dataRequest.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }



  public  getAllLegends(): Observable<Array<Layer_legend>>{
    return from(this._getAllLegends().then((data: Array<Layer_legend>) => {
      this.lstLayerLegends$.next(data);
      return data;
    }))
}

private _getAllLegends() {
  return this.http.get(`${environment.apiBaseUrl}/maps/getlegends`).pipe(
    map((dataRequest: ResponseApi<Array<Layer_legend>>) =>  this.Mydata = dataRequest.data ))
    .toPromise()
    .catch(this.alertService.handleError);
}


}
