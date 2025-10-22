import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BoundingBox, Point } from '@models/index';
import { EnvironmentalpermitsLocalService, EnvironmentalpermitsRemoteService, FileManagmentService, MapService } from '@services/index';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule, DatePipe } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-permits-preview',
  templateUrl: './permits-preview.component.html',
  styleUrls: ['./permits-preview.component.scss'],
  standalone: true,
  imports: [TranslateModule,NzTabsModule,CommonModule,NzToolTipModule ],
  providers:[
      { provide: DatePipe}, 
  ]
})
export class PermitsPreviewComponent implements OnInit  {
  @Output() onLoaded= new EventEmitter<any>();
  @ViewChild('previewMap') canvas: ElementRef<HTMLCanvasElement>;
    nzData: { project_id: string } = inject(NZ_MODAL_DATA);
  
  private xMin: number;
  private xMax: number;
  private yMin: number;
  private yMax: number;
  private oBoundingBox: BoundingBox
  private arrayPixelXY : Array<Point>=[];

  public translationBlockLoaded: { [code: string]: boolean } = {};

  private _projectnumber:any;



  arrCombosBlockTranslates: { [code: string]: { [code: string]: string } } = {};
  arrCombosTypes: { [code: string]: string } = {};
  arrCombosOnderdeel: { [code: string]: string } = {};
  arrCombosOnderdeelAard: { [code: string]: string } = {};
  arrCombosDossierStukken: { [code: string]: string } = {};
  arrpreview: { [code: string]: boolean } = {};
  arrDisplaySubMenu: { [key: string]: boolean} = {};

  @Input()
  set projectnumber(value: string) {
    this._projectnumber = value;
  }

  get projectnumber(): string {
    return this._projectnumber;
  }

  public projectDetails:any;
  constructor(        
    private permitServiceLocal:EnvironmentalpermitsLocalService,    
    private permitServiceRemote:EnvironmentalpermitsRemoteService,      
    private readonly sso: ScrollStrategyOptions,      
    private mapService:MapService,
    private changeDetect:ChangeDetectorRef,
    private filemanagmentService : FileManagmentService,
    private sanitizer: DomSanitizer,
    
    ) {
      this.oBoundingBox=new BoundingBox();
     }



  ngOnInit(): void {
    this.projectnumber=this.nzData["project_id"];

    this.loadProjectDetails();
    this.loadComboProjectTypes();
    this.loadComboOnderdeel();
    this.loadComboOnderdeelAard();
    this.loadComboDossierStuken();
    
  }

    loadProjectDetails(){
        this.permitServiceLocal.LoadProjectDetails(this._projectnumber).subscribe((dataResponse:any)=>{
          this.projectDetails=dataResponse;
          this.LoadComponentsTranslations();
          this.onLoaded.emit(true)
        })
    }

    loadComboProjectTypes(){
      this.permitServiceRemote.LoadProjectCategorie("PROJECT").subscribe((dataResponse:Array<any>)=>{
        if(dataResponse!=undefined){
          dataResponse.forEach(element => {
            this.arrCombosTypes[element.code]=element.waarde;            
          });
        }


      })
    }    
    
    loadComboOnderdeelAard(){
      this.permitServiceRemote.LoadProjectCategorie("DOSSIERONDERDEEL","PI").subscribe((dataResponse:Array<any>)=>{
        if(dataResponse!=undefined){
          dataResponse.forEach(element => {
            this.arrCombosOnderdeelAard[element.code]=element.waarde;            
          });
        }
        /*this.arrCombosOnderdeel["EFFECT_OMGEVING_SV"]="Effecten op de omgeving";
        this.arrCombosOnderdeel["PLAN_FOTO"]="Plannen en foto's";
        this.arrCombosOnderdeel["INHOUD_AANVRAAG"]="Inhoud aanvraag";
        this.arrCombosOnderdeel["VERORDENING_HEMELWATER_SV"]="Verordening hemelwater";
        this.arrCombosOnderdeel["DOSSIERSTUK"]="Dossierstukken";
        this.arrCombosOnderdeel["MER_GOED"]="MER";*/
      })
    }

    loadComboDossierStuken(){
      this.permitServiceRemote.LoadProjectCategorie("DOSSIERSTUK","PI").subscribe((dataResponse:Array<any>)=>{
        if(dataResponse!=undefined){
          dataResponse.forEach(element => {
            this.arrCombosDossierStukken[element.code]=element.waarde;            
          });
        }
      })
    }

    loadComboOnderdeel(){
      this.permitServiceRemote.LoadProjectCategorie("DOSSIERONDERDEEL").subscribe((dataResponse:Array<any>)=>{
        if(dataResponse!=undefined){
          dataResponse.forEach(element => {
            this.arrCombosOnderdeel[element.code]=element.waarde;            
          });
        }
      })
    }

