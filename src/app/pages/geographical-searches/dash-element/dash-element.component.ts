import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Guid, Layers } from '@shared/models';
import { info } from 'console';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  standalone: true,
  imports: [  
    CommonModule,  
    TranslateModule,    
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzCheckboxModule
],
  selector: 'app-dash-element',
  templateUrl: './dash-element.component.html',
  styleUrls: ['./dash-element.component.less'],
	encapsulation: ViewEncapsulation.None,
})
export class DashElementComponent implements OnInit {

  public _displayEye:boolean = true;
  private _item:any
  private _type:any
  public items: Array<any>;
  private itemsObject: Array<any>;
  public defaultKey:string
  public _displayTotalsSubLevel:boolean | false

  @Input()
  set item(item: any) {
    this._item = item;
  }

  get item(): any {
    return this._item;
  }

  @Input()
  set type(type: any) {
    this._type = type;
  }

  get type(): any {
    return this._type;
  }

  @Input()
  set displayTotalsSubLevel(value: any) {
    this._displayTotalsSubLevel = value;
  }

  get displayTotalsSubLevel(): any {
    return this._displayTotalsSubLevel;
  }

  @Input()
  set displayEye(value: boolean) {
    this._displayEye = value;
  }

  get displayEye(): boolean {
    return this._displayEye;
  }

  @Output() displayLayer = new EventEmitter<any>();

  constructor(
    private changeDetect:ChangeDetectorRef,
    private modalService: NgbModal
  ) {

   }

  ngOnInit(): void {
    this.items=[]
    this.defaultKey=this.getID(this._item)

  }

  open(content, item) {

    if(this.getTotalElements(item)!=0){   
    const n = document.getElementById(item.code);
      if (n!=undefined){
        this._item.expanded=true
        let tempArray=[]
        if (this._item.subThemas!=undefined && this._item.subThemas.length>0 && this._item.expanded){
          tempArray=this._item.subThemas
          this.itemsObject=tempArray.concat([])
        }

        if (this._item.lagen.length>0 && this._item.expanded){
          this.itemsObject=this._item.lagen.concat(tempArray)
        }        
        this.items=this.getItems(this.itemsObject,null,0);
        this.items=Object.assign([],this.items);
        this.changeDetect.detectChanges();        

      }else if (item.key!=undefined){
        this._item.expanded=true
          let tempArray=[]
          if (this._item.value!=undefined && this._item.value.length>0 && this._item.expanded){
            tempArray=this._item.value
            this.itemsObject=tempArray.concat([])
          }
          this.items=this.getItems(this.itemsObject,null,0);
          this.items=Object.assign([],this.items);
          this.changeDetect.detectChanges();        
      }

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

      //close  navbar right
      const x = document.getElementById("mySidenav");
      if (x!=null){
        x.style.width = "0px";
      }
    }

	}


  expanded(item:any)
  {
    item.expanded=!item.expanded;
    //console.log(item);
    this.items=this.getItems(this.itemsObject,null,0);
    this.items=Object.assign([],this.items);
    this.changeDetect.detectChanges();

  }

  getItems(data, tmpitems,index) {
    data.forEach((x:any) => {
      if (!tmpitems)
      tmpitems=[];
      tmpitems.features=[]
      let dataItem: any=new Object()
      if(typeof x === 'string'){
        dataItem.naam=x
        dataItem.displayed=false
        dataItem.expanded=true

      }else{
         dataItem=x
      }


      if (dataItem.displayed==undefined){
        try{
          dataItem.displayed=false
        }catch(error){
          console.log(error);
        }
      }

      tmpitems.push(dataItem);
      try{
        tmpitems[tmpitems.length-1].index=index
      }catch(error){
        console.log(error);
      }

      if (dataItem.subThemas && dataItem.expanded)
        this.getItems(dataItem.subThemas,tmpitems,index+1);
      if (dataItem.lagen && dataItem.expanded)
        this.getItems(dataItem.lagen,tmpitems,index+1);
      if (dataItem.features && dataItem.expanded)
        this.getItems(dataItem.features,tmpitems,index+1);
      if (dataItem.value && dataItem.expanded)
        this.getItems(dataItem.value,tmpitems,index+1);
    })
    return tmpitems;
  }


   getTotalFeatures(item){
    let ntotaal=0
    if (item.lagen!=undefined && item.lagen.length>0){
      item.lagen.forEach(element => {
        ntotaal+=element.features.length
      });
      return ntotaal;
    }
    if (item.subThemas!=undefined && item.subThemas.length>0){
      item.subThemas.forEach(element => {
        element.lagen.forEach(elementlagen => {
          ntotaal+=elementlagen.features.length
        });
      });

      return ntotaal;
    }
    if (item.features!=undefined &&  item.features.length>0){
      return item.features.length
    }else{
      return 0
    }
  }

  trace(elem){
    console.log(elem)
  }



  onDisplayLayer(item){
    const oLayerDisplay: Layers=new Layers()
    item.displayed=!item.displayed
    if( item.wmsURL!=undefined){
      // oLayerDisplay.id=Guid.newGuid().toString();
        oLayerDisplay.id=item.code;
        oLayerDisplay.name=item.naam;
        oLayerDisplay.display=!item.displayed;
        oLayerDisplay.url=item.wmsURL;
        oLayerDisplay.sublayers=[];
        oLayerDisplay.application="application/json";
        oLayerDisplay.sublayers.push(item.wmsFeatureType)
      }
     this.displayLayer.emit(oLayerDisplay)


  }

  public getID(item){
    if(item.code!=undefined){
      return item.code

    }else if(item.key!=undefined){
      return item.key

    }

  }


  getTotalElements( item){
    //this.trace(item)
    if (item.value!=undefined){
      try{
        return item.value.length
      }catch{
        return 0
      }
    }else if (item.lagen!=undefined || item.subThemas!=undefined){
      return 1;
    }
  }

  numerizeRound(value){
    return Number(value).toFixed(2);
  }

}
