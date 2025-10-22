import { Injectable, Injector, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, from, Subject, of, lastValueFrom } from 'rxjs';
import { debounceTime, delay, first, map, switchMap, tap } from 'rxjs/operators';
import { ProspectionParcelAttribute, ProspectionParcels} from '@shared/models';
import { AlertService} from '@shared/services/alert.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SortColumn, SortDirection } from '@shared/directives/sortable.directive';
import Multipoint from "@arcgis/core/geometry/Multipoint";
import * as query from "@arcgis/core/rest/query.js";
import * as identify from "@arcgis/core/rest/identify.js";
import config from '@arcgis/core/config';
import WFSLayer from '@arcgis/core/layers/WFSLayer';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as wfsUtils from '@arcgis/core/layers/ogc/wfsUtils';
import * as projection from "@arcgis/core/geometry/projection";
import Point from '@arcgis/core/geometry/Point';



@Injectable({
  providedIn: 'root'
})
export  class ProspectionGewestPlanService
{
  private _municipalityCapakeys: BehaviorSubject<Array<string>>=new BehaviorSubject<Array<string>>([]);
  public  municipalityCapakeys: Observable<Array<string>>=this._municipalityCapakeys.asObservable();  
  
  private _gewestplanCapabilities: BehaviorSubject<any>=new BehaviorSubject<any>([]);
  public  gewestplancapabilities: Observable<any>=this._gewestplanCapabilities.asObservable();

  private _gewestplanDescription: BehaviorSubject<any>=new BehaviorSubject<any>(null);
  public  gewestplanDescription: Observable<any>=this._gewestplanDescription.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(false);
  private _onSearch$ = new BehaviorSubject<boolean>(false);



 clearSearch(){
  this._municipalityCapakeys.next([]);  
}

  constructor(    
    public http: HttpClient,
    private alertService: AlertService,
    private pipe: DatePipe,
    private translateService: TranslateService,
    )
    {
      config.request.timeout = 30000;
      let UrlLayer="https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wfs";
       wfsUtils.getCapabilities(UrlLayer).then((capabilities) => {
        this._gewestplanCapabilities.next(capabilities);
       let  LayerName="lu:lu_gwp_gv";
       let  PropertyName="svnaam";
       let  GeometryPropertyName="geometrie";
         wfsUtils.getWFSLayerInfo(capabilities, LayerName).then((wfsLayerInfo) => {
          // create a WFSLayer from the layer info
         // const layer = WFSLayer.fromWFSLayerInfo(wfsLayerInfo);          
          this._gewestplanDescription.next(wfsLayerInfo)
        })



       });
    }

