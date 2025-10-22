import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, from, Subject, pipe } from 'rxjs';
import { delay, first, map, subscribeOn } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Company, CompanyType, Combo, ResponseApi, Cities,Point as LocalPoint,  BoundingBox} from '@models/index';
import { AlertService} from '@services/alert.service';
// import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import * as query from "@arcgis/core/rest/query.js";
import  Point  from "@arcgis/core/geometry/Point";
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Polygon from '@arcgis/core/geometry/Polygon';
import Geometry from '@arcgis/core/geometry/Geometry';

@Injectable({
  providedIn: 'root'
})
export  class MapService {

  private Mydata: any;
  private regionId: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    public http: HttpClient,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private translateService: TranslateService,
    ) {

      }


  public LoadDataFromPoint1() {
      const headersVlaanderen = new HttpHeaders()
      .set('Cache-Control', 'max-age=0');
      // let  sUrlVlaanderen: string="https://perc.geopunt.be/perceel/location?q="+sCapaURL+"&c=1"
      // let  sUrlVlaanderen: string="https://geoservices.informatievlaanderen.be/capakey/api/v2/parcel?type=json&x="+oPoint.x+"&y="+oPoint.y+"&data=adp&status=actual"
      const  sUrlVlaanderen = 'http://geo.api.vlaanderen.be/capakey/parcel?type=json&x=154368.31005343352&y=207255.8260281952&data=adp&status=actual';
      return  this.http.get(sUrlVlaanderen);
  }

   public LoadDataFromPoint(oPoint: LocalPoint,inSrs: string="4326",outSrs="4326") {
      const headersVlaanderen = new HttpHeaders()
      .set('Cache-Control', 'max-age=0');
      // let  sUrlVlaanderen: string="https://perc.geopunt.be/perceel/location?q="+sCapaURL+"&c=1"
      //const  sUrlVlaanderen: string = 'https://geoservices.informatievlaanderen.be/capakey/api/v2/parcel?type=json&x=' + oPoint.x + '&y=' + oPoint.y + '&data=adp&status=actual&srs=4326';
      //const  sUrlVlaanderen: string = 'https://geo.api.vlaanderen.be/capakey/parcel?type=json&x=' + oPoint.x + '&y=' + oPoint.y + '&data=adp&status=actual&srs='+srs;
      const  sUrlVlaanderen: string = 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/query?f=pjson&geometry=\'x\':'  + oPoint.y +',\'y\':'+ + oPoint.x +'&orderByFields=OBJECTID%20ASC&outFields=*&outSR='+outSrs+'&resultType=tile&returnExceededLimitFeatures=false&spatialRel=esriSpatialRelIntersects&where=1=1&geometryType=esriGeometryPoint&inSR='+inSrs;
      // let  sUrlVlaanderen: string="http://geoservices.informatievlaanderen.be/capakey/api/v2/parcel?type=json&x=154368.31005343352&y=207255.8260281952&data=adp&status=actual"
      return  this.http.get(sUrlVlaanderen);
    }

    public regionIdListener() {
      return this.regionId.asObservable();
    }

    public regionIdObserver(value : number) {
      this.regionId.next(value);
    }

    public SendPostProxy(sUrl: any, sBody: any){

     /* const form = new FormData();
      form.append('url', sUrl);
      form.append('body', sBody);*/

      const PostObject: any = new Object();
      PostObject.url = sUrl;
      PostObject.body = JSON.stringify(sBody);
      return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject);
    }

    public SendGetProxy(sUrl: any): Observable<any>{
     const  sBody = '{}';
     const form = new FormData();
     form.append('url', sUrl);
     form.append('body', sBody);

     const PostObject: any = new Object();
     PostObject.url = sUrl;
     PostObject.body = sBody;

     return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject);

    }


    public  getParcelFromCapakey(sCapa: string, EPSG= 31370){
        //let sURLCadGis = '';     
        /* sURLCadGis="https://ccff02.minfin.fgov.be/arcgis/rest/services/cadgisr2c/CadastralObjects_C/MapServer/7/query?where=+CaPakey+like+%27"+sCapa+"%25%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CaPaKey,ObjectID&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=31370&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson"
        
        sURLCadGis = 'https://ccff02.minfin.fgov.be/arcgis/rest/services/cadgisr2c/CadastralObjects_C/MapServer/7/query?f=pjson&geometry=&maxAllowableOffset=1.1943285669555674&orderByFields=OBJECTID%20ASC&outFields=*&outSR=' + EPSG + '&resultType=tile&returnExceededLimitFeatures=false&spatialRel=esriSpatialRelIntersects&where=CaPakey%20like%20%27' + sCapa + '%27&geometryType=esriGeometryEnvelope&geometryPrecision=100&inSR=' + EPSG;
        */
        //sURLCadGis="https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/query?f=pjson&geometry=&maxAllowableOffset=1.1943285669555674&orderByFields=OBJECTID%20ASC&outFields=*&outSR="+EPSG+"&resultType=tile&returnExceededLimitFeatures=false&spatialRel=esriSpatialRelIntersects&where=CaPakey%20like%20%27"+sCapa+"%27&geometryType=esriGeometryEnvelope&geometryPrecision=100&inSR="+EPSG
        
        // const  reqData: any = new Object();
        // const PostObject: any = new Object();
        // PostObject.url = sURLCadGis;
        // PostObject.body = JSON.stringify(reqData);
        // return  this.http.post(`${environment.apiUrl}/cors/GET`, PostObject);
    

        //let queryUrl = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/";
        let queryUrl = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/";
        return from(query.executeQueryJSON(
          queryUrl,
           { 
              where: `CaPakey LIKE '${sCapa}'`,
              outFields:["*"],  
              geometryPrecision:5,
              returnGeometry:true,
              outSpatialReference: { wkid:EPSG },          
           })); 

    }

    async getDivisionFromCoordinate(oPoint:Point){    
      const PostObject: any = new Object();
      PostObject.url = "https://eservices.minfin.fgov.be/ecad-backend-rest/localisation/division/coordinates";
      PostObject.body = JSON.stringify(oPoint);
      return this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject,{responseType: 'text'}).toPromise();      
    }

     async getImageCadgisRapport(nxMin, nxMax, nyMin, nyMax, arrSelectedPerceel: Array<any>= [], cadGisSelectie: { [key: string]: Combo} = {} ){
      const division: any = await  this.getAfdelingByCoordinate(nxMin, nyMin);
     /* let oPoint:Point=<Point>{};
      oPoint.x=nxMin;
      oPoint.y=nyMin;
  
      const division: any = await new Promise((resolve, reject) => {        
        resolve(this.getDivisionFromCoordinate(oPoint));      
      });*/
      let divisionName = '';
      if (division === undefined || division === '')
      {
        this.alertService.error('The service is temporarily unavailable. Please try again!');
        return new Subject<string>();
      }else{  
        if (division.features.length > 0){
          divisionName = division.features[0].attributes.NameDUT;
        }     
         // divisionName = division;      
      }    
      const bbox: BoundingBox = new BoundingBox();    
   
      bbox.lowerLeft.x = nxMin;
      bbox.lowerLeft.y = nyMin;
      bbox.upperRight.x = nxMax;
      bbox.upperRight.y = nyMax;     
      const  reqData: any = new Object();
      reqData.format = cadGisSelectie['PAGEFORMAT'].name;  
      if (cadGisSelectie['PAGE'].id === '1'){
          reqData.orientation = 'PORTRAIT';
      }else{
          reqData.orientation = 'LANDSCAPE';
      }  
  
      reqData.xmin = bbox.lowerLeft.x;
      reqData.xmax = bbox.upperRight.x;
      reqData.ymin = bbox.lowerLeft.y;
      reqData.ymax = bbox.upperRight.y;
      console.log(bbox.lowerLeft.x + ',' + bbox.lowerLeft.y + ',' + bbox.upperRight.x + ',' + bbox.upperRight.y);
      const MapInfo: any =await  this.getScaleFromMapExtend(bbox.lowerLeft.x + ',' + bbox.lowerLeft.y + ',' + bbox.upperRight.x + ',' + bbox.upperRight.y);
      if (MapInfo === undefined || MapInfo.scale === undefined)
      {
          this.alertService.error( this.translateService.instant('The service is temporarily unavailable. Please try again!'));
          return new Subject<string>();
      }
  
      //reqData.width = 1500;
      //reqData.height = 1919.2913385826773;   
      
     // "portrait" === i ? (this.width = Math.round(Eo.getPageDimension(n)[0] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))),this.height = Math.round(Eo.getPageDimension(n)[1] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r)))) :
     // "paysage" === i && (this.height = Math.round(Eo.getPageDimensionLandscape(n)[0] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))), this.width = Math.round(Eo.getPageDimensionLandscape(n)[1] * (r / 90.7) * T.getResolutionFromScale(a * (90.7 / r))));
     let Scale=Number(cadGisSelectie['SCALE'].id);
     let DPI= Number(cadGisSelectie['RESOLUTION'].name);
     if(Scale==1){
      Scale=MapInfo.scale
     }

     reqData.width = reqData.orientation == 'PORTRAIT'?Math.round( wo.getPageDimension(cadGisSelectie['PAGEFORMAT'].name)[0] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) )):Math.round( wo.getPageDimensionLandscape(cadGisSelectie['PAGEFORMAT'].name)[1] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) ))
     reqData.height = reqData.orientation == 'PORTRAIT'?Math.round( wo.getPageDimension(cadGisSelectie['PAGEFORMAT'].name)[1] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) )):Math.round( wo.getPageDimensionLandscape(cadGisSelectie['PAGEFORMAT'].name)[0] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) ))
          
      //reqData.width = reqData.orientation == 'PORTRAIT'? wo.getPageDimensionInPixelForResolution(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[0]:wo.getPageDimensionInPixelForResolutionLandscape(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[0];
      //reqData.height = reqData.orientation == 'PORTRAIT'? wo.getPageDimensionInPixelForResolution(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[1]:wo.getPageDimensionInPixelForResolutionLandscape(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[1];
  
      if (cadGisSelectie['SCALE'].id === '1'){
          reqData.scale = MapInfo.scale;
      }
      else{
          reqData.scale = cadGisSelectie['SCALE'].id;
      }
  
      reqData.url="https://ecadprintr3.finbel.intra/arcgis/rest/services/Print/Print_Color/MapServer";
      reqData.dpi = cadGisSelectie['RESOLUTION'].name;
      reqData.title = 'Uittreksel uit het kadastraal percelenplan';
      reqData.centered = 'Gecentreerd op: ',
      reqData.division = divisionName;
      reqData.copyright = 'De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan';
      reqData.official = true;
      reqData.situation = 'Meest recente toestand';
      reqData.situationName = 'CURRENT';
      const date = new Date();
      reqData.dateCreation = this.datePipe.transform(date, 'yyyy-MM-dd').toString();
      reqData.imageFormat = 'SVG';
      reqData.polygonRings = [];
      const arrPolygons: Array<any> = [];
  
      arrSelectedPerceel.forEach(polygon => {
          polygon.forEach(coordinates => {
            coordinates.forEach(point => {
              point[2] = 0;
            });
          });
        });
  
      reqData.selectedPolygons = [];
      arrSelectedPerceel.forEach(polygon => {
          polygon.forEach(coordinates => {
          reqData.selectedPolygons.push(coordinates);
          });
        });
    
      let thefile ; 
        
      const PostObjectImage: any = new Object();
      //PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/official_image_and_pdf/NL';
      PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/image';
      PostObjectImage.body = JSON.stringify(reqData);
  
      return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectImage,{responseType: 'text'});
      
      
      /*.pipe(first())
      .subscribe({
        next: (imageData:any)=> {
           imageData;
        },
        error: error => {
          this.alertService.handleError(error);
          this.alertService.error("File could not be created at this moment. Please try again later!");
        }
      });*/
}


