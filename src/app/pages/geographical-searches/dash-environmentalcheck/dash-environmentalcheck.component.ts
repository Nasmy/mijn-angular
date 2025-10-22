import { CommonModule } from '@angular/common';
import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Layers } from '@shared/models';
import { DashElementComponent } from '../dash-element/dash-element.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  imports: [  
    CommonModule,  
    TranslateModule,    
    FormsModule,
    DashElementComponent,
    NzCardModule,
    NzGridModule,
    NzIconModule
],
  selector: 'app-dash-environmentalcheck',
  templateUrl: './dash-environmentalcheck.component.html',
  styleUrls: ['./dash-environmentalcheck.component.less']
})
export class DashEnvironmentalcheckComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //public arrDisplayData: Array<any>=[]
  private _items: Array<any>
  public _displayEye:boolean = true;

  @Input()
  set arrDisplayData(tmpItem: any) {
    this._items = tmpItem;
  }

  get arrDisplayData(): any {
    return this._items;
  }

  @Input()
  set displayEye(value: boolean) {
    this._displayEye = value;
  }

  get displayEye(): boolean {
    return this._displayEye;
  }

  @Output() displayLayer = new EventEmitter<any>();
  

  getTotalFeatures(item){
    let ntotaal=0
    if (item.lagen!=undefined && item.lagen.length>0){
      item.lagen.forEach(element => {
        ntotaal+=element.features.length
      });
      //return ntotaal;
    }
    if (item.subThemas!=undefined && item.subThemas.length>0){
      item.subThemas.forEach(element => {
        element.lagen.forEach(elementlagen => {
          ntotaal+=elementlagen.features.length
        });
      });      
     
     // return ntotaal;
    }
    if (item.features!=undefined &&  item.features.length>0){
      ntotaal+= item.features.length
    }else{
     // return 0
    }
    return ntotaal;
  }

  onDisplayLayer(eventLayer: Layers){
    this.displayLayer.emit(eventLayer)

  }




}