  private   _getGewestPlanByPolygon(nRegion,polygon: any){
    let sPolygon='';
    let sPolygonConverted='';
    polygon.rings[0].forEach((element,index) => {
      if (index >0){
        sPolygon += ',';
      }                     
      sPolygon += element[0] + ' ' + element[1];
    });    
   return  projection.load().then(async function() {

    /* WFS Requests
      GetCapabilities (discovery operation)
      DescribeFeatureType (discovery operation)
      GetPropertyValue (query operation)
      GetFeature (query operation)
      GetFeatureWithLock (query & locking operation)
      LockFeature (locking operation)
      Transaction (transaction operation)
      CreateStoredQuery (stored query operation)
      DropStoredQuery (stored query operation)
      ListStoredQueries (stored query operation)
      DescribeStoredQueries (stored query operation)

    */
    polygon.rings[0].forEach((element,index) => {
        const pointToFocus = new Point({
          hasZ: true,
          hasM: true,
          x:element[0],
          y:element[1],          
          spatialReference: {wkid: 102100} 
        });  
        let convertMercator :any =  projection.project(pointToFocus, {wkid: 31370} );
        if (index >0){
          sPolygonConverted += ',';
        }                     
        sPolygonConverted += convertMercator.x + ' ' + convertMercator.y;
      })

      let UrlLayer:string="";
      let LayerName:string="";
      let PropertyName:string="";
      let GeometryPropertyName:string="";
      switch(nRegion){

        case "1":{
          //Vlaanderen
          //https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wfs?service=wfs&version=2.0.0&request=DescribeFeatureType&outputFormat=application/json&typeNames=lu:lu_gwp_gv
          UrlLayer="https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wfs";
          LayerName="lu:lu_gwp_gv";
          PropertyName="svnaam";
          GeometryPropertyName="geometrie";
         /*
          return wfsUtils.getCapabilities(UrlLayer).then((capabilities) => {
            this._gewestplanCapabilities.next(capabilities);
            return  wfsUtils.getWFSLayerInfo(capabilities, LayerName).then((wfsLayerInfo) => {
               // create a WFSLayer from the layer info
               const layer = WFSLayer.fromWFSLayerInfo(wfsLayerInfo);
               layer.customParameters={      
                 "TYPENAMES": LayerName,  
                 "CQL_FILTER": `Intersects(${GeometryPropertyName},POLYGON((${sPolygonConverted})))`,
                 "PROPERTYNAME": PropertyName,           
                 "SRSNAME":"EPSG:31370"
               };          
               return layer.queryFeatures();
             })
           });  
          */


          //let wfsLayer=this._gewestplanDescription.value;
          const wfsLayer = WFSLayer.fromWFSLayerInfo(this._gewestplanDescription.value); 
          wfsLayer.customParameters={};
          wfsLayer.customParameters={      
            "TYPENAMES": LayerName,  
            "CQL_FILTER": `Intersects(${GeometryPropertyName},POLYGON((${sPolygonConverted})))`,
            "PROPERTYNAME": PropertyName,           
            "SRSNAME":"EPSG:31370"
          };          
          return await wfsLayer.queryFeatures();
        }
        case "2":{
          //Wallonie
          //https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wfs?service=wfs&version=2.0.0&request=DescribeFeatureType&outputFormat=application/json&typeNames=lu:lu_gwp_gv
          UrlLayer="https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wfs";
          LayerName="lu:lu_gwp_gv";        
          GeometryPropertyName="geometrie";
          //https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/identify
          const geometry: any   = ({
            rings: polygon.rings,
            type: 'polygon',
            spatialReference: SpatialReference.WebMercator,  
          
          });   
          /*  
          Identity operation for multiple layers
          let params = new IdentifyParameters();
          params.tolerance = 3;
          params.layerIds = [1,2,13,22,23];
          params.layerOption = "all";
          params.width = 500;
          params.height = 500;    
          return identify.identify("https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/identify",params);
          */
              
          return query.executeQueryJSON(
            "https://geoservices.wallonie.be/arcgis/rest/services/AMENAGEMENT_TERRITOIRE/PDS/MapServer/22/",
             {  // autocasts as new Query()
                where: "1=1",
                geometry: geometry,
                spatialRelationship: "intersects",
                outFields:["*"],              
                geometryPrecision:5
             });          
        }
        case "3":{
          //Brussel
          //https://gis.urban.brussels/geoserver/wfs?service=wfs&version=2.0.0&request=DescribeFeatureType&outputFormat=application/json&typeNames=PERSPECTIVE_NL:Groengebieden_GBP_groengebieden
         /* UrlLayer="https://gis.urban.brussels/geoserver/wfs";
          LayerName="PERSPECTIVE_NL:Groengebieden_GBP_groengebieden";
          PropertyName="CAT_DU";
          GeometryPropertyName="GEOMETRY";
          return wfsUtils.getCapabilities(UrlLayer).then((capabilities) => {
            return  wfsUtils.getWFSLayerInfo(capabilities, LayerName).then((wfsLayerInfo) => {
               // create a WFSLayer from the layer info
               const layer = WFSLayer.fromWFSLayerInfo(wfsLayerInfo);
               layer.customParameters={      
                 "TYPENAMES": LayerName,  
                 "CQL_FILTER": `Intersects(${GeometryPropertyName},POLYGON((${sPolygonConverted})))`,
                 "PROPERTYNAME": PropertyName,           
                 "SRSNAME":"EPSG:31370"
               };          
               return layer.queryFeatures();
             })
           }) */
                                
           return new Promise(resolve=>{resolve({
            "features":[
                  {
                    "attributes":{
                      "CAT_DU":"Not available"
                    }
                  }
                ]
              })}); 
                  
        }
      }

      //?? Not all code paths return a value fix
      return null;
     
    
     }.bind(this)) 
    }
   


  public async getGewestPlanByPolygon(nRegion,polygon: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this._getGewestPlanByPolygon(nRegion,polygon).then(
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


  

 
}


interface SearchParams {
  polygon: any;
  from: number;
  to: number;

}