    loadPolygon(strPolygon:string,uuid:string){

      if(this.arrpreview[uuid]==true) return;

      const arrayFromX: Array<number>=[];
      const arrayFromY: Array<number>=[];
  
  
      const polygons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);      
      polygons.next([])
       //var   polygons: any=[]
       strPolygon=strPolygon.replaceAll("POLYGON ((","[[[");
       strPolygon=strPolygon.replaceAll("))","]]]");       
       strPolygon=strPolygon.replaceAll(", ","],[");
       strPolygon=strPolygon.replaceAll(" ",",");    
       strPolygon=strPolygon.replaceAll("[(","[");
       strPolygon=strPolygon.replaceAll(")]","]");
       
       this.arrpreview[uuid]=true;    
     
       let DataPolygon=JSON.parse(strPolygon);
       polygons.next(DataPolygon);
       DataPolygon.forEach(ring=>{
        ring.forEach(coordinate=>{
          arrayFromX.push(coordinate[0]);
          arrayFromY.push(coordinate[1]);
        })
      })
      arrayFromX.sort();
              arrayFromY.sort();
              if (arrayFromX.length>0 && arrayFromY.length>0){
                this.xMin=arrayFromX[0]
                this.xMax=arrayFromX[arrayFromX.length-1]
                this.yMin=arrayFromY[0]
                this.yMax=arrayFromY[arrayFromY.length-1]
              }
  
              this.oBoundingBox.lowerLeft.x=this.xMin;
              this.oBoundingBox.lowerLeft.y=this.yMin;
              this.oBoundingBox.upperRight.x=this.xMax;
              this.oBoundingBox.upperRight.y=this.yMax;
              this.oBoundingBox.normalisedBoundingBox(50,50,0)
              this.calculatePixels(this.oBoundingBox,500,300,polygons.value)
  