async PrintRapportCadgis(nxMin, nxMax, nyMin, nyMax, imageData:string,cadGisSelectie: { [key: string]: Combo} = {}){

  const division: any = await  this.getAfdelingByCoordinate(nxMin, nyMin);
  let divisionName = '';
  if (division === undefined || division === '')
  {
    this.alertService.error('The service is temporarily unavailable. Please try again!');
    return new Subject<Blob>();;    
    
  }else{
    if (division.features.length > 0){
      divisionName = division.features[0].attributes.NameDUT;
    }   
  }

  const bbox: BoundingBox = new BoundingBox();
    bbox.lowerLeft.x = nxMin;
    bbox.lowerLeft.y = nyMin;
    bbox.upperRight.x = nxMax;
    bbox.upperRight.y = nyMax;

  const MapInfo: any = await  this.getScaleFromMapExtend(bbox.lowerLeft.x + ',' + bbox.lowerLeft.y + ',' + bbox.upperRight.x + ',' + bbox.upperRight.y);
  if (MapInfo === undefined || MapInfo.scale === undefined)
  {
      this.alertService.error( this.translateService.instant('The service is temporarily unavailable. Please try again!'));
      return new Subject<Blob>();
  }

  let Scale=Number(cadGisSelectie['SCALE'].id);
  let DPI= Number(cadGisSelectie['RESOLUTION'].name);
  if(Scale==1){
   Scale=MapInfo.scale
  }

  let   reqDataPDF: any = new Object();
  reqDataPDF.centered = "Gecentreerd op: ";
  reqDataPDF.copyright= "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan";
  reqDataPDF.format = cadGisSelectie['PAGEFORMAT'].name;
  if (cadGisSelectie['PAGE'].id === '1')
  {
    reqDataPDF.orientation = 'PORTRAIT';
  }else
  {
    reqDataPDF.orientation = 'LANDSCAPE';
  }
  const dateNow = new Date();
  reqDataPDF.dateCreation = this.datePipe.transform(dateNow, 'yyyy-MM-dd').toString();
  reqDataPDF.division = divisionName;
  if (cadGisSelectie['SCALE'].id === '1'){
    reqDataPDF.scale ="1:"+ Scale;
  }
  else{
    reqDataPDF.scale ="1:"+ cadGisSelectie['SCALE'].id;
  }
  reqDataPDF.title = 'Uittreksel uit het kadastraal percelenplan';
  reqDataPDF.official = true;
  reqDataPDF.situation = 'Meest recente toestand';
  //reqDataPDF.situationName = 'CURRENT';
  reqDataPDF.image=imageData;
  const PostObjectPDF: any = new Object();
  //PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/official_image_and_pdf/NL';
  PostObjectPDF.url = 'https://eservices.minfin.fgov.be/ecad-backend-rest/vp/scripturaVP/NL';
  PostObjectPDF.body = JSON.stringify(reqDataPDF);
  return   this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectPDF, {responseType: 'blob'}); 
}


