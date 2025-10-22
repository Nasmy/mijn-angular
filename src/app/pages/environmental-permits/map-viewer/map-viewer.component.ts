import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { setAssetPath as setCalciteComponentsAssetPath } from '@esri/calcite-components/dist/components';
//import "@arcgis/map-components/dist/components/arcgis-map";
//import "@arcgis/map-components/dist/components/arcgis-map";
//import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@esri/calcite-components";
import "@esri/calcite-components/dist/components/calcite-button";

import { Alert, BoundingBox, Combo, Guid, LayerCategory, Layer_legend, Layers, Parcel, Permit_projects, RequestCompanyAccess, User } from '@shared/models';
import { AlertService, ConfirmationDialogService, EnvironmentalpermitsLocalService, LayerService, MapService } from '@shared/services';

/* Arcgis */
import EsriMap from '@arcgis/core/Map';
import Basemap from "@arcgis/core/Basemap.js";
import esri = __esri;
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import WMSLayer from '@arcgis/core/layers/WMSLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import WFSLayer from '@arcgis/core/layers/WFSLayer';
/*widgets*/
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import Sketch from '@arcgis/core/widgets/Sketch';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
import Popup from '@arcgis/core/widgets/Popup';
import Search from '@arcgis/core/widgets/Search';
import Feature from '@arcgis/core/widgets/Feature';
import Features from '@arcgis/core/widgets/Features';

import * as promiseUtils from '@arcgis/core/core/promiseUtils';
import * as urlUtils from '@arcgis/core/core/urlUtils';
import * as wfsUtils from '@arcgis/core/layers/ogc/wfsUtils';
//import * as watchUtils from '@arcgis/core/core/watchUtils';
import  * as watchUtils from "@arcgis/core/core/reactiveUtils";
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import MapView from '@arcgis/core/views/MapView';
import * as projection from "@arcgis/core/geometry/projection";
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import Geometry from '@arcgis/core/geometry/Geometry';
import Point, * as ErsriPoint from '@arcgis/core/geometry/Point';
import Circle from '@arcgis/core/geometry/Circle';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { TranslateService } from '@ngx-translate/core';
import Query from '@arcgis/core/rest/support/Query';
import Zoom from "@arcgis/core/widgets/Zoom";

import esriRequest from "@arcgis/core/request";
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Measurement from '@arcgis/core/widgets/Measurement';


import LayerList from '@arcgis/core/widgets/LayerList';
import { Parser, processors } from 'xml2js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';


import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { ConfigurationService } from '@services/configuration.service';
import { AuthService } from '@services/auth.service';
import { ComboService } from '@services/combo.service';
import { NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule,NzCheckBoxOptionInterface,NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzImageModule } from 'ng-zorro-antd/image';
import { EnvironmentalpermitsRemoteService } from '@shared/services/environmentalpermits_remote.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { permitFilterData } from './permit-betreft';
import { GeometryHelper } from '@shared/helpers/geometry.helper';
import { PermitsPreviewComponent } from '../permits-preview/permits-preview.component';

const measurement = new Measurement();
const onpointsLayer = new GraphicsLayer({title: 'Tool3', listMode: 'hide'});
const onHistorypointsLayer = new GraphicsLayer({title: 'Tool3', listMode: 'hide'});
const graphicsLayer = new GraphicsLayer({title: 'Tool 2', listMode: 'hide'});
const mouseOverLayer = new GraphicsLayer({title: 'Tool', listMode: 'hide'});

interface ICadGisPrint {
  pageFormat: string;
  scale: string;
  resolution: string;
  pageorientation: string;
}

