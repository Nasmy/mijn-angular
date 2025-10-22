import { Component, Input, OnInit, SimpleChanges ,ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapService,AlertService} from '@shared/services';
import { BoundingBox, Point } from '@shared/models';

@Component({
  standalone: true,
  selector: 'app-displayparcel-map',
  templateUrl: './displayparcel-map.component.html',
  styleUrls: ['./displayparcel-map.component.less']
})
export class DisplayparcelMapComponent implements OnInit {



  private _capakey: string;
  private xMin: number;
  private xMax: number;
  private yMin: number;
  private yMax: number;
  private oBoundingBox: BoundingBox
  private arrayPixelXY : Array<Point>=[];

  public image : any;

  @Input()
  get   capakey(){
    return this._capakey;
  }

  set capakey(sCapa){
    this._capakey=sCapa;
  }



  constructor(
    private mapService: MapService,
    private alertService: AlertService,
    private changeDetect: ChangeDetectorRef,
  ) {
    this.oBoundingBox=new BoundingBox();
  }
  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['capakey']!=undefined &&  changes['capakey'].currentValue != changes['capakey'].previousValue) {
      if (this._capakey!=""){
        this.loadMapCapakey();
      }else{
        this.prepareEmptyImage();
      }
    }
  }

  loadMapCapakey(){
    this.loadPolygon();
  }


  loadPolygon(){
    const arrayFromX: Array<number>=[];
    const arrayFromY: Array<number>=[];

    const polygons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    const polygons$$: Observable<Array<any>> = polygons.asObservable();
    polygons.next([])
     //var   polygons: any=[]

        this.mapService.getParcelFromCapakey(this._capakey,3812).subscribe((data:any)=>{
          const  polygon = { type: "polygon", rings: data.features[0].geometry.rings, "spatialReference": {"wkid": 3812} };
          const currentValue = polygons.value;
          const updatedValue = [...currentValue, polygon];

          if(updatedValue.length) {
            polygons.next(updatedValue);
          }

        })


      polygons$$.subscribe(data => {
        const selectedPolygons: Array<any>=[]
        if (data.length > 0) {
          if (data.length >0 ){
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
            this.calculatePixels(this.oBoundingBox,396,233,polygons.value[0].rings)

            this.getImageBSK();
          }
      }

    })
  }




  private  getImageBSK(){
    let thefile = {};
     this.mapService.getImageBasicMap(this.oBoundingBox,396,233).subscribe(    dataResponse=>thefile = new Blob([dataResponse], { type: "image/png" }),
      error => this.alertService.error("Error downloading the file."),
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
      const maxW = 396;
      const maxH = 233;


  const canvas = <HTMLCanvasElement> document.getElementById('canvas');

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
    ctx.fillStyle = "rgb(200,0,0,0.18)";
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();


  }
  this.changeDetect.detectChanges();
  }

  prepareEmptyImage(){
    //create an image
    const img = new Image();
        img.src = ""
        const maxW = 396;
        const maxH = 233;


    const canvas = <HTMLCanvasElement> document.getElementById('canvas');

    const ctx = canvas.getContext('2d');

    img.onload = () =>{
      const iw = img.width;
      const ih = img.height;
      const scale = Math.min((maxW / iw), (maxH / ih));
      const iwScaled = iw * scale;
      const ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
}
this.changeDetect.detectChanges();
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



}