async getNewUitreksel(nxMin, nxMax, nyMin, nyMax, arrSelectedPerceel: Array<any>= [], cadGisSelectie: { [key: string]: Combo} = {} ){
    // let division =await  this.getCoordinateAfdeling(nxMin,nyMin)
    const division: any = await  this.getAfdelingByCoordinate(nxMin, nyMin);
    /*let oPoint:Point=<Point>{};
    oPoint.x=nxMin;
    oPoint.y=nyMin;

    const division: any = await new Promise((resolve, reject) => {        
      resolve(this.getDivisionFromCoordinate(oPoint));      
    });*/
    let divisionName = '';
    if (division === undefined || division === '')
    {
      this.alertService.error('The service is temporarily unavailable. Please try again!');
      return new Promise((resolve, reject) => {        
        resolve(false);      
      });
    }else{
      if (division.features.length > 0){
        divisionName = division.features[0].attributes.NameDUT;
      }
      //  divisionName = division
    }
    const bbox: BoundingBox = new BoundingBox();

    bbox.lowerLeft.x = nxMin;
    bbox.lowerLeft.y = nyMin;
    bbox.upperRight.x = nxMax;
    bbox.upperRight.y = nyMax;
     // await bbox.zoomout(1500);

    const  reqData: any = new Object();
    reqData.format = cadGisSelectie['PAGEFORMAT'].name;

    if (cadGisSelectie['PAGE'].id === '1'){
        reqData.orientation = 'PORTRAIT';
      }else{
        reqData.orientation = 'LANDSCAPE';
      }

    reqData.xmin = bbox.lowerLeft.x;
    reqData.xmax = bbox.upperRight.x;
    reqData.ymin = bbox.lowerLeft.y;
    reqData.ymax = bbox.upperRight.y;
    console.log(bbox.lowerLeft.x + ',' + bbox.lowerLeft.y + ',' + bbox.upperRight.x + ',' + bbox.upperRight.y);
    const MapInfo: any = await  this.getScaleFromMapExtend(bbox.lowerLeft.x + ',' + bbox.lowerLeft.y + ',' + bbox.upperRight.x + ',' + bbox.upperRight.y);
    if (MapInfo === undefined || MapInfo.scale === undefined)
    {
        this.alertService.error( this.translateService.instant('The service is temporarily unavailable. Please try again!'));
        return new Promise((resolve, reject) => {        
          resolve(false);      
        });
    }

    let Scale=Number(cadGisSelectie['SCALE'].id);
    let DPI= Number(cadGisSelectie['RESOLUTION'].name);
    if(Scale==1){
     Scale=MapInfo.scale
    }
    
    reqData.width = reqData.orientation == 'PORTRAIT'?Math.round( wo.getPageDimension(cadGisSelectie['PAGEFORMAT'].name)[0] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) )):Math.round( wo.getPageDimensionLandscape(cadGisSelectie['PAGEFORMAT'].name)[1] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) ))
    reqData.height = reqData.orientation == 'PORTRAIT'?Math.round( wo.getPageDimension(cadGisSelectie['PAGEFORMAT'].name)[1] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) )):Math.round( wo.getPageDimensionLandscape(cadGisSelectie['PAGEFORMAT'].name)[0] * (DPI/ 90.7)+wo.getResolutionFromScale(Scale*(90.7 / DPI) ))
     
    //reqData.width = reqData.orientation == 'PORTRAIT'? wo.getPageDimensionInPixelForResolution(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[0]:wo.getPageDimensionInPixelForResolutionLandscape(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[0];
    //reqData.height = reqData.orientation == 'PORTRAIT'? wo.getPageDimensionInPixelForResolution(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[1]:wo.getPageDimensionInPixelForResolutionLandscape(cadGisSelectie['PAGEFORMAT'].name,cadGisSelectie['RESOLUTION'].name)[1];

    if (cadGisSelectie['SCALE'].id === '1'){
        reqData.scale = MapInfo.scale;
    }
    else{
        reqData.scale = cadGisSelectie['SCALE'].id;
    }
    reqData.url="https://ecadprintr3.finbel.intra/arcgis/rest/services/Print/Print_Color/MapServer";
    reqData.dpi = cadGisSelectie['RESOLUTION'].name;
    reqData.title = 'Uittreksel uit het kadastraal percelenplan';
    reqData.centered = 'Gecentreerd op: ',
    reqData.division = divisionName;
    reqData.copyright = 'De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan';
    reqData.official = true;
    reqData.situation = 'Meest recente toestand';
    reqData.situationName = 'CURRENT';
    const date = new Date();
    reqData.dateCreation = this.datePipe.transform(date, 'yyyy-MM-dd').toString();
    reqData.imageFormat = 'SVG';
    reqData.polygonRings = [];
    const arrPolygons: Array<any> = [];

    arrSelectedPerceel.forEach(polygon => {
        polygon.forEach(coordinates => {
          coordinates.forEach(point => {
            point[2] = 0;
          });
        });
      });

    reqData.selectedPolygons = [];
    arrSelectedPerceel.forEach(polygon => {
        polygon.forEach(coordinates => {
        reqData.selectedPolygons.push(coordinates);
        });
      });
  
    let thefile ;
    const PostObjectImage: any = new Object();
    //PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/official_image_and_pdf/NL';
    PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/image';
    PostObjectImage.body = JSON.stringify(reqData);

     return  await new Promise((resolve, reject) => {        
      resolve(
        this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectImage,{responseType: 'text'})
      .pipe(first())
      .subscribe(async (imageData: any) =>
        { 
        if(imageData!="" && imageData!=undefined && imageData!="Request failed."){        
            let   reqDataPDF: any = new Object();
            reqDataPDF.centered = "Gecentreerd op: ";
            reqDataPDF.copyright= "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan";
            reqDataPDF.format = cadGisSelectie['PAGEFORMAT'].name;
            if (cadGisSelectie['PAGE'].id === '1')
            {
              reqDataPDF.orientation = 'PORTRAIT';
            }else
            {
              reqDataPDF.orientation = 'LANDSCAPE';
            }
            const dateNow = new Date();
            reqDataPDF.dateCreation = this.datePipe.transform(dateNow, 'yyyy-MM-dd').toString();
            reqDataPDF.division = divisionName;
            if (cadGisSelectie['SCALE'].id === '1'){
              reqDataPDF.scale ="1:"+ reqData.scale;
            }
            else{
              reqDataPDF.scale ="1:"+ cadGisSelectie['SCALE'].id;
            }
            reqDataPDF.title = 'Uittreksel uit het kadastraal percelenplan';
            reqDataPDF.official = true;
            reqDataPDF.situation = 'Meest recente toestand';
            //reqDataPDF.situationName = 'CURRENT';
            reqDataPDF.image=imageData;

            const PostObjectPDF: any = new Object();
            //PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/official_image_and_pdf/NL';
            PostObjectPDF.url = 'https://eservices.minfin.fgov.be/ecad-backend-rest/vp/scripturaVP/NL';
            PostObjectPDF.body = JSON.stringify(reqDataPDF);
            await new Promise((resolve, reject) => {        
              resolve(
                  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectPDF, {responseType: 'blob'}).subscribe({
                  next: (blob) => {    
                    thefile = new Blob([blob], { type: 'application/pdf' })          
                    const url = window.URL.createObjectURL(thefile);
                    window.open(url, '_blank');
                    return true;
                  }}
                )
               ) 
              }
            )       
          }
        }
      )
      );      
    });

    /*return this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectImage,{responseType: 'text'})
      .pipe(first())
      .subscribe((imageData: any) =>
        { 
        if(imageData!="" && imageData!=undefined && imageData!="Request failed."){        
            let   reqDataPDF: any = new Object();
            reqDataPDF.centered = "Gecentreerd op: ";
            reqDataPDF.copyright= "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan";
            reqDataPDF.format = cadGisSelectie['PAGEFORMAT'].name;
            if (cadGisSelectie['PAGE'].id === '1')
            {
              reqDataPDF.orientation = 'PORTRAIT';
            }else
            {
              reqDataPDF.orientation = 'LANDSCAPE';
            }
            const dateNow = new Date();
            reqDataPDF.dateCreation = this.datePipe.transform(dateNow, 'yyyy-MM-dd').toString();
            reqDataPDF.division = divisionName;
            if (cadGisSelectie['SCALE'].id === '1'){
              reqDataPDF.scale ="1:"+ reqData.scale;
            }
            else{
              reqDataPDF.scale ="1:"+ cadGisSelectie['SCALE'].id;
            }
            reqDataPDF.title = 'Uittreksel uit het kadastraal percelenplan';
            reqDataPDF.official = true;
            reqDataPDF.situation = 'Meest recente toestand';
            //reqDataPDF.situationName = 'CURRENT';
            reqDataPDF.image=imageData;

            const PostObjectPDF: any = new Object();
            //PostObjectImage.url = 'https://eservices.minfin.fgov.be/ecad/api/generator/official_image_and_pdf/NL';
            PostObjectPDF.url = 'https://eservices.minfin.fgov.be/ecad-backend-rest/vp/scripturaVP/NL';
            PostObjectPDF.body = JSON.stringify(reqDataPDF);
            this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectPDF, {responseType: 'blob'}).subscribe({
              next: (blob) => {    
                thefile = new Blob([blob], { type: 'application/pdf' })          
                const url = window.URL.createObjectURL(thefile);
                window.open(url, '_blank');
                return true;
              }}
            );            
          }
        }
      ),
      error=>{
        this.alertService.handleError(error);
        this.alertService.error("File could not be created at this moment. Please try again later!");
        return false;
      };  */       
    }

  async  getCoordinateAfdeling(nX, nY ){
      const  reqData: any = new Object();
      reqData.x = nX;
      reqData.y = nY;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
                                       .set('Access-Control-Allow-Origin', '*');
      // return this.http.post<string>("https://eservices.minfin.fgov.be/ecad-backend-rest/localisation/division/coordinates", reqData, { headers, responseType: 'text' as 'json'  }).toPromise();

     /* const form = new FormData();
      form.append('url', "https://eservices.minfin.fgov.be/ecad-backend-rest/localisation/division/coordinates");
      form.append('body', JSON.stringify(reqData));*/
      const PostObject: any = new Object();
      PostObject.url = 'https://eservices.minfin.fgov.be/ecad-backend-rest/localisation/division/coordinates';
      PostObject.body = JSON.stringify(reqData);
      return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject, {  responseType: 'text' as 'json'  }).toPromise();
    }

    async  getAfdelingByCoordinate(nX, nY ){
      const  reqData: any = new Object();
      reqData.x = nX;
      reqData.y = nY;
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
                                       .set('Access-Control-Allow-Origin', '*');
      const form = new FormData();
      /* cors heeft geen optie  formurl body
      form.append('where' ,"")
      form.append('text' ,"")
      form.append('objectIds' ,"")
      form.append('time' ,"")
      form.append('geometry',"'x:'"+nX + "'y':"+nY)

      form.append('geometryType',"esriGeometryPoint")
      form.append('inSR' ,"31370")
      form.append('spatialRel',"esriSpatialRelIntersects")
      form.append('relationParam' ,"")
      form.append('outFields',"NameDUT")
      form.append('returnGeometry',"true")
      form.append('returnTrueCurves' ,"false")
      form.append('maxAllowableOffset',"")
      form.append('geometryPrecision' ,"")
      form.append('outSR' ,"")
      form.append('returnIdsOnly',"false")
      form.append('returnCountOnly' ,"false")
      form.append('orderByFields' ,"")
      form.append('groupByFieldsForStatistics' ,"")
      form.append('outStatistics' ,"")
      form.append('returnZ' ,"false")
      form.append('returnM',"false")
      form.append('gdbVersion' ,"esriGeometryPoint")
      form.append('returnDistinctValues' ,"false")
      form.append('resultOffset',"")
      form.append('resultRecordCount' ,"")
      form.append('queryByDistance' ,"")
      form.append('returnExtentsOnly' ,"false")
      form.append('datumTransformation' ,"")
      form.append('parameterValues' ,"")
      form.append('rangeValues',"")
      form.append('f',"json")
      */

     // form.append('url', "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/5/query?where=&text=&objectIds=&time=&geometry='x':"+nX+",'y':"+nY+"&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=NameDUT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json&inSR=31370");
     // form.append('url', "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/5/query?")
     // const PostObject: any = new Object();
     // PostObject.url = 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/5/query?where=&text=&objectIds=&time=&geometry=\'x\':' + nX + ',\'y\':' + nY + '&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=NameDUT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json&inSR=3812';
     // return  this.http.post(`${environment.apiUrl}/cors/GET`, PostObject).toPromise();

     let queryUrl = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/5/";
     const geometry: Point   = new Point  ({
      x: nX,       
      y: nY, 
            
      spatialReference: { wkid:3812 },    
     });  
     
     return query.executeQueryJSON(
       queryUrl,
        { 
           geometry:geometry,
           outFields:["NameDUT"],  
           geometryPrecision:5,
           returnGeometry:false,
           spatialRelationship:"intersects",
           outSpatialReference: { wkid:3812 },          
        }); 
    }


    async  getScaleFromMapExtend(sMapExtend: string){
      /*const form = new FormData();
      form.append('url', "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/export?bbox="+sMapExtend+"&bboxSR=3812&layers=2&layerdefs=&size=1500,1919&imageSR=3812&format=png&transparent=false&dpi=150&time=&layerTimeOptions=&f=json");
      form.append('body', JSON.stringify(""));
      // return this.http.get("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/export?bbox="+sMapExtend+"&bboxSR=3812&layers=2&layerdefs=&size=1500,1919&imageSR=3812&format=png&transparent=false&dpi=150&time=&layerTimeOptions=&f=json").toPromise();
      */
     const PostObject: any = new Object();
     //PostObject.url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/export?bbox=' + sMapExtend + '&bboxSR=3812&layers=2&layerdefs=&size=1500,1919&imageSR=3812&format=png&transparent=false&dpi=150&time=&layerTimeOptions=&f=json';
     PostObject.url = 'https://geoservices.wallonie.be/arcgis/rest/services/IMAGERIE/ORTHO_LAST/MapServer/export?bbox=' + sMapExtend + '&bboxSR=3812&layers=&layerDefs=&size=1500%2C1919&imageSR=&format=png&transparent=false&dpi=150&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=pjson'
     PostObject.body = JSON.stringify(new Object());

     return this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject).toPromise();
    }

    getDataScrapingDocument(sUrl){
     // return  this.http.get(sUrl,{responseType: 'blob'})
     const  reqData: any = new Object();
    /* const form = new FormData();
     form.append('url', sUrl);
     form.append('type', "GET");
     form.append('body', JSON.stringify(reqData));*/
     const PostObject: any = new Object();
     PostObject.url = sUrl;
     PostObject.body = JSON.stringify(reqData);
     return  this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObject, {responseType: 'blob'});
    }

  public  getDataScrapingDocumentCRM(year, month, day){
      return  this.http.get(`${environment.apiBaseUrl}/spider/${year}/${month}/${day}`);
     }



    private async _getCadgisMunicipalityByCapakey(sCapakey: string){
      let geoCapakey:any;


      /*const sUrlPOstcode = 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/10/query?f=pjson&geometry=&maxAllowableOffset=1.1943285669555674&orderByFields=OBJECTID%20ASC&outFields=*&outSR=31370&resultType=tile&returnExceededLimitFeatures=false&spatialRel=esriSpatialRelIntersects&where=CaPakey%20like%20%27' + sCapakey + '%27&geometryType=esriGeometryEnvelope&geometryPrecision=100&inSR=31370';
         sMuKey = await  this.http.get(sUrlPOstcode)
        .pipe(
           map((postalData: any) => postalData.features[0].attributes.AdMuKey ))
        .toPromise()
        .catch(this.alertService.handleError);
      */
      /*const sUrlMunicipality = 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/4/query?where=AdMuKey%20Like%20%27' + sMuKey + '%27&outFields=*&f=pjson';
       return this.http.get(sUrlMunicipality)
       .pipe(
        map((municipalityData: any) => municipalityData.features[0].attributes.NameDUT ))
        .toPromise()
        .catch(this.alertService.handleError);
      */


        //let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/";
        let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/";
       
        geoCapakey = await new Promise((resolve, reject) => {
        query.executeQueryJSON(
          queryUrlPostCode,
           { 
              where:`CaPakey LIKE '${sCapakey}'`,
              outFields:["*"],  
              geometryPrecision:5,
              returnGeometry:true,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((postalData: any)=> 
              { resolve(postalData.features[0].geometry) })
              .catch(this.alertService.handleError);
          })


        let queryUrlMunicipality = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/4/";

        const geometry: any   = ({
          rings: geoCapakey.rings,
          type: 'polygon',
          spatialReference: { wkid:31370 },  
        
        });   
       
        return new Promise((resolve, reject) => {
         query.executeQueryJSON(
          queryUrlMunicipality,
           { 
              where: "1=1",
              geometry: geometry,
              outFields:["*"],  
              geometryPrecision:5,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((municipalityData: any) =>
           {  resolve( municipalityData.features[0].attributes.NameDUT )} )
           .catch(this.alertService.handleError);
          })

    }

    public async LoadMunicipalityByCapakey(sCapakey: string){

       const sURLMunicipality: string = 'https://inspirepub.waterinfo.be/arcgis/rest/services/waterinfo/search_and_select/MapServer/0/query?f=pjson&where=CAPAKEY%20%3D%27' + sCapakey.replace('/', '%2F') + '%27&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100';
       return this.http.get(sURLMunicipality)
       .pipe(
        map((municipalityData: any) => municipalityData.features[0].attributes.gemeente ))
        .toPromise()
        .catch(this.alertService.handleError);
    }

    public  LoadPostalCodeAndMunicipalityByCapakey (sCapakey: string){     
   
      return new Promise((resolve, reject) => {
        this._getCadgisMunicipalityByCapakey(sCapakey).then(
          response => {
            resolve(response);
          }, error => {
            const errorMessage = <any>error;
            if (errorMessage != null) {
              reject(errorMessage);
            }
          }
        )
      })
    }

    public  getImageBasicMap(oBBox: BoundingBox, nWidth= 500, nHeight= 500){
      const thefile = {};
      //const BSKUrl = 'http://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB-basiskaart/wms?Service=wms&Version=1.3.0&Request=GetMap&Width=' + nWidth + '&Height=' + nHeight + '&Format=image%2Fpng&Layers=GRB_BSK&bbox=' + oBBox.lowerLeft.x + '%2C' + oBBox.lowerLeft.y + '%2C' + oBBox.upperRight.x + '%2C' + oBBox.upperRight.y + '&crs=EPSG%3A3812&TRANSPARENT=TRUE';
      //const BSKUrl = 'https://cartoweb.wms.ngi.be/service?Service=wms&Version=1.3.0&Request=GetMap&Width=' + nWidth + '&Height=' + nHeight + '&Format=image%2Fpng&Layers=topo&bbox=' + oBBox.lowerLeft.x + '%2C' + oBBox.lowerLeft.y + '%2C' + oBBox.upperRight.x + '%2C' + oBBox.upperRight.y + '&crs=EPSG%3A3812&TRANSPARENT=TRUE&styles=default';
      const BSKUrl = 'https://wms.ngi.be/inspire/ortho/service?Service=wms&Version=1.3.0&Request=GetMap&Width=' + nWidth + '&Height=' + nHeight + '&Format=image%2Fpng&Layers=orthoimage_coverage_2020&bbox=' + oBBox.lowerLeft.x + '%2C' + oBBox.lowerLeft.y + '%2C' + oBBox.upperRight.x + '%2C' + oBBox.upperRight.y + '&crs=EPSG%3A3812&TRANSPARENT=TRUE&styles=inspire_common:DEFAULT';
      const  sBody = '{}';
      /*const form = new FormData();
      form.append('url', BSKUrl);
      form.append('body', sBody);
      */
      const PostObject: any = new Object();
      PostObject.url = BSKUrl;
      PostObject.body = sBody;
      return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject, {responseType: 'blob'});

    }

    public  getImageBasicVlaanderen(oBBox: BoundingBox, nWidth= 500, nHeight= 500){
      const thefile = {};
      const BSKUrl = 'https://geo.api.vlaanderen.be/omw/wms?Service=wms&Version=1.3.0&Request=GetMap&Width=' + nWidth + '&Height=' + nHeight + '&Format=image%2Fpng&Layers=OMWRGB19VL&bbox=' + oBBox.lowerLeft.x + '%2C' + oBBox.lowerLeft.y + '%2C' + oBBox.upperRight.x + '%2C' + oBBox.upperRight.y + '&crs=EPSG%3A31370&TRANSPARENT=TRUE&styles=DEFAULT';
      const  sBody = '{}';

      const PostObject: any = new Object();
      PostObject.url = BSKUrl;
      PostObject.body = sBody;
      return  this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject, {responseType: 'blob'});

    }

    async LoadAddressByCapakey(sCapakey: string){  
      if(sCapakey==undefined) return "";
      let CapaGeometry:any;
      let AdressDetails:any;

      let queryUrlGeometry = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/";       
      CapaGeometry = await query.executeQueryJSON(
        queryUrlGeometry,
         { 
            where:`CaPaKey LIKE '${sCapakey}'`,
            outFields:["*"],  
            geometryPrecision:5,
            returnGeometry:true,
            spatialRelationship:"contains",
            outSpatialReference: { wkid:31370 },          
         }).then((postalData: any)=> 
            {          
                if(postalData.features[0]?.geometry==undefined){          
                  return undefined;
                 }else{                         
                  return postalData.features[0]?.geometry;   
                }         
              })
            .catch(this.alertService.handleError);


            const geometry: any   = ({
              rings: CapaGeometry.rings[0],
              type: 'polygon',
              spatialReference: {wkid:31370},  
            
            }); 



            let queryUrlAddress = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/9/";       
            AdressDetails = await query.executeQueryJSON(
              queryUrlAddress,
               { 
                  where:`1=1`,
                  geometry:geometry,
                  outFields:["HouseNumber","MunicipalityNameDUT","MunicipalityNameFRE","StreetNameDUT","StreetNameFRE","PostCode"],  
                  geometryPrecision:100,
                  returnGeometry:false,
                  spatialRelationship:"contains",
                  outSpatialReference: { wkid:31370 },          
               }).then((postalData: any)=> 
                  {          
                    if(postalData.features[0]?.attributes==undefined){                    
                       const object=  {
                         MunicipalityName:"",
                         StreetName: "",
                         HouseNumber: "",
                         PostCode: ""
                       } 
                       return object;  
                     }else{                         
                      const object=  
                      {
                        MunicipalityName:postalData.features[0]?.attributes?.MunicipalityNameDUT??postalData.features[0]?.attributes?.MunicipalityNameFRE ,
                        StreetName: postalData.features[0]?.attributes?.StreetNameDUT??postalData.features[0]?.attributes?.StreetNameFRE ,
                        HouseNumber: postalData.features[0]?.attributes?.HouseNumber,
                        PostCode: postalData.features[0].attributes?.PostCode
                      } 
                      return object;    
                    }         
                    })
                  .catch(this.alertService.handleError);






       /* let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/10/";       
        CapaDetails = await query.executeQueryJSON(
          queryUrlPostCode,
           { 
              where:`CaPaKey LIKE '${sCapakey}'`,
              outFields:["AdMuKey","CaStKey","Num","PostKey"],  
              geometryPrecision:5,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((postalData: any)=> 
              {          
                if(postalData.features[0]?.attributes==undefined){                    
                   const object=  {
                     AdMuKey:undefined,
                     CaStKey: undefined,
                     Num: undefined,
                     PostKey: undefined
                   } 
                   return object;  
                 }else{                         
                  const object=  
                  {
                    AdMuKey:postalData.features[0]?.attributes?.AdMuKey,
                    CaStKey: postalData.features[0]?.attributes?.CaStKey,
                    Num: postalData.features[0]?.attributes?.Num,
                    PostKey: postalData.features[0].attributes?.PostKey
                  } 
                  return object;    
                }         
                })
              .catch(this.alertService.handleError);

          if(CapaDetails.PostKey ==undefined ) return "";
          let queryUrlMunicipality = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/4/";       
          let MunicipalityDetails = await query.executeQueryJSON(
          queryUrlMunicipality,
           { 
              where:`AdMuKey LIKE '${CapaDetails.AdMuKey}'`,
              outFields:["*"],  
              geometryPrecision:5,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((municipalityData: any) =>
           {  return municipalityData.features[0]?.attributes?.NameDUT } )
           .catch(this.alertService.handleError);
           if(MunicipalityDetails==undefined) return "";

          let queryUrlStreet = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/24/";       
          let streetDetails =  await query.executeQueryJSON(
          queryUrlStreet,
           { 
              where:`CaStKey  LIKE '${CapaDetails.CaStKey}'`,
              outFields:["NameDUT"],  
              geometryPrecision:5,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((municipalityData: any) =>
           {  return municipalityData.features[0]?.attributes?.NameDUT } )
           .catch(this.alertService.handleError);

           return streetDetails+" "+CapaDetails.Num+", "+CapaDetails.PostKey +" "+MunicipalityDetails;      
           */   
          if(AdressDetails.StreetName!="" && AdressDetails.HouseNumber!=""){
            return AdressDetails.StreetName+" "+AdressDetails.HouseNumber+", "+AdressDetails.PostCode +" "+AdressDetails.MunicipalityName; 
          }else{
            return "";
          }
                    
    }

    async LoadAddressByGeometryObject(geometry: any){  
          if(geometry==undefined) return "";          
           
              geometry.type='polygon';
              geometry.spatialReference= {wkid:102100};            
            
             let queryUrlAddress = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/9/";       
             let  AdressDetails:any = await query.executeQueryJSON(
              queryUrlAddress,
               { 
                  where:`1=1`,
                  geometry:geometry,
                  outFields:["HouseNumber","MunicipalityNameDUT","MunicipalityNameFRE","StreetNameDUT","StreetNameFRE","PostCode"],  
                  geometryPrecision:100,
                  returnGeometry:false,
                  spatialRelationship:"contains",
                  outSpatialReference: { wkid:31370 },          
               })
               .then((postalData: any)=> 
                  {          
                    if(postalData.features[0]?.attributes==undefined){                    
                       const object=  {
                         MunicipalityName:"",
                         StreetName: "",
                         HouseNumber: "",
                         PostCode: ""
                       } 
                       return object;  
                     }else{                         
                      const object=  
                      {
                        MunicipalityName:postalData.features[0]?.attributes?.MunicipalityNameDUT??postalData.features[0]?.attributes?.MunicipalityNameFRE ,
                        StreetName: postalData.features[0]?.attributes?.StreetNameDUT??postalData.features[0]?.attributes?.StreetNameFRE ,
                        HouseNumber: postalData.features[0]?.attributes?.HouseNumber,
                        PostCode: postalData.features[0].attributes?.PostCode
                      } 
                      return object;    
                    }         
               })
               .catch(this.alertService.handleError);    
               if(AdressDetails.StreetName!="" && AdressDetails.StreetName!=undefined){
                return AdressDetails.StreetName+" "+AdressDetails.HouseNumber+", "+AdressDetails.PostCode +" "+AdressDetails.MunicipalityName;     
               }else{
                return AdressDetails.StreetName+" "+AdressDetails.HouseNumber+" "+AdressDetails.PostCode +" "+AdressDetails.MunicipalityName;     
               }   
                 
    }

    async LoadAddressByGeometry(sGeometry: any){  
      //let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/";       
      let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/";       
      const geometry: any   = ({
        rings: sGeometry.rings,
        type: 'polygon',
        spatialReference: SpatialReference.WebMercator,  
      
      }); 
        let CapaDetails:any = await query.executeQueryJSON(
          queryUrlPostCode,
           { 
              
              outFields:["CaPaKey"],  
              geometryPrecision:5,
              geometry:geometry,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((postalData: any)=> 
              {                 
                const object=  
                {
                  CaPaKey:postalData.features[0].attributes.CaPaKey,                  
                } 
                return object;             
                })
              .catch(this.alertService.handleError); 
              if(CapaDetails.CaPaKey!=undefined) {
                return await this.LoadAddressByCapakey(CapaDetails.CaPaKey);
              }else{
                return "";
              }
    }

    async LoadCapakeyByGeometry(sGeometry: any){  
      //let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/";       
      let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/";       
      const geometry: any   = ({
        rings: sGeometry.rings,
        type: 'polygon',
        spatialReference: SpatialReference.WebMercator,  
      
      }); 
        let CapaDetails:any = await query.executeQueryJSON(
          queryUrlPostCode,
           { 
              
              outFields:["CaPaKey"],  
              geometryPrecision:5,
              geometry:geometry,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((postalData: any)=> 
              {                 
                const object=  
                {
                  CaPaKey:postalData.features[0].attributes.CaPaKey,                  
                } 
                return object;             
                })
              .catch(this.alertService.handleError); 
             return CapaDetails;
      }    
      
    async LoadRegionByPoint(sGeometry: any){             
      let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/1/";       
      const pointGeometry = new Point({
        hasZ: true,
        hasM: true,
        x:sGeometry.x,
        y:sGeometry.y,          
        spatialReference: {wkid: 31370} 
      });
        let CapaDetails:any = await query.executeQueryJSON(
          queryUrlPostCode,
           {               
              outFields:["NameDUT"],  
              geometryPrecision:5,
              geometry:pointGeometry,
              returnGeometry:true,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((postalData: any)=> 
              {                 
                const object=  
                {
                  NameDUT:postalData.features[0].attributes.NameDUT,                  
                } 
                return object;             
                })
              .catch(this.alertService.handleError); 
             return CapaDetails;
      }
      
    async LoadRegionByPoygon(sGeometry: any,InSRS:string="31370"){             
        let queryUrlPostCode = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/1/";     
        
        const geometry: any   = ({
          rings: sGeometry.rings,
          type: 'polygon',
          spatialReference: { wkid:Number(InSRS) },  
        
        }); 

          let CapaDetails:any = await query.executeQueryJSON(
            queryUrlPostCode,
             {               
                outFields:["NameDUT"],  
                geometryPrecision:5,
                geometry:geometry,
                returnGeometry:false,
                spatialRelationship:"intersects",
                outSpatialReference: { wkid: Number(InSRS)},          
             }).then((postalData: any)=> 
                {                 
                  const object=  
                  {
                    NameDUT:postalData.features[0].attributes.NameDUT,                  
                  } 
                  return object;             
                  })
                .catch(this.alertService.handleError); 
               return CapaDetails;
    }


      public async getCadgisMunicipalityByGeometry(oGeometry: Geometry){
      
        let queryUrlMunicipality = "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/4/";       
        return new Promise((resolve, reject) => {
         query.executeQueryJSON(
          queryUrlMunicipality,
           { 
              where: "1=1",
              geometry: oGeometry,
              outFields:["*"],  
              geometryPrecision:5,
              returnGeometry:false,
              spatialRelationship:"intersects",
              outSpatialReference: { wkid:31370 },          
           }).then((municipalityData: any) =>
           {  resolve( 
                     { 
                        "AdMuKey": municipalityData.features[0].attributes.AdMuKey,
                        "NameFRE": municipalityData.features[0].attributes.NameFRE,
                        "NameDUT": municipalityData.features[0].attributes.NameDUT, 
                        "NameGER": municipalityData.features[0].attributes.NameGER,
                        "NameENG": municipalityData.features[0].attributes.NameENG,
                      }     
                  )
            } )
           .catch(this.alertService.handleError);
          })

    }
}




const wo = function() {
  function e() {}
  return e.getPageDimensionInPixelForResolution = function(e, t) {
      return [this.pageSizeInMM[e][0] * t / 25.4, this.pageSizeInMM[e][1] * t / 25.4]
  }
  ,
  e.getPageDimensionInPixelForResolutionLandscape = function(e, t) {
      return [this.pageSizeLandscapeInMM[e][0] * t / 25.4, this.pageSizeLandscapeInMM[e][1] * t / 25.4]
  }
  ,
  e.getPageDimension = function(e) {
      return [this.pageSizeInPixelAtOpenlayersDpi[e][0], this.pageSizeInPixelAtOpenlayersDpi[e][1]]
  }
  ,
  e.getPageDimensionLandscape = function(e) {
      return [this.pageSizeLandscapeAtOpenlayersDpi[e][0], this.pageSizeLandscapeAtOpenlayersDpi[e][1]]
  },

  e.getResolutionFromScale = function(e) {                
      return e / (39.37 * 1 * (25.4 / .28))
  }
  ,
  e.pageSizeInMM = {
      A4: ["180", "230"],
      A3: ["254", "325"],
      A2: ["360", "460"],
      A1: ["509", "651"],
      A0: ["721", "921"]
  },
  e.pageSizeInPixelAtOpenlayersDpi = {
      A4: ["643", "821"],
      A3: ["907", "1161"],
      A2: ["1286", "1643"],
      A1: ["1818", "2325"],
      A0: ["2575", "3289"]
  },
  e.pageSizeLandscapeInMM = {
      A4: ["144", "268"],
      A3: ["204", "377"],
      A2: ["289", "534"],
      A1: ["408", "726"],
      A0: ["579", "1069"]      
  },
  e.pageSizeLandscapeAtOpenlayersDpi = {
      A4: ["514", "924"],
      A3: ["728", "1346"],
      A2: ["1032", "1907"],
      A1: ["1457", "2592"],
      A0: ["2068", "3817"]
  },
  e
}()


const xo = function() {
  function e() {}
  return e.PRINT_OFFICIAL_TITLE = {
      fr: "",
      nl: ""
  },
  e.PRINT_UNOFFICIAL_TITLE = {
      fr: "",
      nl: ""
  },
  e.PRINT_OFFICIAL_COPYRIGHT = {
      fr: "L\u2019AGDP est l\u2019auteur du plan parcellaire cadastral et le producteur de la base de donn\xe9es de laquelle les donn\xe9es sont reprises et jouit de la propri\xe9t\xe9 intellectuelle comme repris dans la loi sur les droits d\u2019auteurs et les droits des bases de donn\xe9es. Depuis le 01/01/2018 les b\xe2timents du plan parcellaire cadastral seront repris progressivement remplac\xe9 par un set de donn\xe9es (= Bpn_Rebu autrement dit B\xe2timent (R\xe9gion)) g\xe9r\xe9 par les r\xe9gions. L\u2019AGDP ne sera d\xe8s lors plus responsable pour la repr\xe9sentation des b\xe2timents sur le plan parcellaire cadastral.",
      nl: "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan"
  },
  e.PRINT_UNOFFICIAL_COPYRIGHT = {
      fr: "L\u2019AGDP est l\u2019auteur du plan parcellaire cadastral et le producteur de la base de donn\xe9es de laquelle les donn\xe9es sont reprises et jouit de la propri\xe9t\xe9 intellectuelle comme repris dans la loi sur les droits d\u2019auteurs et les droits des bases de donn\xe9es. Depuis le 01/01/2018 les b\xe2timents du plan parcellaire cadastral seront repris progressivement remplac\xe9 par un set de donn\xe9es (= Bpn_Rebu autrement dit B\xe2timent (R\xe9gion)) g\xe9r\xe9 par les r\xe9gions. L\u2019AGDP ne sera d\xe8s lors plus responsable pour la repr\xe9sentation des b\xe2timents sur le plan parcellaire cadastral.",
      nl: "De AAPD is de auteur van het kadastraal percelenplan en de producent van de databank waarin deze gegevens zijn opgenomen en geniet de intellectuele eigendomsrechten opgenomen in de Auteurswet en de Databankenwet. Vanaf 01/01/2018 worden de gebouwen op het kadastraal percelenplan geleidelijk vervangen door een dataset (= Bpn_Rebu oftewel Gebouwen(gewesten)) beheerd door de gewesten. De AAPD zal dan niet langer verantwoordelijk zijn voor de voorstelling van de gebouwen op het kadastraal percelenplan"
  },
  e.PRINT_CENTERED_ON = {
      fr: "Centr\xe9 sur : ",
      nl: "Centr\xe9 sur : "
  },
  e
}()


/*

const T = function() {
  function e() {}
  return e.getResolutionFromScale = function(e) {
      var t = v.BELGIAN_PROJECTION.getUnits();
      return e / (39.37 * v_a[t] * (25.4 / .28))
  }
  ,
  e.getCenterOfExtent = function(e) {
      return [e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2]
  }
  ,
  e.printCircularJson = function(e) {
      var t = [];
      JSON.stringify(e, function(e, n) {
          if ("object" == typeof n && null !== n) {
              if (-1 !== t.indexOf(n))
                  try {
                      return JSON.parse(JSON.stringify(n))
                  } catch (e) {
                      return
                  }
              t.push(n)
          }
          return n
      }),
      t = null
  }
  ,
  e.getProxiedUrl = function(e) {    
      return "https://eservices.minfin.fgov.be/ecad-backend-rest/proxy"+ "?url=" + e
  }
  ,
  e
}()*/
