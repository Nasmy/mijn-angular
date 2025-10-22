import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Parcel} from '@shared/models';
import { AlertService} from '@shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NearestparcellService {

  private arrNearestSubject: BehaviorSubject<Array<Parcel>>=new BehaviorSubject<Array<Parcel>>(null);
  public arrNearest: Observable<Array<Parcel>>=this.arrNearestSubject.asObservable();

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(
    private router: Router,
    public http: HttpClient,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) { }


  public getNearestPercell(sPolygon,sCapakey=""){
    const form = new FormData();
    form.append('geometry', JSON.stringify(sPolygon));
    form.append('f', "pjson");
    form.append('spatialRel', "esriSpatialRelEnvelopeIntersects");
    form.append('where', "NOT CAPAKEY ='"+sCapakey+"'");
    //form.append('spatialRel', "esriSpatialRelIntersects");
    //form.append('spatialRel', "esriSpatialRelIndexIntersects");
    form.append('geometryType', "esriGeometryPolygon");

    const headers = new HttpHeaders();
    headers.set(
      "Content-Type","application/x-www-form-urlencoded;"
    );

    return  this.http.post(`https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/query`,form,{ headers: headers})
    .pipe(map((dataNearest: any) => {
          let arrParceelen: Array<Parcel>;
          arrParceelen=[];
          dataNearest.features.forEach(parc => {
              const oParcel=new Parcel();
              oParcel.capakey=parc.attributes.CaPaKey
              oParcel.geometry=JSON.stringify(parc.geometry);
              oParcel.markForDelete=false;
              arrParceelen.push(oParcel);

          });

          this.arrNearestSubject.next(arrParceelen);
          return dataNearest;
      })).toPromise();

      /*
      const queryConform = new Query();               
          queryConform.geometry = event.mapPoint;  
          queryConform.outFields = ['*'];

          this.wfsConformAttest.queryFeatures(queryConform)
          .then((results: any) => {
            if (results.features.length === 0) {
              // clearSelection();
            } else {
              for (let i = 0; i < results.features.length; i++) {

              }
            }
          })                
          */
  }


public resetNearestArray(){
  this.arrNearestSubject.next([]);
}




}
