import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, OnInit, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapService } from '@shared/services';
import { Subject } from 'rxjs';
import { elementAt } from 'rxjs/operators';
//import { hexToCSSFilter,HexToCssConfiguration ,clearCache} from 'hex-to-css-filter';

import { hexToCSSFilter,HexToCssConfiguration,clearCache } from '@shared/helpers/index';


import  * as $ from 'jquery'
import { ResponseApi } from '@shared/models';
const config: HexToCssConfiguration = {
  acceptanceLossPercentage: 1,
  //forceFilterRecalculation: false
  maxChecks: 5,
};

@Component({
  standalone:true,
  selector: 'app-mobiscore',
  templateUrl: './mobiscore.component.html',
  styleUrls:['./mobiscore.css']

})

export class MobiscoreComponent implements OnInit {
@ViewChild('myMobiscore') div: ElementRef
@ViewChild('myMobiscore') divClean: ElementRef

@HostListener('click', ['$event.target'])

onClick(target) {
  if(target.id=="removeElement"){
    this.trace("Op verwijderen geklikt")
    target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode.parentNode.parentNode);    
  }
  if(target.id.includes("infoElement")){
     const IdModal=target.id.split('-',2)[1];    
    const modal=document.querySelectorAll( '[id="'+IdModal+'"]').forEach( function ( item ) {
      item.parentElement.setAttribute("aria-hidden","false");
      item.parentElement.classList.add("show");
      item.parentElement.classList.add("modal-open")   ;
      item.parentElement.setAttribute("style" ,"display:block");
    })
  }

  if(target.id=="modalClose"){

    const modal=document.querySelectorAll( '[role="dialog"]').forEach( function ( item ) {
      item.setAttribute("aria-hidden","true");
      item.classList.remove("show");
      item.setAttribute("style" ,"display:none");
    })
  }
}

private _capakey: string | ""
public mobiscoreHTML: string | ""
public mymodal: string  | ""

onChanges = new Subject<SimpleChanges>();

  @Input()
  set capaKey(sCapakey: string) {
    this._capakey = sCapakey;
  }

  get capaKey(): string {
    return this._capakey;
  }

  constructor(
    private mapservice: MapService,
    private changeDetect:ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.onChanges.subscribe((changes:SimpleChanges)=>{
      if (changes['capaKey']!=undefined &&  changes['capaKey'].currentValue != changes['capaKey'].previousValue) {
        this.LoadMobiscoreData(this._capakey)
        clearCache();
        const maincolotValue=document.body.style.getPropertyValue('--main-color')

        /*const cssFilter = hexToCSSFilter(maincolotValue,{...config});
       // document.body.style.setProperty('--mobiscore-filter',cssFilter.filter)
       // let sFilter=cssFilter.filter.replace(";","")
        $(':root').css('--mobiscore-filter', cssFilter.filter.replace(";",""));
         // this.trace(cssFilter)
         */
      }
    });
    if (this._capakey!=""){
      this.LoadMobiscoreData(this._capakey)
      /*const maincolotValue=document.body.style.getPropertyValue('--main-color')

      const cssFilter = hexToCSSFilter(maincolotValue,{...config});
      $(':root').css('--mobiscore-filter', cssFilter.filter.replace(";",""));
      */
      clearCache();
    }else{
      this.mobiscoreHTML="";
    }
   // this.div.nativeElement.attachShadow({mode: 'open'});


  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }


  private LoadMobiscoreData(sCapakey: string){
    // console.log(" New mobiscore check "+sCapakey)

    this.mapservice.getParcelFromCapakey(sCapakey,4326).subscribe((parcelData:any)=>{
    // this.trace(parcelData)
     const  ParcelRing: any =parcelData.features[0].geometry.rings[0]

      const sURLMobiscore: string= "https://mobiscore.omgeving.vlaanderen.be/ajax/get-score?lat="+ParcelRing[0][1] +"&lon="+ParcelRing[0][0]
       this.mapservice.SendGetProxy(sURLMobiscore).subscribe((dataMobiscore: any)=>{
        const randomID=Math.random().toString(36).slice(2);
        this.mobiscoreHTML=dataMobiscore.html
        //this.mobiscoreHTML=this.mobiscoreHTML.replace("href=\"#\"","");
        this.mobiscoreHTML=this.mobiscoreHTML.replace("\n","")
        this.mobiscoreHTML=this.mobiscoreHTML.replace("/","/")
        this.mobiscoreHTML=this.mobiscoreHTML.replace("//","");

        const temp = document.createElement('div');

       // set the content with the string
        temp.innerHTML = this.mobiscoreHTML;

        Array.from(temp.querySelectorAll('a')).forEach((ele)=> {
        // create a text node with the attribute value
           if (ele.text=="Hoe berekenen we de score?"){
            ele.href="https://mobiscore.omgeving.vlaanderen.be/faq"
            ele.target="_blank"
           }else{
             ele.removeAttribute('href');
           }

           if (ele.classList.contains('js-remove-score')){
             ele.setAttribute('class',"cursor-pointer");
             ele.firstElementChild.setAttribute('id',"removeElement");
           }
           if (ele.classList.contains('js-result-info-link')){
             ele.setAttribute('class',"cursor-pointer");
             ele.setAttribute('id',"infoElement-"+randomID);
           }
           if (ele.classList.contains('js-filter-link')){
            ele.remove();
           }
        });

        Array.from(temp.querySelectorAll('[data-dismiss="modal"]')).forEach((ele)=> {
          ele.setAttribute('id',"modalClose");
        })

        Array.from(temp.querySelectorAll('[class="modal-dialog"]')).forEach((ele)=> {
         // ele.classList.add("modal-lg")
         ele.setAttribute('id',""+randomID);
          this.mymodal= ele.innerHTML  ;
          //ele.remove()
        })


        Array.from(this.div.nativeElement.children).reverse().forEach(child => {
          this.div.nativeElement.removeChild(child);
       });

        this.div.nativeElement.insertAdjacentHTML('beforeend',temp.innerHTML )
        this.mobiscoreHTML=temp.innerHTML;
        this.changeDetect.detectChanges();

       })

    })


  }

  // https://mobiscore.omgeving.vlaanderen.be/ajax/get-score?lat=51.17524221039926&lon=4.43128254924201

  stringToHTML (str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  }


 private deleteMobiscore(){
   this.mobiscoreHTML=""
   this.changeDetect.detectChanges()
 }

 private displayInfo(){
  this.changeDetect.detectChanges()
}

public trace(event){
    console.log(event)
  }

}