              this.getImageBSK(); 
      
    }


    calculatePixels(boundingBox: BoundingBox,mapWidth,mapHeight,arrayLongitudeLatitude){
      this.arrayPixelXY=[];
      const mapLonLeft  = boundingBox.lowerLeft.x;
      const mapLonRight  = boundingBox.upperRight.x;
      const mapLatBottom  = boundingBox.lowerLeft.y;
      const mapLatTop  = boundingBox.upperRight.y;
  
      const mapLonDelta : number = mapLonRight - mapLonLeft;
      //let mapLatBottomDegree: number= mapLatBottom * ( piValue / 180 );
      let  latitude: number;
      let longitude: number;
      let latlong : Point;
      let resultXY : Point;
  
  
      arrayLongitudeLatitude[0].forEach(latlong => {
        latitude = latlong[1];
        longitude = latlong[0];
        const x : number= (longitude - mapLonLeft) * (mapWidth / mapLonDelta);
        const PixelPerYCoord : number = mapHeight/(mapLatTop - mapLatBottom);
        const  mapLatitude : number = latitude - mapLatTop;
        const y : number= Math.abs(mapLatitude*PixelPerYCoord);
        resultXY=new Point();
        resultXY.x = x;
        resultXY.y = y;
        this.arrayPixelXY.push(resultXY);
      });
  
      // console.log(this.arrayPixelXY)
      return this.arrayPixelXY;
  
    }

    private  getImageBSK(){
      let thefile = {};
       this.mapService.getImageBasicVlaanderen(this.oBoundingBox,500,300).subscribe(    dataResponse=>thefile = new Blob([dataResponse], { type: "image/png" }),
        error => console.error("Error downloading the file."),
        () => {
          this.blobToBase64(thefile); 
        }
       )
    }

    private blobToBase64(blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        const base64data = reader.result;
       // this.image=base64data;
        this.prepareImage(base64data);
        this.changeDetect.detectChanges();
      }.bind(this);  
    }

    prepareImage(base64Img){
      //create an image
        const img = new Image();
        img.src = base64Img
        const maxW = 500;
        const maxH = 300;
        const canvas =this.canvas.nativeElement;
        if(canvas!=null){
              const ctx = canvas.getContext('2d');
              img.onload = () =>{
                const iw = img.width;
                const ih = img.height;
                const scale = Math.min((maxW / iw), (maxH / ih));
                const iwScaled = iw * scale;
                const ihScaled = ih * scale;
                canvas.width = iwScaled;
                canvas.height = ihScaled;
      
                ctx.drawImage(img, 0, 0);
                ctx.beginPath();
                this.arrayPixelXY.forEach(oPoint => {
                // ctx.moveTo(oPoint.x,oPoint.y);
                  ctx.lineTo(oPoint.x,oPoint.y);
      
                });
                ctx.closePath();
                ctx.fillStyle = "rgb(200,0,0)";
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.fill();
                ctx.stroke();     
              }
              this.changeDetect.detectChanges();
        }       
      this.changeDetect.detectChanges();
  } 

  download(file){
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(file.bestandsnaam)[1];
    this.filemanagmentService.dowloadPublicFile(file.downloadUrl+"."+ext,file.name);
  }
  megaMenuToggle(id){
    this.arrDisplaySubMenu[id]=!this.arrDisplaySubMenu[id];
  }

  getExtension(extension){
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(extension)[1];
    switch(ext){
      case "png":
      case "jpg":
      case "jpeg":
        {
          return "fa-file-image-o";         
        }      
      case "xls":
        {
          return "fa-file-excel-o";         
        }
      case "xlsx":
          {
            return "fa-file-excel-o";           
          }
      case "doc":
        {
          return "fa-file-word-o";          
        }

      case "docx":
        {
          return "fa-file-word-o";          
        }

      case "pdf":
        {
          return "fa-file-pdf-o";          
        }
      case "zip":
        {
          return "fa-file-archive-o";         
        }
     case "rar":
       {
         return "fa-file-archive-o";         
       }
      case "ppt":
        {
           return "fa-file-powerpoint-o";           
        }      
      case "pptx":
        {
           return "fa-file-powerpoint-o";           
        } 
      case "mp3":
        {
           return "fa-file-audio-o";         
        } 
      default:
      {
        return  "fa-file";
      }    

    }
  }


  public LoadComponentsTranslations(){
    this.projectDetails.projectInhouden.forEach(inhoud=>{
      inhoud.inhoudDetails.forEach(inhoudDetails=>{
        inhoudDetails?.dossierStukken?.forEach(dossierStukk => {

          if(dossierStukk?.architectData!=""){
            dossierStukk.architectDataArray=this.GetJsonValueObject(dossierStukk?.architectData);
          }

          dossierStukk.inzageDatablokResources?.forEach(resources => {
            if (!this.arrCombosBlockTranslates[resources.blokId]) {
              this.arrCombosBlockTranslates[resources.blokId]= {};
            }       
            resources.inhouden=this.GetJsonValueObject(resources?.datablokinhoud)    

            this.permitServiceRemote.LoadProjectComponenttranslations(resources.blokId).subscribe((dataResponse:any)=>{
              if(dataResponse!=undefined){
                dataResponse?.components.forEach(element => {
              
                  this.arrCombosBlockTranslates[resources.blokId][element.key]=element.label;
                });
                this.translationBlockLoaded[resources.blokId]=true
              }
            })  
          });
        });
        inhoudDetails?.voorwerpOnderdelen?.forEach(voorwerponderdeel => {
          voorwerponderdeel.details.details?.forEach(voorwerpdetails => {
            voorwerpdetails.inzageDatablokResources.forEach(resources => {

                if (!this.arrCombosBlockTranslates[resources.blokId]) {
                  this.arrCombosBlockTranslates[resources.blokId]= {};
                }       
                resources.inhouden=this.GetJsonValueObject(resources?.datablokinhoud)    
                this.permitServiceRemote.LoadProjectComponenttranslations(resources.blokId).subscribe((dataResponse:any)=>{
                  if(dataResponse!=undefined){
                    dataResponse?.components?.forEach(element => {
                  
                      this.arrCombosBlockTranslates[resources.blokId][element.key]=element.label;
                    });
                    this.translationBlockLoaded[resources.blokId]=true
                  }
                })  
              
              });
          });
        });

      })
    })  

  }



public GetJsonValueObject(jsonString: string){
  if(jsonString==null) return [];
  let JsonObject=JSON.parse(jsonString);
  if(this.isArray(JsonObject)){
    for(let i=0; i<=JsonObject.length-1;i++){
      JsonObject[i].dataKeys=Object.keys(JsonObject[i]).map(key => { return {name: key, value: JsonObject[i][key]}});
    }
    /*let convertedData= JsonObject.forEach(dataObject=>{
      
    }) */

    return JsonObject;
  }else{
    return Object.keys(JsonObject).map(key => { return {name: key, value: JsonObject[key]}});
  }
  
}

safeHTML(unsafe: string) {
  return this.sanitizer.bypassSecurityTrustHtml(unsafe);
}
public isObject(param){
  return typeof param === 'object';
}

public isArray(param){
  return param instanceof Array;
}

public getObjectProperyAsArray(ObjectToConvert){
  return Object.keys(ObjectToConvert).map(key => { return {name: key, value: ObjectToConvert[key]}});
}

}