@Component({
  selector: 'app-map-viewer-env',
  standalone: true,
  imports: [
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    TranslateModule,
    NzSegmentedModule,
    FormsModule,  
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    NzDrawerModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzTabsModule,
    NzCollapseModule,
    NzToolTipModule,    
    NzAlertModule,
    NzSpinModule,
    NzModalModule,
    NzImageModule,
    NzRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatSliderModule   

  ],
  templateUrl: './map-viewer.component.html',
  styleUrl: './map-viewer.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MapViewerComponent {

// The <div> where we will place the map
    @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
    @ViewChild('mapDistances', { static: true }) private mapDistances: ElementRef;
    @ViewChild('mapArea', { static: true }) private mapArea: ElementRef;
    @ViewChild('clear', { static: true }) private clear: ElementRef;
    @ViewChild('legendView', { static: true }) private legendView: ElementRef;
    @ViewChild('shetch', { static: true }) private sketchview: ElementRef;
    @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
      $implicit: { value: string };
      drawerRef: NzDrawerRef<string>;
    }>;
    @ViewChild(MatSort) sort: MatSort;

    @Input() leftDriverDisplay: BehaviorSubject<boolean>;
     
    options: NzCheckBoxOptionInterface[] = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ];


  private _loadingEnviroment: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public loadingEnviroment: Observable<boolean>=this._loadingEnviroment.asObservable();    

  arrCombos: { [key: string]: Array<Combo> } = {};
  arrCombosFiltered: { [key: string]: Array<Combo> } = {};
  autoFilter!: Observable<Combo[]>;
  autoFilterAdress!: Observable<Combo[]>;

  private oRegions: { [key: string]: string} = {};

  nRegionId
  searchType
  displayType="all"; // all, active, history
  submitted
  ItemsCapakey!: Combo[];
  public mapSearchFilter: string = '';

  isAllCheckedFirstChange = true;
  allChecked = false;
  indeterminate = false;
  public valueLayers:Array<string>=[];


  public form!: FormGroup; 
  public formHistory: FormGroup | undefined;
  private _zoom = 10;
  public _center: Array<number> = [4.4024643, 51.2194475];
  private _view: esri.MapView = null;
  private bMapInitialized = false;
  private _polygon = '';
  private bMeasurement:boolean |false;
  private bSketch:boolean |false;
  
  private arrCapabilities: Array<WMSLayer>=[];
  private  search= new Search();
  private _arrParcells: Array<Parcel> = [];
  public mapViewProperties: esri.MapViewProperties = {};
  public sketch = new Sketch();
  private lstLayersCategoryAll: Array<LayerCategory>=[];
  private lstLayersCategory$: BehaviorSubject<Array<LayerCategory>> = new BehaviorSubject<Array<LayerCategory>>(null);
  public  lstLayersCategory$$: Observable<Array<LayerCategory>> = this.lstLayersCategory$.asObservable();

  private onEnvironmentLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public  onEnvironmentLoading$$: Observable<boolean> = this.onEnvironmentLoading$.asObservable();

  private imgCadgis$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public  imgCadgis$$: Observable<string> = this.imgCadgis$.asObservable();

  private selectedPoint$: BehaviorSubject<Point> = new BehaviorSubject<Point>(null);
  private selectedRadius$: BehaviorSubject<Circle> = new BehaviorSubject<Circle>(null);

  public oCadGisPrint?: ICadGisPrint;
  public arrLayers: Array<Layers>=[];
  public arrAllLayers: Array<Layers>=[];
  public lstLegends: Array<Layer_legend>;
  public omgevingsData:any;
  public isVisibleZoneRequest:boolean |false;
  public isVisibleCadgisPrint:boolean |false;
  public isConfirmLoading:boolean |false;
  public oRequestsAcces: RequestCompanyAccess;
  private user: User;
  public totalCreditUsed:boolean |false;
  public requestSubmitedSuccessfull:boolean |false;
  public cadgisSubmitedSuccessfull:boolean |false;
  public oncadgisloading:boolean |false;
  public allertMessage:Alert;
  private _searchType:string="";
  dataSource = new MatTableDataSource<any>([]);

  displayedOmgevingsColumnsList: string[] = ['id', 'name','details'];
  items: any[];
  private legendEnabled = false;

  private  basemap_satelite = new Basemap({      
    portalItem: {
      id: "ff52218580f94d89851563f50cd1a2b2" // World imaginery
    }     
  });  

  public  mapProperties: esri.MapProperties = {
    //basemap: this._basemap,  
    basemap: this.basemap_satelite,
  };

  // create the measurement widgets and hide them by default
  private  distanceMeasurement2D = new DistanceMeasurement2D({
    view:this._view
    
   });
   private areaMeasurement2D = new AreaMeasurement2D({
     view:this._view        
   });

   formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  //Custom Layers 
   public KBOVlaanderen = new WMSLayer( {
    id:"90000",
    url: 'https://geo.api.vlaanderen.be/VKBO/wms',
    title: 'KBO Vlaanderen',
    listMode: 'show',
    visible: false, 
    spatialReference: SpatialReference.WebMercator,
    sublayers:[
      {
      id:90001,      
      name:"Onderneming" ,
      title: "Onderneming",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://geo.api.vlaanderen.be/VKBO/wms?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&version=1.3.0&layer=Onderneming"

    },
    {
      id:90002,      
      name:"Vestiging" ,
      title: "Vestiging",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://geo.api.vlaanderen.be/VKBO/wms?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&version=1.3.0&layer=Vestiging"

    }
  ],
  featureInfoUrl:"https://geo.api.vlaanderen.be/VKBO/wms",
  fetchFeatureInfoFunction: async (query) => {                       
    query.info_format="application/vnd.esri.wms_featureinfo_xml";                    
    return await this.loadFeatureFromLayer(this.KBOVlaanderen.url,query,this.KBOVlaanderen.title);                  
  } 
  });

  public EnvironmentLayer = new WMSLayer( {
    id:"80000",
    url: 'https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wms',
    title: 'Omgevingsverguningen Vlaanderen',
    listMode: 'show',
    visible: true, 
       
    spatialReference: SpatialReference.WGS84,
    sublayers:[{
      id:80001,      
      name:"lu:lu_omv_kh_v2" ,
      title: "Omgevingsvergunning - Kleinhandel",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=lu:lu_omv_kh_v2"

    },
    {
      id:80002,      
      name:"lu:lu_omv_vk_v2" ,
      title: "Omgevingsvergunning - Verkavelingen",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=lu:lu_omv_vk_v2"

    },
    {
      id:80003,      
      name:"lu:lu_omv_gd_v2" ,
      title: "Omgevingsvergunning - Stedenbouwkundige projecten",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=lu:lu_omv_gd_v2"

    },
    {
      id:80004,      
      name:"lu:lu_omv_iioa_v2" ,
      title: "Omgevingsloket - Exploitatie van een ingedeelde inrichting of activiteit - V2",
      popupEnabled: true,
      queryable: true,
      visible: false,
      legendEnabled: true,    
      legendUrl:"https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=lu:lu_omv_iioa_v2"

    },
    ],
    featureInfoUrl:"https://www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/wms",   
    fetchFeatureInfoFunction: async (query) => {                         
     // query.info_format="text/xml";                    
      query.info_format="application/json";                    
      return await this.loadFeatureFromLayer(this.EnvironmentLayer.url,query,this.EnvironmentLayer.title);                  
    }  
  });

  public map: esri.Map = new EsriMap(this.mapProperties);
  
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private confirmationService: ConfirmationDialogService,
    private mapService: MapService,
    private layerService:LayerService,
    private translate: TranslateService,
    private comboService: ComboService,
    private changeDetect: ChangeDetectorRef,
    private modalZService: NzModalService,
    private accountService: AuthService,
    private configurationService:ConfigurationService,
    public permitService:EnvironmentalpermitsRemoteService,
    public permitServiceLocal:EnvironmentalpermitsLocalService,
    public http: HttpClient,
  ) {
    this.user = this.accountService.userValue;
    this.oCadGisPrint= {
      pageFormat:'1',
      pageorientation:'1',
      resolution:'2',
      scale:'1'
    }
     setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");
  }
  public view: any = null;

    ngAfterViewInit(){
     // this.openMapOptions()
    }

  get SelectedPlots(){
    return this._arrParcells;
  }
  get SelectedPlotsSurface(){
    if(this._arrParcells.length>0){
      const sum = this._arrParcells.map((a) => a.surface).reduce((sum, p) => sum + p);
      return sum;
    }else{
      return 0;
    }   
  }

  ngOnInit(): any {
    const CapakeyValidators = [ Validators.required,Validators.pattern("^[0-9]{5}[A-Z]{1}([0-9]{4})\/([0-9]{2})([A-Z\_]{1})([0-9]{3})$")];
    this.allertMessage=<Alert>{};
    this._arrParcells=[];
    this.ItemsCapakey=[];
    this.items=[];
    this.arrCombos['CONFIGURATION']=[];
    this.arrCombos["PROCESSINGTYPE"]=[];
    this.bMeasurement = false; 
    this.bSketch = false;    

    this.form = this.formBuilder.group({
      id: [''],
      capakey: ['',CapakeyValidators],
      address: [''],
      capakeyAdress: [''],
      radius: [100],
      filter_publication: [],
      filter_goverment: []
    });

    this.formHistory = this.formBuilder.group({           
        uuid:[],
        adress:[],       
        screening_city:[],       
        project_number:[],       
        project_name:[],       
        date_from:[],         
        date_to:[],         
        betreft:[],         
        beslising:[],         
        zipcode:[],         
       
      });


    this.alertService.onAlert().subscribe(allertData=>{
      this.allertMessage=allertData;
    });

    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized

     mapView.on('click', async function (event) {
        if (this.bMeasurement === false && this.bSketch === false) {                  
          const div = document.createElement('div');        
          // alternative  add capakey from layer
          const queryCapa = new Query();
          queryCapa.geometry = event.mapPoint;
          queryCapa.outSpatialReference = SpatialReference.WebMercator;
          queryCapa.returnGeometry = true;
          queryCapa.outFields = ['*'];
          this.fLayer.queryFeatures(queryCapa)
            .then((results: any) => {
              if (results.features.length === 0) {
                // clearSelection();
              } else {

                for (let i = 0; i < results.features.length; i++) {
                  const oCenter: any = JSON.parse('{"x": ' + results.features[i].geometry.centroid.x + ',"y": ' + results.features[i].geometry.centroid.y + ' }');
                  const oParcel: Parcel = new Parcel();
                  oParcel.capakey = results.features[i].attributes.CaPaKey;
                  oParcel.rings = results.features[i].geometry.rings;
                  oParcel.center = oCenter;
                  oParcel.perimeter = results.features[i].attributes['Shape.STLength()'];
                  oParcel.surface = results.features[i].attributes['SuVaCn'];
                  const nIndex = this._arrParcells.findIndex(elem => elem.capakey === oParcel.capakey);
                  if (nIndex >= 0) {
                    if (this.removePolygonFromView(this._arrParcells[nIndex].rings)) {
                      //this.cleanCapakeyFromArray(oParcel.capakey);
                      this._arrParcells = Object.assign([], this._arrParcells);
                    }                   
                    //this.perceelemitter.emit(this.arrParcells);
                    this.changeDetect.detectChanges();
                    //event.stopPropagation();
                    //return;
                  } else {
                    this._arrParcells.push(oParcel);
                    this._arrParcells = Object.assign([], this._arrParcells);
                    this.addPolygonToView(results.features[i].geometry.rings, false, SpatialReference.WebMercator);  
                    //event.stopPropagation();      
                    this.changeDetect.detectChanges();   
                    //return;
                  }
                }
              }
            });         
         
          const OMyPoint: Point = new Point();
          OMyPoint.x = event.mapPoint.x;
          OMyPoint.y = event.mapPoint.y; 

          const queryConform = new Query();               
          queryConform.geometry = event.mapPoint;  
          queryConform.outFields = ['*'];   
          
          window.setTimeout(() => {  
            this._view.hitTest(event).then((response) => {
              // check if a feature is returned from the hurricanesLayer
              if (response.results.length) {
                var graphic = response.results.filter(function (result) {
                  // check if the graphic belongs to the layer of interest
                    return result.graphic.layer === onpointsLayer;
                  })[0]?.graphic;
        
                  // do something with the result graphic
                  if(graphic!=null && graphic!=undefined){
                   // console.log(graphic.attributes);
                   if(graphic.attributes.loadFromHistory==false){
                     this.getWMSFeatureInfo(event,graphic.attributes.uuid);
                   }                  
                }
              }
            });
          }, 200);


        } 
      }.bind(this));

      mapView.watch("extent", function(newValue, oldValue) {       
        const indexconf = this._view.map.allLayers.findIndex((layer: any) => {
           return layer.id === this.wfsConformAttest?.id;
         });
         if (indexconf >= 0) {
           setTimeout(() => {
             this.refreshConformitheitsAttest();                              
           }, 200)
         }    

              const indexOnbewoon = this._view.map.allLayers.findIndex((layer: any) => {
                return layer.id === this.wfsOnbewoonbaareWoning?.id;
              });
              if (indexOnbewoon >= 0) {
                setTimeout(() => {
                  this.refreshOnbewoonbaareWoning();                              
                }, 200)
              } 

      }.bind(this));

      mapView.watch('zoom', async function (newValue, oldValue, property, object) {     
        if (newValue <= 16) {
          const index = this._view.map.allLayers.findIndex((layer: any) => {
            return layer.url === this.fLayer.url;
          });
          if (index >= 0) {
            this._view.map.allLayers.items.splice(index, 1);
            await this.initializeMap();
          }

          const indexconf = this._view.map.allLayers.findIndex((layer: any) => {
            return layer.id === this.wfsConformAttest.id;
          });
          if (indexconf >= 0) {
             this.wfsConformAttest.visible=false;
          }        

        } else if (newValue >= 17) {
          // this.addToView(this.fLayer);

          const indexconf = this._view.map.allLayers.findIndex((layer: any) => {
            return layer.url === this.wfsConformAttest.url;
          });
          if (indexconf >= 0) {
            this.wfsConformAttest.visible=true;
          }
        }
      }.bind(this));
      console.log('The map is ready.');
    });

    this.layerService.lstLayers$$.subscribe((data: Array<Layers>)=>{
        if (data!=null){
          this.arrAllLayers=data;
          this.arrAllLayers.forEach(element => {
            if(element.url!=undefined && element.url!=""){
              element.url=element.url.replace("http://","https://");
            }
            element.display=false;
          });
        }
    });

    this.mapService.regionIdListener().subscribe((data)=>
      { 
        this.layerService.getByRegionCategorized(this.oRegions[data]).subscribe((dataLayers:LayerCategory[])=>{
            //console.log(dataLayers);
            this.lstLayersCategory$.next(dataLayers);
            this.lstLayersCategory$.value.forEach(category => {
              category.checked=false;
              category.guid="ID_"+Guid.newGuid().toString();
              category.maps.forEach(map => {
              if(map.url!=undefined && map.url!=""){
                map.url=map.url.replace("http://","https://");
              }
              map.display=false;
              category.mapsFiltered=category.maps;
             });
            });

            this.lstLayersCategoryAll=[];
            //this.lstLayersCategoryAll= JSON.parse(JSON.stringify(this.lstLayersCategory$.value));
            this.lstLayersCategoryAll= this.lstLayersCategory$.value;
            this.lstLayersCategory$.next(this.lstLayersCategoryAll);
        });
      });

    this.layerService.lstLayerLegends$$.subscribe(data => {
      this.lstLegends = this.layerService.legendsValue;
    });


   
    //this.layerService.getAllLegends();
    //this.layerService.getAll();
    this.form.get('capakey').valueChanges.subscribe(value => this.mat_filter(value));
    this.form.get('radius')?.valueChanges.subscribe(value => {
      this.changeRadius(value);
    });
    this.permitService.searchProjects.subscribe(dataArray=>{
            let ArrayFiltered:Array<Permit_projects>=[];
            projection.load().then(function() {
                dataArray.forEach((point:any)=>{
                    let sampleRegEx: RegExp = /(\d+\.?\d* \d+\.?\d*)/;
                    let oPoints= sampleRegEx.exec(point.punt);
                
                    const opoint = new Point({
                      hasZ: true,
                      hasM: true,
                      x:Number(oPoints[0].split(' ')[0]),
                      y:Number(oPoints[0].split(' ')[1]),          
                      spatialReference: {wkid: 31370} 
                    });                    
                                                  
                    let convertMercator :any =  projection.project(opoint, {wkid: 102100} );
                    if(GeometryHelper.isPointInCircle(convertMercator, this.selectedRadius$.value)){
                          ArrayFiltered.push(point);
                    }
                    
                  })                
                   this.permitService.setProjectsFiltered=ArrayFiltered;
              }.bind(this)); 
    });

    this.permitService.searchPoints.subscribe(dataArray=>{
      if(this.displayType=="active" || this.displayType=="all"){
        this.addPoints(dataArray);  
      }
    });
    this.permitServiceLocal.searchProjects.subscribe(dataArray=>{    
              let ArrayFiltered:Array<Permit_projects>=[];
              projection.load().then(function() {
                dataArray.forEach((point:any)=>{
                    let sampleRegEx: RegExp = /(\d+\.?\d* \d+\.?\d*)/;
                    let oPoints= sampleRegEx.exec(point.punt);
                
                    const opoint = new Point({
                      hasZ: true,
                      hasM: true,
                      x:Number(oPoints[0].split(' ')[0]),
                      y:Number(oPoints[0].split(' ')[1]),          
                      spatialReference: {wkid: 31370} 
                    });                    
                                                  
                    let convertMercator :any =  projection.project(opoint, {wkid: 102100} );
                    if(GeometryHelper.isPointInCircle(convertMercator, this.selectedRadius$.value)){
                          ArrayFiltered.push(point);
                    }
                    
                  })
                  if(this.displayType=="history" || this.displayType=="all"){
                   this.addPoints(ArrayFiltered, "blue", true);
                  }
                  this.permitServiceLocal.setProjectsFiltered=ArrayFiltered;
              }.bind(this)); 
             
    });



  }

  ngOnDestroy(): void {
    try {
      // Clean up sketch widget
      if (this.sketch) {
        try {
          this._view?.ui.remove(this.sketch);
          this.sketch.destroy();
        } catch (e) {
          console.warn('Error cleaning up sketch widget:', e);
        }
      }

      // Clean up measurement widgets
      if (this.distanceMeasurement2D) {
        try {
          this.distanceMeasurement2D.destroy();
        } catch (e) {
          console.warn('Error cleaning up distance measurement:', e);
        }
      }

      if (this.areaMeasurement2D) {
        try {
          this.areaMeasurement2D.destroy();
        } catch (e) {
          console.warn('Error cleaning up area measurement:', e);
        }
      }

      // Clean up search widget
      if (this.search) {
        try {
          this.search.destroy();
        } catch (e) {
          console.warn('Error cleaning up search widget:', e);
        }
      }

      // Clean up graphics layers
      if (graphicsLayer) {
        graphicsLayer.removeAll();
      }
      if (mouseOverLayer) {
        mouseOverLayer.removeAll();
      }

      // Destroy the map view
      if (this._view) {
        try {
          this._view.container = null;
          this._view.destroy();
        } catch (e) {
          console.warn('Error destroying map view:', e);
        }
      }

      // Destroy the map
      if (this.map) {
        try {
          this.map.destroy();
        } catch (e) {
          console.warn('Error destroying map:', e);
        }
      }
    } catch (error) {
      console.error('Error in ngOnDestroy:', error);
    }
  }

  get f(){
    return this.form.controls;
  }  
  get f_History() { 
    return this.formHistory.controls; 
  }

  changeAddress(event){
    this.selectAdress(event)
    this.form.get('address').setValue(event.name);
  }

  changeSelection(event){
    if(this._searchType=="CAPAKEY"){
      this.changeCapakey(event)
    }else if(this._searchType=="ADDRESS"){
      this.changeAddress(event);
    }

  }

  changeCapakey(event) {
    this.form.get('capakey').setValue(event.name);
    if(this.f["capakey"].invalid){
      return;
    }

    //this.comboService.LoadDataFromCapakeyWaterInfo(event,"3857").subscribe(async (data: any) => {
    this.comboService.LoadDataFromCapakeyCadGis(event.name,"3857").subscribe({
      next: async (data: any) => {
        if (data.features != null) {     
          let ArrRings:Array<string>;
          ArrRings=[];        
          data.features[0].geometry.rings.forEach(ring => {
            ring.forEach(coordinate=>{
              ArrRings.push(coordinate[0]);
              ArrRings.push(coordinate[1]);
            })          
          });
         //this.loadAddressByCapakey(event);
          //let center:any= await this.comboService.GetCenterFromPolygon(ArrRings);
          let center:any= await this.comboService.getPolygonCentroid(data.features[0].geometry.rings[0]);
          const OMyPoint = new Point({
            x: Number(ArrRings[0]),
            y: Number(ArrRings[1]), 
           // spatialReference: {wkid:3857}
          });
          /*const OMyPoint: Point = new Point();
          OMyPoint.x = center.labelPoints[0].y;
          OMyPoint.y = center.labelPoints[0].x; 
          OMyPoint.latitude= center.labelPoints[0].y;
          OMyPoint.longitude=center.labelPoints[0].x;*/
          //const { latitude, longitude } = await this.comboService.convertToWGS84(center.latitude, center.longitude);
          //const dataTrasform: any = await this.comboService.TransformCoordinate(OMyPoint, '3857', '4326');

          const point = new Point({
            x: center.latitude,
            y: center.longitude,         
            latitude: center.latitude,
            longitude: center.longitude,
            spatialReference: this._view.spatialReference
          });
          this.mapService.getCadgisMunicipalityByGeometry(point).then((data: any) => {            
            if (data && data.AdMuKey) {
              this.formHistory.get('screening_city').setValue(data.NameDUT.toString().trim());
            } else {
              this.form.get('screening_city').setValue('');
            }
          });
          this.selectedPoint$.next(point);
          const oCenter = JSON.parse('{"x": ' + center.latitude + ',"y": ' +center.longitude+ ' }');
          this._center = [center.latitude, center.longitude];
          const oParcel: Parcel = new Parcel();
          oParcel.capakey = data.features[0].attributes.CaPaKey;
          oParcel.rings = data.features[0].geometry.rings;
          oParcel.center = oCenter;
          oParcel.perimeter = data.features[0].attributes["SHAPE.STArea()"];
          oParcel.surface = data.features[0].attributes.SuVaCn;

          this._polygon = data.features[0].geometry.rings;        
          this._view.graphics.removeAll();
        //  await this.InitEsriMap();
        //  await this.initializeMap();
          const nIndex = this._arrParcells.findIndex(elem => {
            return  elem.capakey === oParcel.capakey;
           });
          if(nIndex < 0){
              this.changeRadius( this.f['radius'].value);
              let  graphicSection= this.addPolygonToView(this._polygon , false, SpatialReference.WebMercator);  
              this.f['radius'].setValue(100);
          
              this._view.goTo({          
                target: graphicSection,
                option:{ animate:true,duration:0.1},
                zoom: 18
              });                 
              this._arrParcells.push(oParcel);
              this._arrParcells = Object.assign([], this._arrParcells);

              this.changeDetect.detectChanges();    
           }
        }
      },
      error: (error) => {
        console.error('Error loading data from Capakey CadGis:', error);
      }
    });
  }
  private mat_filterCapakey(value: string) {
    const filterValue = value.toLowerCase();
    if (this.ItemsCapakey === undefined) {
      this.ItemsCapakey = [];
    }
    if (filterValue.length > 4) {
      this.comboService.searchCapakey(filterValue, this.ItemsCapakey).subscribe((dataCapakeys: Array<Combo>) => {
        this.ItemsCapakey = dataCapakeys;
        this.autoFilter = new BehaviorSubject<Array<Combo>>(this.ItemsCapakey).asObservable();
        this.ItemsCapakey = Object.assign([], this.ItemsCapakey);
        this._searchType="CAPAKEY";
        this.changeDetect.detectChanges();
      });
    }
  }  

  private changeRadius(valueRadius: string) {
    graphicsLayer.graphics.removeAll();
    // Create a circle with default radius (e.g. 100 meters)
    // const defaultRadius = 100; // meters
    const circle = new Circle({
      center: this.selectedPoint$.value,
      radius: Number(valueRadius),
      radiusUnit: "meters",
      spatialReference: this._view.spatialReference,
      geodesic: true
    });

    if (circle) {
      const graphic = new Graphic({        
        geometry: circle,
        symbol: new SimpleFillSymbol({
          style: "solid",
          color: [230, 0, 0, 0.25],
          outline: {
            color: [0, 0, 0, 0.5],
            width: 2
          }
        })
      });
      this.selectedRadius$.next(circle);
      console.log(this.selectedRadius$.value);
      /* taken radius on  cyrcle */
      const radius = Math.round(circle.radius);
      const center = circle.center;
      
      if (center && radius) {
        const labelPoint = new Point({
          x: center.x,
          y: center.y + (radius / 2),
          spatialReference: this._view.spatialReference
        });                           
        
        const textSymbol = new TextSymbol({
          color: "red",
          haloColor: "white", 
          haloSize: 1,
          text: `${radius}m`,
          font: { size: 12, weight: "bold" }
        });
        const labelGraphic = new Graphic({
          geometry: labelPoint,
          symbol: textSymbol
        });
        // Add to graphics layer
        if (this._view?.graphics) {
          //this._view.graphics.add(graphic);
          graphicsLayer.graphics.add(graphic);
          graphicsLayer.add(labelGraphic);  
        }
      }
    }

  }
  private mat_filter(value: string) {
    const filterValue = value.toLowerCase();
    if (this.ItemsCapakey == undefined) {
      this.ItemsCapakey = []
    }
    if (filterValue.length > 4) {
      this.comboService.searchAddress(filterValue).subscribe((dataAdress: Array<Combo>) => {
        this.ItemsCapakey = dataAdress
        this.autoFilter = new BehaviorSubject<Array<Combo>>(this.ItemsCapakey).asObservable()
        this.ItemsCapakey=Object.assign([],this.ItemsCapakey)
        this._searchType="ADDRESS";
        
        // If we found an address, create a circle sketch
        if (this.ItemsCapakey.length > 0) {
          const firstAddress = this.ItemsCapakey[0];
          const sURL = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?Single%20Line%20Input=${encodeURI(firstAddress.name)}&countryCode=BEL&magicKey=${encodeURI(firstAddress.id)}&maxLocations=6&outSR=%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4326%7D&f=json`;
          
          this.mapService.SendGetProxy(sURL).subscribe((dataResponse: any) => {
            if (dataResponse?.candidates?.[0]) {
              const myAddress = dataResponse.candidates[0];
              const point = new Point({
                x: myAddress.location.y,
                y: myAddress.location.x,         
                latitude: myAddress.location.y,
                longitude: myAddress.location.x,
                spatialReference: this._view.spatialReference
              });
              
              // Focus on the point first
             // this.FocusOnPoint(point);
              

            }
          });
        }

        if(this.ItemsCapakey.length==0){
          this.mat_filterCapakey(value);
        }
        this.changeDetect.detectChanges()
      })
    }
  }




  private selectAdress(event){   
    const sMagicKey: string=event.id
    const sAdress: string=event.name
    const sURL: string="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?Single%20Line%20Input="+encodeURI(sAdress)+"&countryCode=BEL&magicKey="+encodeURI(sMagicKey)+"&maxLocations=6&outSR=%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4306%7D&f=json"
    this.mapService.SendGetProxy(sURL).subscribe((dataResponse:any)=>{
      if (dataResponse!=undefined){
        const myAddress=dataResponse.candidates[0];
        let oPoint: Point=new Point()
        oPoint.x=myAddress.location.y;
        oPoint.y=myAddress.location.x; 

        const point = new Point({
          x: myAddress.location.y,
          y: myAddress.location.x,         
          latitude: myAddress.location.y,
          longitude: myAddress.location.x,
          spatialReference: this._view.spatialReference
        });
        this.selectedPoint$.next(point);
        this.f['radius'].setValue(100);
        this.changeRadius( this.f['radius'].value);
        this.mapService.getCadgisMunicipalityByGeometry(point).then((data: any) => {            
            if (data && data.AdMuKey) {
              this.formHistory.get('screening_city').setValue(data.NameDUT.toString().trim());
            } else {
              this.form.get('screening_city').setValue('');
            }
        });

        // Create a circle with default radius (e.g. 100 meters)
        /*const defaultRadius = 100; // meters
        const circle = new Circle({
          center: point,
          radius: defaultRadius,
          radiusUnit: "meters",
          spatialReference: this._view.spatialReference,
          geodesic: true
        });

        if (circle) {
          const graphic = new Graphic({
            geometry: circle,
            symbol: new SimpleFillSymbol({
              style: "solid",
              color: [230, 0, 0, 0.25],
              outline: {
                color: [0, 0, 0, 0.5],
                width: 2
              }
            })
          });

          // Add to graphics layer
          if (this._view?.graphics) {
            this._view.graphics.add(graphic);
          }
        }*/

        this.searchFromPoint(oPoint);
        setTimeout(() => {
          this.FocusOnPoint(oPoint);
        }, 200);
       
        //this.ngZone.run(() => this.searchFromPoint(oPoint));

      }
    })
  }

    // features graphic
  public graphic = {
      popupTemplate: {
        content: 'Mouse over features to show details...'
      },
      spatialReference: SpatialReference.WebMercator
  };
  
    // Provide graphic to a new instance of a Feature widget
  public feature = new Feature();

  public PerceelPlanLayer = new WMSLayer( {
      url: 'https://eservices.minfin.fgov.be/arcgis/services/R3C/PlanParcellaire/MapServer/WMSServer',
      title: 'Kadastraal Perceel',
      listMode: 'hide',
      visible: true, 
      featureInfoUrl:"https://eservices.minfin.fgov.be/arcgis/services/R3C/PlanParcellaire/MapServer/WMSServer",      
  
      fetchFeatureInfoFunction: async (query) => {
        query.info_format="application/vnd.esri.wms_featureinfo_xml";                    
        return await this.loadFeatureFromLayer(this.PerceelPlanLayer.url,query,this.PerceelPlanLayer.title);                  
      }
  });

  public fLayer = new FeatureLayer({
    //url: 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13',
    url: 'https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11',
    title: 'Cadastraal perceel (CADGIS)',
    outFields: ['*'],
    spatialReference: SpatialReference.WebMercator, 
    popupEnabled:false,
  });

  public  wfsConformAttest = new WFSLayer({
    id:"CONFORMITEITSATTEST",
    url: 'https://geo.api.vlaanderen.be/POI/wfs',        
    outFields: ['*'],
    name:"POI",
    title: 'Woningen met een conformiteitsattest',
    visible:true,
    spatialReference: SpatialReference.WebMercator,   
    refreshInterval:1,
    persistenceEnabled:true,
    
    customParameters: {
      "TYPENAMES": "POI:POI",   
      "filter": "<Filter><PropertyIsEqualTo><PropertyName>POI:PRODUCT</PropertyName><Literal>Conformiteitsattest</Literal></PropertyIsEqualTo></Filter>",      
      "VERSION": "2.2.2"
    },   
    popupEnabled: true,
    popupTemplate: this.createPopupTemplatePOI()

  });

  public  wfsOnbewoonbaareWoning = new WFSLayer({      
    id:"ONBEWOONBAAREWOONING",          
    url: 'https://geo.api.vlaanderen.be/POI/wfs',    
    outFields: ['*'],
    name:"POI",
    title: 'Vlaamse inventaris van ongeschikte en onbewoonbare woningen',
    visible:true,
    spatialReference: SpatialReference.WebMercator,
    customParameters:{
      "cql_filter": "POI:PRODUCT='VlaamseInventarisOngeschikteOnbewoonbareWoningen'",
      "TYPENAMES": "POI:POI",  
    },
    popupEnabled: true,
    popupTemplate: this.createPopupTemplatePOI()

  });


  async initializeMap(sPolygon = '') {
    try {
    for (let j = this.lstLayersCategoryAll.length - 1; j >= 0; j--) {
      for (let i = this.lstLayersCategoryAll[j].maps.length - 1; i >= 0; i--) {
        if (this.lstLayersCategoryAll[j].maps[i].checked === true) {

          if (this.map.allLayers.findIndex((tmpLayer: any) => { return tmpLayer.id == this.lstLayersCategoryAll[j].maps[i].id }) < 0) {
            if (this.lstLayersCategoryAll[j].maps[i].name == "Woningen met een conformiteitsattest") {
              this.addToView(this.wfsConformAttest);
              this.refreshConformitheitsAttest();

              //this.getCapabilities("https://geo.api.vlaanderen.be/POI/wfs","POI");            
            } else if (this.lstLayersCategoryAll[j].maps[i].name == "Vlaamse inventaris van ongeschikte en onbewoonbare woningen") {
              this.addToView(this.wfsOnbewoonbaareWoning);
              this.refreshOnbewoonbaareWoning();
            } else {         //new WMSLayer   
              const wmsLayer: any | WMSLayer = new WMSLayer({
                id: this.lstLayersCategoryAll[j].maps[i].id,
                url: this.lstLayersCategoryAll[j].maps[i].url,
                visible: true,
                title: this.lstLayersCategoryAll[j].maps[i].name,
                spatialReference: SpatialReference.WebMercator,
                description: this.lstLayersCategoryAll[j].maps[i].application,

                fetchFeatureInfoFunction: async (query) => {
                  query.info_format = wmsLayer.description;
                  return await this.loadFeatureFromLayer(wmsLayer.url, query, wmsLayer.title);
                }
              });
              if (this.lstLayersCategoryAll[j].maps[i].name == "Walkability") {
                wmsLayer.customLayerParameters = { "env": "quantile0:-3.646297;quantile25:-1.143302;quantile50:-0.176142;quantile75:1.169232;quantile100:28.848127" };
              }

              if (this.lstLayersCategoryAll[j].maps[i].sublayers.length > 0) {
                wmsLayer.sublayers = [];
                this.lstLayersCategoryAll[j].maps[i].sublayers.forEach((elemSubLayer: any) => {
                  const indexSubLayer = this.lstLegends.findIndex(elemLegend => {
                    return elemLegend.mapid === this.lstLayersCategoryAll[j].maps[i].id && elemLegend.sublayer === elemSubLayer;
                  });

                  const syblayer: any = ({
                    name: elemSubLayer,
                    title: this.lstLayersCategoryAll[j].maps[i].name,
                    popupEnabled: true,
                    queryable: true,
                    visible: true,
                    legendEnabled: true,
                    customLayerParameters: "",
                    legendUrl: this.lstLegends[indexSubLayer] === undefined ? '' : this.lstLegends[indexSubLayer].legend_url

                  });
                  wmsLayer.sublayers.push(syblayer);
                });
              }

              wmsLayer.on("layerview-create-error", (event) => {
                this.alertService.error(event['error']['message']);
              });
              await wmsLayer.load();
              this.arrCapabilities.push(wmsLayer);
              this.map.add(wmsLayer);
            }
          }
        }
        else {
          while (this.map.allLayers.find((layer: any) => {
            return layer.url === this.lstLayersCategoryAll[j].maps[i].url && layer.title.toLowerCase() === this.lstLayersCategoryAll[j].maps[i].name.toLowerCase();
          }) !== undefined) {
            const foundLayer = this.map.allLayers.find((layer: any) => {
              return layer.url === this.lstLayersCategoryAll[j].maps[i].url && layer.title.toLowerCase() === this.lstLayersCategoryAll[j].maps[i].name.toLowerCase();
            });
            this.map.remove(foundLayer);
          }

          while (this.map.layers.find((layer: any) => {
            return layer.url === this.lstLayersCategoryAll[j].maps[i].url && layer.title.toLowerCase() === this.lstLayersCategoryAll[j].maps[i].name.toLowerCase();
          }) !== undefined) {
            const foundLayer = this.map.allLayers.find((layer: any) => {
              return layer.url === this.lstLayersCategoryAll[j].maps[i].url && layer.title.toLowerCase() === this.lstLayersCategoryAll[j].maps[i].name.toLowerCase();
            });
            this.map.remove(foundLayer);
          }
        }
      }
    }
      if (this.bMapInitialized === false) {
        this.InitEsriMap();
        await this._view.when((view) => {
          this._view.popup.set("dockOptions", {
            visible:false,
            breakpoint: false,
            buttonEnabled: false,
            position: "top-left",
            container: document.getElementById("features-widget"),
          });
          this._view.popup.visible=false;
          this._view.popup.dockEnabled=false;

          const basemap = new Basemap({
            portalItem: {
              id: "fae788aa91e54244b161b59725dcbb2a"  // WGS84 Streets Vector webmap
            }
          });
          const basemapToggle = new BasemapToggle({
            visibleElements: {
              title: false
            },
            view: this._view,
            nextBasemap: basemap
          });
          this.basemap_satelite.loadAll();
          view.map.allLayers.forEach(layer => {
            if (layer.title == "Hybrid Reference Layer (Local Language)" || layer.title == "World Imagery") {
              layer.popupEnabled = false;
              layer.allSublayers?.forEach(sublayer => {
                sublayer.popupEnabled = false;
              });
            }
          });
          basemapToggle.watch('activeBasemap', function (newBasemap) {
            view.map.allLayers.forEach(layer => {
              if (layer.title == "Hybrid Reference Layer (Local Language)" || layer.title == "World Imagery") {
                layer.popupEnabled = false;
                if (newBasemap.loaded)
                  layer.allSublayers?.forEach(sublayer => {
                    sublayer.popupEnabled = false;
                  });
              }

            });
          });
          // Add widget to the top right corner of the view
          this._view.ui.add(basemapToggle, "bottom-left");
          const n = document.getElementsByClassName('esri-search');
          if (n && n.length === 1) {
            n[0].classList.add('esri-searchAdress');
          }
        });
        if (this._polygon !== '') {
          this.addPolygonToView(this._polygon, false, SpatialReference.WebMercator);
        }
        this.map.add(mouseOverLayer);
        this.map.add(graphicsLayer);
        this.map.add(onpointsLayer);
        this.map.add(onHistorypointsLayer);
        this.addLegend();

      } else {
        this.addLegend();
      }


      this.search.on('search-complete', function (event: any) {
        const geometry: any = event.results[0].results[0].feature.geometry;
        const oPoint: Point = new Point();
        oPoint.x = geometry.latitude;
        oPoint.y = geometry.longitude;
        this.ngZone.run(() => this.searchFromPoint(oPoint));
      }.bind(this));

      //Map recenter
      this.mapService.regionIdListener().subscribe(
        reg => {
          if (this._arrParcells.length == 0 && reg == "1") {
            this._view.set('center', [4.4024643, 51.2194475]);
          } else if (this._arrParcells.length == 0 && reg == "2") {
            this._view.set('center', [4.616812, 50.155423]);
          } else if (this._arrParcells.length == 0) {
            this._view.set('center', [4.353391, 50.847510]);
          }
        }
      )
      const abortController = new AbortController();
      watchUtils.whenOnce(() => this._view?.animation, abortController.signal)
        .then((animation) => {
          console.log(`View animation state is ${animation.state}`)
        });


      // Cancel the async callback
      const someFunction = () => {
        abortController.abort();
      }
      return this._view;
    } catch (error) {      
      console.log('EsriLoader: ', error);
      return this._view;
    }
  }

  async InitEsriMap(){
    const mapViewProperties: esri.MapViewProperties = {
      container: this.mapViewEl.nativeElement,
      center: this._center,
      zoom: this._zoom,
      map: this.map,
      spatialReference: SpatialReference.WebMercator,
      ui: {
        components: []  
      },
      popup: new Popup({
        dockEnabled: false,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false,          
        },
        visibleElements: {
          closeButton: true
        },       
      })
    };
      /*{
        defaultPopupTemplateEnabled: true, // popup will be enabled on the wfslayer
        dockEnabled: true,
      },*/
    
    this._view = new MapView(mapViewProperties);
    // Wait for view to be ready
    await this._view.when();

    this._view.popup.defaultPopupTemplateEnabled = false;
    this._view.popup.visible = false;
    

    const featuresWidget = new Features({
      container: "features-widget",
      view: this._view
    });         
    const shellPanel = document.getElementById("shell-panel-start");

    //eXPERIMENT
    watchUtils.watch(
      () => featuresWidget.viewModel.featureCount,      
      (model) => {
        setTimeout(() => { 
          document.removeAllListeners("click");   
          if(model>0){
            const btn = document.getElementById("select-feature");
            if (btn) {
              btn.addEventListener("click", () => {
                const featureNR = btn.getAttribute("data-projectnumber");                
                if (featureNR) {                 
                  console.log("Selected project number:", featureNR);
                  this.displayModal(featureNR);
                }
              });           
            }
          }      

        }, 100); // wait a bit for DOM
      }
    );

    
    let clickHandlerAttached = false;
    watchUtils.watch(() => featuresWidget.visible, (visible) => {
      if (!visible) {
        shellPanel.setAttribute("collapsed", "true");
      } else {
        // Wait for DOM render, then attach listener once

      }
    });


    watchUtils.on(
      () => this._view,
      "click",
      (event) => {
        featuresWidget.open({
          location: event.mapPoint,
          fetchFeatures: true
        });
        this._view.popupEnabled=false;
        this._view.popup.autoCloseEnabled=true;
        this._view.map.layers.map((lyr:any)=>{
          let fieldsInfo = [];
          if (lyr.type === "feature") {
            let content = "";
            lyr.fields.forEach((field) => {
              let alias = field.alias;
              let name = field.name;

              let fieldInfo = {
                fieldName: field.name,
                label: field.alias
              };
              fieldsInfo.push(fieldInfo);
            });

            var popupTemplate = {
              // autocasts as new PopupTemplate()
              title: lyr.title,
              content: [
                {
                  type: "fields",
                  fieldInfos: fieldsInfo
                }
              ]
            };
            lyr.popupTemplate = popupTemplate;
            shellPanel.setAttribute("collapsed","false");
          }
        });
      }
    );
    //END EXPERIMENT  
    this.feature = new Feature({
      graphic: this.graphic,
      map: this._view.map,
      spatialReference: SpatialReference.WebMercator
    });  

    this.addSketchTool();
    this.addMeasurementTool();
    this.addSearchTool();  
    this.addFeatureTool();
    this.setZoomPosition();
    this.addDefaultLayers();
  
    //this.addToView(this.fLayer3);
    //this.addToView(this.fLayer);
  
    this.bMapInitialized = true;
  }


 private  addDefaultLayers() {
    let lstLayers:Array<WMSLayer>=[this.KBOVlaanderen,this.EnvironmentLayer];
    lstLayers.forEach((layer: WMSLayer,index) => {
      if (this.map.allLayers.findIndex((tmpLayer: any) => { return tmpLayer.id == layer.id }) < 0) {
        layer.allSublayers.forEach(SubLayer=>{
          SubLayer.popupEnabled=true;
          SubLayer.queryable=true;
          SubLayer.visible=true;
        });
        this.addToView(layer);
      }
    })
  
  }



  public addToView(layer,index=undefined) {
    if(index!=undefined){
      this._view.map.add(layer,index);
    }else{
      this._view.map.add(layer);
    }    
  }

  private  refreshConformitheitsAttest(){
    projection.load().then(async function() {
      const pointBboxMin = new ErsriPoint.default({
        hasZ: true,
        hasM: true,
        x:this._view.extent.xmin,
        y:this._view.extent.ymin,          
        spatialReference: {wkid: 102100} 
      });
      const pointBboxMax =new  ErsriPoint.default({
        hasZ: true,
        hasM: true,
        x:this._view.extent.xmax,
        y:this._view.extent.ymax,          
        spatialReference: {wkid: 102100} 
      });

      let convertLambertsMin :any =  projection.project(pointBboxMin, {wkid: 4326} );
      let convertLambertsMax :any =  projection.project(pointBboxMax, {wkid: 4326} );         

      const indexconf = this._view.map.allLayers.findIndex((layer: any) => {
        return layer.id === this.wfsConformAttest.id;
      });
      if (indexconf >= 0) {
        setTimeout(async ()=> {       
        this.wfsConformAttest.customParameters={
          // "cql_filter": "POI:PRODUCT='Conformiteitsattest'",
          "TYPENAMES": "POI:POI",           
          "count":"1000",
          "SRSNAME":   "EPSG:102100",
          "VERSION":   "2.2.2",
          "OUTPUTFORMAT": "application/json",
          "filter":`<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:And><PropertyIsEqualTo><PropertyName>POI:PRODUCT</PropertyName><Literal>Conformiteitsattest</Literal></PropertyIsEqualTo><ogc:BBOX><ogc:PropertyName>POI:SHAPE</ogc:PropertyName><gml:Envelope xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326"><gml:lowerCorner>${convertLambertsMin.x+" "+convertLambertsMin.y}</gml:lowerCorner><gml:upperCorner>${convertLambertsMax.x+" "+convertLambertsMax.y}</gml:upperCorner></gml:Envelope></ogc:BBOX></ogc:And></ogc:Filter>`      
          }
         await this.wfsConformAttest.refresh ();                  
        }, 200);
      }           

  }.bind(this))
  }

  setActiveWidget(type) {

    switch (type) {
      case "distance":
        this.areaMeasurement2D.visible = false;
        this.distanceMeasurement2D.visible = true;
        measurement.activeTool = 'distance';
        //this.distanceMeasurement2D.viewModel.start();
        this.setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        this.distanceMeasurement2D.visible = false;
        this.areaMeasurement2D.visible = true;
        measurement.activeTool = 'area';
        // this.areaMeasurement2D.viewModel.start();
        this.setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        this.areaMeasurement2D.visible = false;
        this.distanceMeasurement2D.visible = false;
        measurement.clear();
        break;
    }
  }

  setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    this._view.focus();
    let elements = document.getElementsByClassName("active");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  addMeasurementTool(){
    /*
    this._view.ui.add(measurement, 'bottom-left');
    measurement.view = this._view;
    measurement.watch('viewModel.state', function(state){
      if (state === 'measured'){
       // console.log('area is :' + measurement.viewModel.activeViewModel.measurement.area);
       // console.log('perimeter is :' + measurement.viewModel.activeViewModel.measurement.perimeter);
      }
      console.log('Current state: ', state);
    });
    */
    this._view.ui.add("topbar", "bottom-left");
            // event listener for distance measurements
           let selectedButtonDistance=document.getElementById("distanceButton");
           
            document.getElementById("distanceButton").addEventListener("click", function() {
              this.setActiveWidget(null);
              if (!selectedButtonDistance.classList.contains("active")) {
                this.setActiveWidget("distance");
                this.bMeasurement=true;
              } else {
                this.setActiveButton(null);
                this.bMeasurement=false;
              }
            }.bind(this));
    
            
            // event listener for area measurements
            let selectedButtonArea=document.getElementById("areaButton");
            document.getElementById("areaButton").addEventListener("click", function() {
              this.setActiveWidget(null);
              if (!selectedButtonArea.classList.contains("active")) {
                this.setActiveWidget("area");
                this.bMeasurement=true;
              } else {
                this.setActiveButton(null);
                this.bMeasurement=false;
              }
            }.bind(this));

            document.getElementById("clear").addEventListener("click", function() {
              this.setActiveWidget(null);
              this.setActiveButton(null);
              this.bMeasurement=false;   
            }.bind(this));

    /*const measurement = new Measurement({
      view: this._view,      
      linearUnit:"meters"
    });*/
    this._view.ui.add(measurement, "bottom-left");
    measurement.view = this._view;


  }

  convertPolygonToCircle(polygon) {
    const center = polygon.centroid;
    const firstRing = polygon.rings[0];
    const firstPoint = new Point({
      x: firstRing[0][0],
      y: firstRing[0][1],
      spatialReference: polygon.spatialReference
    });
    
    // Calculate radius as the distance from center to first ring point
    const radius = geometryEngine.distance(center, firstPoint, "meters"); // adjust unit as needed

    // Create a new Circle
    const circle = new Circle({
      center: center,
      radius: radius,
      radiusUnit: "meters", // match the unit used in distance calculation
      numberOfPoints: 100,
      spatialReference: polygon.spatialReference
    });

    return circle;
  }

  addSketchTool(){

    this.sketch = new Sketch({
      id:"selectToolbar",
      availableCreateTools:["point", "polyline", "polygon", "rectangle", "circle"],
      visibleElements:{
        createTools: {
          point: false,
          circle: true,
          polygon:false,
          polyline:false
        },
        selectionTools:{
          "lasso-selection": false,
          "rectangle-selection" :false,
        },
        settingsMenu: false,
        undoRedoMenu:false
      },
      layer: graphicsLayer,
      view: this._view,
      // graphic will be selected as soon as it is created
      creationMode: 'single',
      snappingOptions: {
        // autocasts as SnappingOptions()
        enabled: true, // snapping will be on by default
        // feature snapping will be enabled on the GraphicsLayer
        // featureSources: [{ layer: graphicsLayer }]
      },
      //container:this.sketchview.nativeElement
    });
  

    this._view.ui.add(this.sketch, 'bottom-right');

    //

    // Listen to sketch widget's create event.
    this.sketch.on('create', function(event) {
      //this.bSketch = true;      
      // check if the create event's state has changed to complete indicating
      // the graphic create operation is completed.
       if (event.state === 'complete') {
        //graphicsLayer.remove(event.graphic);     
        switch (event.tool) {
          case 'point':{
            const oPoint: Point = new Point();
            oPoint.x = event.graphic.geometry.x;
            oPoint.y = event.graphic.geometry.y;
            this.searchFromPoint(oPoint);
            break;
          }
          case 'circle': {
            const ev: any = event.graphic.geometry;
            event.graphic.symbol = new SimpleFillSymbol({
              style: "solid",
              color: [230, 0, 0, 0.25],
              outline: {
                color: [0, 0, 0, 0.5],
                width: 2
              }
            });
            console.log(' Graphics getekend: ' + ev.type);
              //const circle = ev as Circle;
              const circle = this.convertPolygonToCircle(ev);
              const radius = Math.round(circle.radius);
              const center = circle.center;
              this.selectedRadius$.next(circle);
              this.selectedPoint$.next(center);
              this.mapService.getCadgisMunicipalityByGeometry(center).then((data: any) => {            
                if (data && data.AdMuKey) {
                  this.formHistory.get('screening_city').setValue(data.NameDUT.toString().trim());
                } else {
                  this.form.get('screening_city').setValue('');
                }
              });
              
              if (center && radius) {
                this.f['radius'].setValue(radius)
                const labelPoint = new Point({
                  x: center.x,
                  y: center.y + (radius / 2),
                  spatialReference: ev.spatialReference
                });                           
                
                const textSymbol = new TextSymbol({
                  color: "red",
                  haloColor: "white", 
                  haloSize: 1,
                  text: `${radius}m`,
                  font: { size: 12, weight: "bold" }
                });
                const labelGraphic = new Graphic({
                  geometry: labelPoint,
                  symbol: textSymbol
                });
                graphicsLayer.add(labelGraphic);                
              }

            break
          };  
        } 
        


        //this.bSketch = false;
      }else{
        switch (event.tool) {
        case 'point':{
          const oPoint: Point = new Point();
          oPoint.x = event.graphic.geometry.x;
          oPoint.y = event.graphic.geometry.y;
          this.searchFromPoint(oPoint);
          break;
        }
        case 'circle': {
          //this.sketch.create("circle", { preserveAspectRatio: false });
 
          //const oCircle: Circle = new Circle();
          break
        }
      }


      }
    }.bind(this));
  }

  addSearchTool(){
      // search on adress
       const source = [
            {
              url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?',
              singleLineFieldName: 'SingleLine',
              locationEnabled: true,
              sourceCountry: 'BEL',
              outFields: ['*'],
              countryCode: 'BEL',
              name: 'ArcGIS World Geocoding Service',
              placeholder: this.translate.instant('Enter a Capakey or an Adress'),
            }
          ];
          // Add Search widget
          this.search = new Search({
            view: this._view,
            sources: source,          
            includeDefaultSources: false,
            maxSuggestions:20, 
            container:"searchDiv"            
          });
         // this._view.ui.add(this.search, 'top-left'); // Add to the map
          this._view.ui.add("capakeysearch", 'top-left'); // Add to the map
          this._view.ui.add("radius-slider", 'top-left'); // Add to the map
          this._view.ui.add("calcite_menu", 'top-left'); // Add to the map
        //this._view.ui.add("shell-panel-start", 'top-left'); // Add to the map
          
  }

  setZoomPosition(){
    const zoom = new Zoom({
      view: this._view
    });

    this._view.ui.add(zoom, "bottom-right"); // or any other position
   // this._view.ui.move("zoom", "bottom-right");
  }
  private async  addParcelLimits(){
    await  this.PerceelPlanLayer.load();
    this.PerceelPlanLayer.allSublayers.forEach(SubLayer=>{
      SubLayer.popupEnabled=true;
      SubLayer.queryable=true;
      SubLayer.visible=true;     
    })
    //const building =  this.WMSCadastral_Layers.allSublayers.find((sl) => sl.name === 'Cadastral building');
    this.arrCapabilities.push(this.PerceelPlanLayer)
    this.addToView(this.PerceelPlanLayer,0);
  }

  async  addFeatureTool() {
    await this.addParcelLimits();
    this.sketch.on('delete', function(event) {
      this.bSketch = false;
    });

    /*this.sketch.on('create', function(event) {
     if (event.state === 'complete') {
      //getFeature(event.graphic.geometry);
      this.bSketch = false;
     }
    }.bind(this));*/

    const getFeature = function selectFeatures(geometry) {
      if (this.fLayer) {
        // create a query and set its geometry parameter to the
        // rectangle that was drawn on the view
        const query = {
          geometry,
          outFields: ['*'],
          returnGeometry: true,
        };
        // query graphics from the csv layer view. Geometry set for the query
        // can be polygon for point features and only intersecting geometries are returned
        this.fLayer.queryFeatures(query)
          .then((results: any) => {
            if (results.features.length === 0) {
             // clearSelection();
            } else {
              for (let i = 0; i < results.features.length; i++){
                const oCenter: any = JSON.parse('{"x": ' + results.features[i].geometry.centroid.x + ',"y": ' + results.features[i].geometry.centroid.y + ' }');
                const oParcel: Parcel = new Parcel();
                oParcel.capakey = results.features[i].attributes.CaPaKey;
                oParcel.rings = results.features[i].geometry.rings;
                oParcel.center = oCenter;
                oParcel.perimeter = results.features[i].attributes['Shape.STLength()'];
                oParcel.surface = results.features[i].attributes['Shape.STArea()'];

                const nIndex = this._arrParcells.findIndex(elem => elem.capakey === oParcel.capakey);
                if (nIndex >= 0) {                  
                }else{
                  this._arrParcells.push(oParcel);
                  this._arrParcells = Object.assign([], this._arrParcells);
                  this.addPolygonToView(results.features[i].geometry.rings, false, SpatialReference.WebMercator );
                }
              }
            }
          })
          .catch(errorCallback);
      }
    }.bind(this);

    function errorCallback(error) {
      console.log('error happened:', error.message);
    }



    this._view.whenLayerView(this.fLayer).then(async function(layerView) {
      let highlight;
      let objectId;
      const debouncedUpdate = promiseUtils.debounce(function(event) {
        // Perform a hitTest on the View
        return   this._view.hitTest(event).then(function(event) {
          // Make sure graphic has a popupTemplate
          const results = event.results.filter(function(result) {
            if ( result.graphic !== undefined && result.graphic.layer !== undefined &&  result.graphic.layer.popupTemplate !== undefined && result.graphic.layer.popupTemplate != null )
              {
                return result.graphic.layer.popupTemplate;
              }
              // return  new PopupTemplate();
          });
          if (results.length > 0 && results[0].graphic !== undefined){
            const result = results[0];
            if (result.graphic.attributes !== undefined){
              const newObjectId =
                result && result.graphic.attributes[this.fLayer.objectIdField];
              if (!newObjectId) {
                  highlight && highlight.remove();
                  objectId = this.feature.graphic = null;
                } else if (objectId !== newObjectId) {
                  highlight && highlight.remove();
                  objectId = newObjectId;

                  if (result) {
                    this.feature.graphic = result.graphic.clone(); // <- clone it to avoid mutation
                    // this.feature.graphic.popupTemplate = template2; // <- template2 for feature widget
                    highlight = layerView.highlight(result.graphic);
                  } else {
                    this.feature.graphic = highlight;
                  }                  
                }
            }
          }
        }.bind(this));

      }.bind(this));
    }.bind(this))
    .catch(error => {
      console.log('Layer CADGIS has not been initialized');
      console.log(error);
    });
  }

  async loadFeatureFromLayer(url,query,name:string){
    const div = document.createElement('div');
    //query.info_format = "application/json";
        if(query.info_format=="application/json"){
          const { data } = await esriRequest(url + "?", {
            responseType: "json",
            query: {
              SERVICE: "WMS",
              LAYERS: query.layers,
              QUERY_LAYERS: query.layers,
              REQUEST: "GetFeatureInfo",
              INFO_FORMAT: "application/json",
              FEATURE_COUNT: 5,
              BBOX: query.bbox,
              CRS: query.crs,
              Version: "1.3.0",
              WIDTH: this._view.width,
              HEIGHT: this._view.height,
              I: query.I,
              J: query.J
            }
          });        
          return data.features.map(
            (feature) => new Graphic({
              attributes: feature.properties,
              
              // Define a popup template to format field names and values in a table.
              popupTemplate: {                
                title: name,
                content: [{
                  container:document.getElementById("features-widget"),
                  type: "fields",
                  fieldInfos: Object.entries(feature.properties).map(([key, val]) =>{return { fieldName: key, label: key }})
                }]
              }
            })
          );   
        }else if(query.info_format=="text/xml"){
          const { data } = await esriRequest(url + "?", {
            responseType: "text",
            query: {
              SERVICE: "WMS",
              LAYERS: query.layers,
              QUERY_LAYERS: query.layers,
              REQUEST: "GetFeatureInfo",
              INFO_FORMAT: "text/xml",
              FEATURE_COUNT: 5,
              BBOX: query.bbox,
              CRS: query.crs,
              Version: "1.3.0",
              WIDTH: query.width,
              HEIGHT: query.height,
              I: query.I,
              J: query.J
            }
          });
  
          let datafeature:any;
          let LayerName:any;          
          const xmlparser = new Parser(
            {  
                trim: true,  
                //explicitArray: true,
                tagNameProcessors: [processors.stripPrefix]
            });
          const xmlString = new XMLSerializer().serializeToString(data);
          xmlparser.parseString(xmlString, (err, result) => {
            if (err) console.log(err);
            const templateParcelPlan = `  
                  <p style=\'margin-left:10px; margin-top:5px\'><b>${result?.FeatureInfoCollection?.$?.layername ?? ""}</b></p>             
                  <table width="100%" cellpadding="0" cellspacing="0" border="1" id=featureinfoResponse>                              
                  </table>                   
                `;
  
            const parser = new DOMParser();
            var documentTemplate = parser.parseFromString(templateParcelPlan, "text/html");
            var table: HTMLTableElement = <HTMLTableElement> documentTemplate.getElementById("featureinfoResponse");    
  
            var thead = table.createTHead();          
            var tbody = table.createTBody();
            var row = thead.insertRow(0);
            var cell = row.insertCell(0);
            cell.style.backgroundColor = "#c1c1c1";
            cell.innerHTML = "Name";
            cell = row.insertCell(1);
            cell.style.backgroundColor = "#c1c1c1";
            cell.innerHTML = "Value";
            
            //console.log(JSON.stringify(result));
  
            if( result?.FeatureCollection!=undefined){
              let featurestemp = result?.FeatureCollection?.featureMember    
              .map(feature=>{return  Object.entries(feature).map(([key, val])=>{return feature[key]})})
              .map(([key1,val])=>{return Object.entries(key1).map(([key2, val])=>{return val})})
              .map(elem=>{return Object.entries(elem).map(([key,val])=>{return elem[key] }).map((it)=>{return it})  });            
  
              let features= featurestemp.map(item=>{return {properties: Object.entries(item[0]).map(([key1,val])=>{return ({[key1]:val[0]})}) }})
  
              let featuresFinal= features.map(item=>{return {properties: convertArrayToObject(item.properties)}}) 
              datafeature=featuresFinal; 
  
            }else if(result?.FeatureInfoResponse!=undefined ){
              let featurestemp = result?.FeatureInfoResponse?.FIELDS    
              .map(feature=>{return  Object.entries(feature).map(([key, val])=>{return feature[key]})});        
              
              let features= featurestemp.map(item=>{return {properties: Object.entries(item[0]).map(([key1,val])=>{return ({[key1]:val})}) }})
              let featuresFinal= features.map(item=>{return {properties: convertArrayToObject(item.properties)}});
              datafeature=featuresFinal;
            }
  
          }); 
  
          datafeature.forEach(feature => {
            Object.entries(feature.properties).map(([key, val]) =>{
              if (key=="geometrie" || key=="$"){
                delete feature.properties[key];
              }
            })
          });    
  
          return datafeature.map(
              (feature,index) => new Graphic({
                attributes: feature.properties,
                // Define a popup template to format field names and values in a table.
                popupTemplate: {
                  
                  title:LayerName??name,      
                  content: [{
                    container:document.getElementById("capakeyinfo"),
                    type: "fields",
                    fieldInfos: Object.entries(feature.properties).map(([key, val]) =>{return { fieldName: key, label: key }})
                  
                  }]
                }
              })
            ); 
         
  
        }else{
          const { data } = await esriRequest(url + "?", {
            responseType: "xml",
            query: {
              SERVICE: "WMS",
              LAYERS: query.layers,
              QUERY_LAYERS: query.layers,
              REQUEST: "GetFeatureInfo",
              INFO_FORMAT: "application/vnd.esri.wms_featureinfo_xml",
              FEATURE_COUNT: 5,
              BBOX: query.bbox,
              CRS: query.crs,
              Version: "1.3.0",
              WIDTH: query.width,
              HEIGHT: query.height,
              I: query.I,
              J: query.J
            }
          });

          let datafeature: any;
          let LayerName: any;
          const xmlparser = new Parser(
            {
              trim: true,
            });

          const xmlString = new XMLSerializer().serializeToString(data);
          let arrGraphics:Array<Graphic>=[];
          xmlparser.parseString(xmlString, (err, result) => {
            if (err) console.log(err);
            result?.FeatureInfoResponse?.FeatureInfoCollection.forEach(collection => {
              const templateParcelPlan = `  
                      <p style=\'margin-left:10px; margin-top:5px\'><b>${collection?.$?.layername ?? ""}</b></p>             
                      <table width="100%" cellpadding="0" cellspacing="0" border="1" id=featureinfoResponse>                              
                      </table>
                    `;

              const parser = new DOMParser();
              var documentTemplate = parser.parseFromString(templateParcelPlan, "text/html");
              var table: HTMLTableElement = <HTMLTableElement> documentTemplate.getElementById("featureinfoResponse");
              var thead = table.createTHead();
              var tbody = table.createTBody();
              var row = thead.insertRow(0);
              var cell = row.insertCell(0);
              cell.style.backgroundColor = "#c1c1c1";
              cell.innerHTML = "Name";
              cell = row.insertCell(1);
              cell.style.backgroundColor = "#c1c1c1";
              cell.innerHTML = "Value";

              let featurestemp = collection?.FeatureInfo.map(fieldsObject => fieldsObject.Field.map(value => { return { FieldName: this.translate.instant(value.FieldName[0]), FieldValue: value.FieldValue[0] } }).map(item => ({ [item.FieldName]: item.FieldValue })))
              let features = featurestemp.map(item => { return { properties: convertArrayToObject(item) } });
              datafeature = features;

              let capaLayerFound = this.arrCapabilities.find(elem => { return elem.title == name });
              if (capaLayerFound) {
                let oLayer = capaLayerFound.allSublayers.find((layer) => { return layer.name.toLowerCase() == collection?.$?.layername.toLowerCase() || layer.title.toLowerCase() == collection?.$?.layername.toLowerCase() });
                if (oLayer) {
                  LayerName = oLayer.title;
                }
              }

            let propertiesExclude: string[] = ["Shape", "SuVaCnType", "LastUpdDTS", "GlobalID", "EditVersion", "OBJECTID", "Editor", "VersionId", "AdReKey", "BLSLocalId", "VersionNu", "EventEnd", "ELSLocalId", "ELSversion", "Status"];
            datafeature.map((feature) => {
              Object.entries(feature.properties).map(([key, val]) => { return { fieldName: key, label: key } }).forEach(element => {
                if (propertiesExclude.includes(element.fieldName)) {
                  delete feature.properties[element.fieldName];
                } else if (element.fieldName == "Omtrek") {
                  feature.properties[element.fieldName] = Number(feature.properties[element.label].split(',').join('.')).toFixed(2) + " meters"
                } else if (element.fieldName == "Oppervlakte Perceel/Gebouw") {
                  feature.properties[element.fieldName] = Number(feature.properties[element.label].split(',').join('.')).toFixed(2) + " &#13217;"
                }
              });
            })

            let GraphicFeature:any=datafeature.map(
              (feature) => new Graphic({
                attributes: feature.properties,
                // Define a popup template to format field names and values in a table.
                popupTemplate: {
                  title: LayerName ?? name,
                  content: [{
                    container: document.getElementById("capakeyinfo"),
                    type: "fields",
                    fieldInfos: Object.entries(feature.properties).map(([key, val]) => { return { fieldName: key, label: key } })
                  }]
                }
              }))
              arrGraphics.push(GraphicFeature[0]);
            });                 
          })
          return arrGraphics;        
        }     
      }


      private createPopupTemplatePOI(){
        const  templatePOI = `
       <div style="margin:5px !important">
          <ul>
               <li> <b>Naam:</b> {NAAM}</li>
               <li> <b>Onschrijwing:</b> {OMSCHR}</li>
               <li> <b>Notitie:</b> {NOTITIE}</li>
               <li> <b>Type:</b> {POITYPE}</li>
               <li> <b>Link1:</b><a href="{LINK1}">{LINKOMSCH1}</a> </li>
               <li> <b>Link2:</b><a href="{LINK2}">{LINKOMSCH2}</a> </li>
               <li> <b>Link3:</b><a href="{LINK3}">{LINKOMSCH3}</a> </li>
               
           </ul>
       </div>`;
    
        const popupTemplate = new PopupTemplate({
         title: '<p style=\'margin-left:10px; margin-top:5px\'>POI</p>',
         outFields: ['*'],
         content: templatePOI ,
       });    
        return popupTemplate;
     }

     addLegend(){
      // Legend on view  
          this._view.ui.remove("legend");
         //Alternative Layers     
         const layerList = new LayerList({
            view: this._view,
            listItemCreatedFunction: (event) => {
              const item = event.item;
              if (item.layer.type !== 'group' && item.title !== undefined) {
                // don't show legend twice    
                item.panel = {
                  content: 'legend',
                  open: false,
                };                 
              }    
              item.actionsSections = [             
                [
                  {
                    title: "Verhogen Transparantie",
                    className: "esri-icon-up",
                    id: "increase-opacity"
                  },
                  {
                    title: "Verlagen Transparantie",
                    className: "esri-icon-down",
                    id: "decrease-opacity"
                  }
                ]
              ];                  
            }
          }); 
    
          layerList.on("trigger-action", (event) => {
            // The layer visible in the view at the time of the trigger.
            const visibleLayer = event.item.layer;
          
            // Capture the action id.
            const id = event.action.id;
          
            if (id === "full-extent") {
              // If the full-extent action is triggered then navigate
              // to the full extent of the visible layer.
              this._view.goTo(visibleLayer.fullExtent);
            } else if (id === "increase-opacity") {
              // If the increase-opacity action is triggered, then
              // increase the opacity of the GroupLayer by 0.25.
              if (visibleLayer.opacity <1) {
                visibleLayer.opacity += 0.25;
              }
    
              
            } else if (id === "decrease-opacity") {
              // If the decrease-opacity action is triggered, then
              // decrease the opacity of the GroupLayer by 0.25.
              if (visibleLayer.opacity > 0) {
                visibleLayer.opacity -= 0.25;
              }
           
            }
          });
        
        const legendContent = new Legend({
          view: this._view,
          container: document.createElement("div"),
          basemapLegendVisible:false,
        })
    
        const legendWidged = new Expand({
          id: 'legend',
          //container: this.legendView.nativeElement.innerHTML,  
          view: this._view,
          content: layerList,
         // expandIcon: 'esri-icon-legend',
          expandTooltip: 'Legend'
        });
    
        legendContent.watch("activeBasemap", () => {
          const mobileSize =
            this._view.heightBreakpoint === "xsmall" ||
            this._view.widthBreakpoint === "xsmall";
    
          if (mobileSize) {
            legendWidged.collapse();
          }
        });
    
        this._view.ui.add(legendWidged, 'top-right');
        this.legendEnabled = true;     
     }

     private  refreshOnbewoonbaareWoning(){
      projection.load().then(function() {
        const pointBboxMin = new ErsriPoint.default({
          hasZ: true,
          hasM: true,
          x:this._view.extent.xmin,
          y:this._view.extent.ymin,          
          spatialReference: {wkid: 102100} 
        });
        const pointBboxMax =new  ErsriPoint.default({
          hasZ: true,
          hasM: true,
          x:this._view.extent.xmax,
          y:this._view.extent.ymax,          
          spatialReference: {wkid: 102100} 
        });

        let convertBBoxMin :any =  projection.project(pointBboxMin, {wkid: 4326} );
        let convertBBoxMax :any =  projection.project(pointBboxMax, {wkid: 4326} );         

        const indexconf = this._view.map.allLayers.findIndex((layer: any) => {
          return layer.id === this.wfsOnbewoonnbaareWoning.id;
        });
        if (indexconf >= 0) {
          setTimeout(() => {       
          this.wfsOnbewoonbaareWoning.customParameters={
            // "cql_filter": "POI:PRODUCT='Conformiteitsattest'",
            "TYPENAMES": "POI:POI", 
            //"SRSNAME":   "EPSG:4326",
            "VERSION":   "2.2.2",
            "OUTPUTFORMAT": "application/json",
            "filter":`<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:And><PropertyIsEqualTo><PropertyName>POI:PRODUCT</PropertyName><Literal>VlaamseInventarisOngeschikteOnbewoonbareWoningen</Literal></PropertyIsEqualTo><ogc:BBOX><ogc:PropertyName>POI:SHAPE</ogc:PropertyName><gml:Envelope xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326"><gml:lowerCorner>${convertBBoxMin.x+" "+convertBBoxMin.y}</gml:lowerCorner><gml:upperCorner>${convertBBoxMax.x+" "+convertBBoxMax.y}</gml:upperCorner></gml:Envelope></ogc:BBOX></ogc:And></ogc:Filter>`      
            }
          this.wfsOnbewoonbaareWoning.refresh ();                  
          }, 200);
        }           

    }.bind(this))
  }

  addPolygonToView(sPolygon, bremove= false, sSRS: SpatialReference= SpatialReference.WGS84):Graphic{
    if (sSRS == null || sSRS === undefined){
      sSRS = SpatialReference.WGS84;
    }

    const rings = Object.assign([], sPolygon);
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings,
      spatialReference: sSRS
    });
   
    const fillSymbol = {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [230,0,0,0.25],          
      outline: {
        // autocasts as new SimpleLineSymbol()
        //color: [255, 255, 255],
        width: 1
      }
    };

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    });

    const oFraph: any = this._view.graphics;
    let indexExist= oFraph.items.findIndex((graphic:any)=>{
      return JSON.stringify(graphic.geometry.rings) === JSON.stringify(polygonGraphic.geometry);
    });
    if(indexExist<0){
      this._view.graphics.add(polygonGraphic);
      
    }        
    //this.perceelemitter.emit( this.arrParcells);  
    return polygonGraphic;   
  }

  removePolygonFromView(sPolygon): boolean{
    const rings = Object.assign([], sPolygon);
    const oFraph: any = this._view.graphics;
    const index = oFraph.items.findIndex((gr: any) => {
      // gr.geometry.rings==rings
      return JSON.stringify(gr.geometry.rings) === JSON.stringify(rings);
    });
    if (index >= 0){
      const varGraphic = oFraph.items.find((gr: any) => {
        return JSON.stringify(gr.geometry.rings) === JSON.stringify(rings);
      });      
      this._view.graphics.remove(varGraphic);
      return true;
    }
    return false;
  }


  



 private  executeEnvironmentalCheck(polygon: any){
    let sPolygon = '';
    polygon[0].forEach(element => {
      if (sPolygon !== ''){
        sPolygon += ',';
      }
      sPolygon += element[0] + ' ' + element[1];
    });

   /*
    let reqBody: string=`
    {
      "dossierUuid":null,
      "locatieUuid":null,
      "locatieGeometrie":"POLYGON ((${sPolygon}))",
      "aanvraagType":"ARC",
      "doNotPersist":false
    }
    `*/

    const PostObject: any = new Object();
    PostObject.dossierUuid = null;
    PostObject.locatieUuid = null;
    PostObject.locatieGeometrie = `POLYGON ((${sPolygon}))`;
    PostObject.aanvraagType = 'ARC';
    PostObject.doNotPersist = false;

    //this.mapService.SendPostProxy('https://omgevingsloketpubliek.omgeving.vlaanderen.be/rest/omgevingscheck/', PostObject).subscribe(data => {
    this.mapService.SendPostProxy('https://omgevingsloket.omgeving.vlaanderen.be/rest/omgevingscheck', PostObject).subscribe(data => {
      this.displayEnvironmentalCheck(data);
    });
  }
  public async  prepareEnvironmentalCheckData(){
    this.onEnvironmentLoading$.next(true);
    const polygons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    const polygons$$: Observable<Array<any>> = polygons.asObservable();
    polygons.next([]);
     // var   polygons: any=[]
    if(this._arrParcells.length==0) this.onEnvironmentLoading$.next(false);

    this._arrParcells.forEach(async  element => {
        this.mapService.getParcelFromCapakey(element.capakey).subscribe((data: any) => {
          const  polygon = { type: 'polygon', rings: data.features[0].geometry.rings, spatialReference: {wkid: 31370} };
          const currentValue = polygons.value;
          const updatedValue = [...currentValue, polygon];
          if (updatedValue.length) {
            polygons.next(updatedValue);
          }
        });
      });

    polygons$$.subscribe(data => {
          if (data.length > 0) {
            let joinedPolygons: any;
            if ( this._arrParcells.length > 1 ||  data.length === this._arrParcells.length ){
               joinedPolygons = geometryEngine.union(polygons.value);
               //console.log('ik heb een polygon: ' + joinedPolygons.rings);
               this.executeEnvironmentalCheck(joinedPolygons.rings);
            }
            else
            {
              this.executeEnvironmentalCheck(joinedPolygons.rings);
            }
        }
      });
    this._view.ui.add("calcite_menu_environment","top-left")
}

  displayEnvironmentalCheck(environmentalData:any){
    this.omgevingsData=environmentalData;
    this.omgevingsData.themaDtos.forEach(element => {
      element.expanded= false;
      element.details= false;
      element.lagen.forEach(element2 => {
        element2.expanded= false;
        element2.details= false;
      });
      element.subThemas.forEach(element3 => {
        element3.expanded= false;
        element3.details= false;
      });
    });    
    this.items=this.omgevingsData.themaDtos;    
    this.onEnvironmentLoading$.next(false);
    this.changeDetect.detectChanges();
  }

 public onAddLayer(event){   
    if(this.lstLayersCategoryAll==undefined)this.lstLayersCategoryAll=[];
    let indexOmgevingsCheck=this.lstLayersCategoryAll.findIndex(category=>{return category.name=="Omgevingscheck"});
    if(indexOmgevingsCheck<0){
      let oLayerCategory:LayerCategory=<LayerCategory>{};
      oLayerCategory.name="Omgevingscheck";
      oLayerCategory.checked=false;
      oLayerCategory.id=Guid.newGuid().toString();
      oLayerCategory.guid="id_"+Guid.newGuid().toString();
      oLayerCategory.indeterminate=false;   
      event.checked=true;
      oLayerCategory.maps=[];
      oLayerCategory.maps.push(event);
      this.lstLayersCategoryAll.push(oLayerCategory);
    }else{
      const  nIdexLayer:number=  this.lstLayersCategoryAll[indexOmgevingsCheck].maps.findIndex(elem=>{
        return elem.id==event.id
      });
      if (nIdexLayer<0){
        event.checked=true;
        this.lstLayersCategoryAll[indexOmgevingsCheck].maps.push(event);
       }else{
        this.lstLayersCategoryAll[indexOmgevingsCheck].maps[nIdexLayer].checked=!event.display;        
       }
    }
    this.lstLayersCategory$.next(this.lstLayersCategoryAll);
    this.changeDetect.detectChanges();
    this.initializeMap();  
  }

  handleCancel(){
    this.isVisibleZoneRequest=false;
  
  }



  private GetComboValueById(nId,sComboName){
    let ocomboResult=new Combo()
    this.arrCombos[sComboName].forEach(elemCombo=>{
      if (elemCombo.id==nId){
        ocomboResult=elemCombo;
      }
    })
    return ocomboResult;
  }

 public async uitrekselUitvoeren(){
    //Cadgis Code
    //getVectorLayerForDisplayPrintZone
    const oSelectionCadgis: { [key: string]: Combo} = {};
    oSelectionCadgis["PAGEFORMAT"]=this.GetComboValueById(this.oCadGisPrint.pageFormat,"PAGEFORMAT");
    oSelectionCadgis["SCALE"]     =this.GetComboValueById(this.oCadGisPrint.scale,"SCALE");
    oSelectionCadgis["RESOLUTION"]=this.GetComboValueById(this.oCadGisPrint.resolution,"RESOLUTION");
    oSelectionCadgis["PAGE"]      =this.GetComboValueById(this.oCadGisPrint.pageorientation,"PAGE");
    const arrayFromX: Array<number>=[];
    const arrayFromY: Array<number>=[];
    let xMin: number;
    let xMax: number;
    let yMin: number;
    let yMax: number;

    const polygons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    const polygons$$: Observable<Array<any>> = polygons.asObservable();
    polygons.next([])
     //var   polygons: any=[]
       this._arrParcells.forEach(async  element => {
        this.mapService.getParcelFromCapakey(element.capakey,3812).subscribe((data:any)=>{
          const  polygon = { type: "polygon", rings: data.features[0].geometry.rings, "spatialReference": {"wkid": 3812} };
          const currentValue = polygons.value;
          const updatedValue = [...currentValue, polygon];
          if(updatedValue.length) {
            polygons.next(updatedValue);
          }
        })
      });

      polygons$$.subscribe(async data => {
        const selectedPolygons: Array<any>=[]
        if (data.length > 0) {
          if (data.length == this._arrParcells.length ){
            const selectedPercelen: any =polygons.value;
            selectedPercelen.forEach(perceel=>{
              selectedPolygons.push(perceel.rings)
              perceel.rings.forEach(ring=>{
                ring.forEach(coordinate=>{
                  arrayFromX.push(coordinate[0]);
                  arrayFromY.push(coordinate[1]);
                })
              })
            })
            arrayFromX.sort();
            arrayFromY.sort();
            if (arrayFromX.length>0 && arrayFromY.length>0){
              xMin=arrayFromX[0];
              xMax=arrayFromX[arrayFromX.length-1];
              yMin=arrayFromY[0];
              yMax=arrayFromY[arrayFromY.length-1];
            }

          let imageResult=await this.mapService.getImageCadgisRapport(xMin,xMax,yMin,yMax,selectedPolygons,oSelectionCadgis);
          
          imageResult.subscribe(async imageData => { 
            if(imageData!="" && imageData!=undefined && imageData!="Request failed."){         
              let printCadgis=  await this.mapService.PrintRapportCadgis(xMin,xMax,yMin,yMax,imageData,oSelectionCadgis);
              printCadgis.subscribe(blob=>{
                this.cadgisSubmitedSuccessfull=true;
                let thefile = new Blob([blob], { type: 'application/pdf' })          
                const url = window.URL.createObjectURL(thefile);
                window.open(url, '_blank');
              })
            }
          });         
          //let printCadgis=  await this.mapService.getNewUitreksel(xMin,xMax,yMin,yMax,selectedPolygons,oSelectionCadgis);     
       }
      }
    })
  }


  public searchFromPoint(oPoint: Point) {
    this.mapService.LoadDataFromPoint(oPoint,"4326","3857").subscribe(async (data: any) => {
      if (data.features != null && data.features.length > 0) {     
        let ArrRings:Array<string>;
        ArrRings=[];        
        data.features[0].geometry.rings.forEach(ring => {
          ring.forEach(coordinate=>{
            ArrRings.push(coordinate[0]);
            ArrRings.push(coordinate[1]);
          })          
        });
       //this.loadAddressByCapakey(event);
        let center:any= await this.comboService.GetCenterFromPolygon(ArrRings);
        const OMyPoint: Point = new Point();
        OMyPoint.x = center.labelPoints[0].x;
        OMyPoint.y = center.labelPoints[0].y;
        const dataTrasform: any = await this.comboService.TransformCoordinate(OMyPoint, '3857', '4326');
        const oCenter = JSON.parse('{"x": ' + dataTrasform.geometries[0].x + ',"y": ' + dataTrasform.geometries[0].y + ' }');
        this._center = [dataTrasform.geometries[0].x, dataTrasform.geometries[0].y];
        const oParcel: Parcel = new Parcel();
        oParcel.capakey = data.features[0].attributes.CaPaKey;
        oParcel.rings = data.features[0].geometry.rings;

        oParcel.center = oCenter;
        oParcel.perimeter = data.features[0].attributes["SHAPE.STArea()"];
        oParcel.surface = data.features[0].attributes.SuVaCn;

        this._polygon = data.features[0].geometry.rings;        
        //this._view.graphics.removeAll();
        //await this.InitEsriMap();
        //await this.initializeMap();
        const nIndex = this._arrParcells.findIndex(elem => {
          return  elem.capakey === oParcel.capakey;
         });
        if(nIndex < 0){
            let  graphicSection= this.addPolygonToView(this._polygon , false, SpatialReference.WebMercator);  
           /* this._view.goTo({          
              target: graphicSection,
              option:{ animate:true,duration:0.1},
              zoom: 45
              });*/                     
           this._arrParcells.push(oParcel);
           this._arrParcells = Object.assign([], this._arrParcells);
           this.changeDetect.detectChanges();
           // this.perceelemitter.emit( this.arrParcells);
         }
      }
     // console.log(data)
     /*if (data.geometry !== undefined && data.geometry.boundingBox !== undefined){
        const oPoligon: any = JSON.parse(data.geometry.boundingBox);
        const oCenter: any = JSON.parse(data.geometry.center);
        const oParcel: Parcel = new Parcel();
        oParcel.capakey = data.capakey;
        oParcel.perimeter = data['SHAPE.STLength()'];
        //oParcel.surface = data['SHAPE.STArea()'];
        oParcel.surface = data.features['SuVaCn'];

        oParcel.center = oCenter.coordinates;
        const nIndex = this._arrParcells.findIndex(elem => elem.capakey === data.capakey);
        if (nIndex >= 0){
              if (this.removePolygonFromView(this._arrParcells[nIndex].rings)){
                this.cleanCapakeyFromArray(data.capakey);
                this._arrParcells = Object.assign([], this._arrParcells);
              }
              this.changeDetect.detectChanges;             
              return;
            }      
            this.comboService.LoadRingDataFromCapakey(oParcel.capakey,"3857").subscribe((data: any) => {
              if (data.capakey!=null) {
                oParcel.rings = JSON.parse(data.geometry.shape).coordinates;
                const nIndex = this._arrParcells.findIndex(elem => {
                 return  elem.capakey === oParcel.capakey;
                });
                if (nIndex < 0){
                  this._arrParcells.push(oParcel);
                  this._arrParcells = Object.assign([], this._arrParcells);   
                  this.addPolygonToView(oParcel.rings,false,SpatialReference.WebMercator);
                }
              }
          });
       }
       */
     });
    }

    public FocusToPoint(oPoint: Point) {
     // this.FocusOnPoint(oPoint);
    const pointToFocus = new Point({
          hasZ: true,
          hasM: true,
          x:oPoint.x,
          y:oPoint.y,          
          spatialReference: {wkid: 31370} 
        }); 
     let symbol = {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: "red",
          size: "8px",  // pixels
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [ 255, 255, 0 ],
            width: 3  // points
          }
        };

      projection.load().then(function () {
        let convertMercator: any = projection.project(pointToFocus, { wkid: 102100 });
        const PointGraphic = new Graphic({
          geometry: convertMercator,
          symbol: symbol
        });    

        this._view.goTo({
          target: PointGraphic,
          option: { animate: true, duration: 0.1 },
          zoom: 20
        });

      }.bind(this));        
    }

    private FocusOnPoint(oPoint: Point){
      if(oPoint!=undefined && oPoint!=null){
        const pointToFocus = new ErsriPoint.default({
          hasZ: true,
          hasM: true,
          x:oPoint.y,
          y:oPoint.x,          
          spatialReference: {wkid: 4326} 
        });  
        
      projection.load().then(function() {
        let convertMercator :any =  projection.project(pointToFocus, {wkid: 102100} );
        let symbol = {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: "red",
          size: "8px",  // pixels
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [ 255, 255, 0 ],
            width: 3  // points
          }
        };
        //
        const oFraphics: any = this._view.graphics.filter(gr=>{return gr?.geometry?.type=="point"});      
        oFraphics.forEach(graphicsDelete => {
          this._view.graphics.remove(graphicsDelete);
        });

        const PointGraphic = new Graphic({
          geometry: convertMercator,   
          symbol:  symbol      
        });
        this._view.graphics.add(PointGraphic);      
        
       // this.changeDetect.detectChanges();
        this._view.goTo({          
            target: PointGraphic,
            option:{ animate:true,duration:0.1},
            zoom: 18
            });
        }.bind(this));
      }
    }

    private  getBBoxFromPolygon(){
      let arrayX:Array<number>=[];
      let arrayY:Array<number>=[];
      if( this.selectedRadius$.value!=null){
        if(this.selectedRadius$.value.type === "polygon") {
          (this.selectedRadius$.value as Polygon).rings.forEach(rings => {
            rings.forEach(ring => {
              arrayX.push(ring[0]); 
              arrayY.push(ring[1]);
            });
          });
        }
         
     
       return projection.load().then(function() {
          const pointBboxMin = new Point({
            hasZ: true,
            hasM: true,
            x:Math.min(...arrayX ),
            y:Math.min(...arrayY ),          
            spatialReference: {wkid: 102100} 
          });
          const pointBboxMax = new Point({
            hasZ: true,
            hasM: true,
            x:Math.max(...arrayX ),
            y:Math.max(...arrayY ),          
            spatialReference: {wkid: 102100} 
          });
          let convertLambertsMin :any =  projection.project(pointBboxMin, {wkid: 31370} );
          let convertLambertsMax :any =  projection.project(pointBboxMax, {wkid: 31370} );
          this.bbox = new BoundingBox();
          this.bbox.lowerLeft.x = convertLambertsMin.x;
          this.bbox.lowerLeft.y = convertLambertsMin.y;   
          this.bbox.upperRight.x = convertLambertsMax.x;
          this.bbox.upperRight.y = convertLambertsMax.y;
          return this.bbox;
        }.bind(this));  
      }  else
      {
        return null;
      }
    }

    public async onSubmit(){
      onHistorypointsLayer.graphics.removeAll();        
      onpointsLayer.graphics.removeAll();  

      if(this.displayType=="active" || this.displayType=="all"){
        this.permitService.searchRemote(
          await this.getBBoxFromPolygon(),
          this.f['filter_publication'].value,
          this.f['filter_goverment'].value
        );
        this.permitService.searchingPoints(
          await this.getBBoxFromPolygon(),
          this.f['filter_publication'].value,
          this.f['filter_goverment'].value
        );  
      }
      //this.permitService.searchingPoints(await this.getBBoxFromPolygon(),this.f.filter_publication.value,this.f.filter_goverment.value);  
      if(this.displayType=="history" || this.displayType=="all"){
        this.searchLocaly();
      }
      
    }


      private searchLocaly(){
          //let municipality={name:"Antwerpen"} ;//this.arrCombos["MUNICIPALITYCLEAR"].find(el=>{return el.code==this.f.municipality.value});  
          //this.f_History['screening_city'].setValue(municipality.name);

          let betrefts=permitFilterData.categoryElements[this.f_History['betreft'].value];       
          
          this.permitServiceLocal.searchLocal(
            { 
              screening_city:this.f_History['screening_city'].value,
              date_from:this.f_History['date_from'].value,
              date_to:this.f_History['date_to'].value,
              project_name:this.f_History['project_name'].value,
              project_number:this.f_History['project_number'].value,
              uuid:this.f_History['uuid'].value,
              adress:this.f_History['adress'].value,
              betreft:null,
              betrefts:betrefts,
              zipcodes:this.f_History['zipcode'].value,
              beslising:this.f_History['beslising'].value,              
            });
    }



    private addPoints(arrPointParams: Array<Permit_projects>,scolor:string="red",bhistoryLayer:boolean=false){    
      if(bhistoryLayer){
        onHistorypointsLayer.graphics.removeAll();  
      }else{
        onpointsLayer.graphics.removeAll();  
      }
        
    
      arrPointParams.forEach((point:any)=>{
        let sampleRegEx: RegExp = /(\d+\.?\d* \d+\.?\d*)/;
        let oPoints= sampleRegEx.exec(point.punt);
    
        const opoint = new Point({
          hasZ: true,
          hasM: true,
          x:Number(oPoints[0].split(' ')[0]),
          y:Number(oPoints[0].split(' ')[1]),          
          spatialReference: {wkid: 31370} 
        });   
        

        
        
    
        projection.load().then(function() {
          let convertMercator :any =  projection.project(opoint, {wkid: 102100} );
          if(GeometryHelper.isPointInCircle(convertMercator, this.selectedRadius$.value)){
                let symbol = {
                  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                  style: "circle",
                  color: scolor,
                  size: "8px",  // pixels
                  outline: {  // autocasts as new SimpleLineSymbol()
                    color: [ 255, 255, 0 ],
                    width: 3  // points
                  }
                };
                const PointGraphic = new Graphic({
                  geometry: convertMercator,   
                  popupTemplate:bhistoryLayer==false?null: new PopupTemplate({
                    //actions:[bhistoryLayer==true?selectAction:null],  
                    title: `<p style=\'margin-left:10px; margin-top:5px\'>Project</p>`,
                    outFields: ['*'],
                    content: () => {
                        const wrapper = document.createElement("div");
                        wrapper.innerHTML = 
                           `<div style="margin:5px !important">
                              <button id="select-feature" class="ant-btn ant-btn-primary ant-btn-dangerous ant-btn-block" data-projectnumber="${point.projectnummer}" >${this.translate.instant('Show Permit')}</button>
                              <ul>                            
                                  <li> <b>uuid:</b> ${point.uuid}</li>
                                  <li> <b>projectnumber:</b> <a>  ${point.projectnummer} </a> </li>
                                  <li> <b>puuid:</b> ${point.puuid}</li>
                                  <li> <b>inzageGegevensTypeEnum:</b> ${point.inzageGegevensTypeEnum}</li>                
                                  <li> <b>projectnaam:</b> ${point.projectnaam}</li>                
                                  <li> <b>adres:</b> ${point.adres}</li>                
                                  <li> <b>behandelendeOverheid:</b> ${point.behandelendeOverheid}</li>                
                              </ul>
                          </div>`;
                        return wrapper;
                      },
                    
                
                  }),
          
                  symbol:  symbol ,
                  attributes : {
                    "uuid": point.uuid,
                    "puuid": point.puuid,
                    "projectnumber": point.projectnummer,
                    "inzageGegevensTypeEnum": point.inzageGegevensTypeEnum,
                    "projectnaam":point.projectNaam?? point.projectnaam,
                    "adres": point.adres,
                    "behandelendeOverheid": point.behandelendeOverheid,
                    "loadFromHistory": bhistoryLayer==true?true:false,
          
                  }    
                });
                if(bhistoryLayer){
                  onHistorypointsLayer.graphics.add(PointGraphic);
                }else{
                  onpointsLayer.graphics.add(PointGraphic);
                }
          }
        }.bind(this));

        

      })
    }


    public  getWMSFeatureInfo(clickEvent,uuid){
     const url = `https://omgevingsloketinzage.omgeving.vlaanderen.be/proxy-omv-up/rs/v1/inzage/projecten/zoeken?page=0&size=10&sort=projectnummer`;
     if (url) {
       const PostObjectImage: any = new Object(); 
       PostObjectImage.url = url;
       PostObjectImage.body = "";
       let body:Array<object>=[];   
       let filteruuid= 
       {
               "filterType":"PROJECT_UUID",
               "abstractFilterInhoud":
               {
                   "@type":"FilterinhoudMetString",
                   "filter":uuid,                
               }
       } 
       body.push(filteruuid);
       PostObjectImage.body = JSON.stringify(body);
   
       this.http.post(`${environment.apiBaseUrl}/cors/POST`, PostObjectImage)
       .subscribe((response: any) =>
         { 
          // <li> <b>uuid:</b> ${response?.content[0]?.uuid}</li>
          // <li> <b>puuid:</b> ${response?.content[0]?.puuid}</li>
           const  templatePOI = `
           <div style="margin:5px !important">
              <ul>
                   <li> <b>Projectnummer:</b> <a href="https://omgevingsloketinzage.omgeving.vlaanderen.be/${response?.content[0]?.projectnummer}" target="_blank">${response?.content[0]?.projectnummer}</a> </li>             
                   <li> <b>Adres:</b> ${response?.content[0]?.adres}</li>                
                   <li> <b>Behandelende overheid:</b> ${response?.content[0]?.behandelendeOverheid}</li>                
                   <li> <b>Project Naam:</b> ${response?.content[0]?.projectNaam}</li>
               </ul>
           </div>`;
            this._view.popup.open({
              title: "Project",
              location: clickEvent.mapPoint,
              content: templatePOI,          
            });
         }) 
      }
    }

    displayModal(projectnummer:string){
       this.modalZService.create({
          nzTitle: this.translate.instant("Environmental permit"),
          nzContent: PermitsPreviewComponent,
          nzWidth: '1024px',
          nzMaskClosable: false,
          nzData: {
                  value: projectnummer,
                  project_id:projectnummer
                },
          nzFooter: []
      });
    }

}







export function convertArrayToObject
<
T extends { [prop in string | number]: any },
K extends keyof Pick<T, { [Key in keyof T]: T[Key] extends string | number ? Key : never}[keyof T]> = keyof Pick<T,
{[Key in keyof T]: T[Key] extends string | number ? Key : never}[keyof T]>,
A extends T[] = T[]
>
(array: readonly T[])
{
    const initialValue = {};
    return array.reduce((obj, item) => {           
        return {
            ...obj,
            ...item            
        };
    }, initialValue) //as { [propkey in A[number][K]]: A[number]; };
}

