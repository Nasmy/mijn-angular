import { Component, Input, TemplateRef, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';

import {  RequestsService } from '@shared/services';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-table-focus',
  standalone: true,
  imports: [
    CommonModule, 
    NzGridModule, 
    NzToolTipModule, 
    NzIconModule, 
    TranslateModule,  
    FormsModule,
    NzDrawerModule,


  ],
  providers: [NzModalService],
  templateUrl: './table-focus.component.html',
  styleUrl: './table-focus.component.scss'
})


export class TableFocusComponent {
  rowData;
  items:any=[];
  public valueFormatted: string = '';
  valueCanCloseBasicRequest:string = "undefined";

  @Input() params: ICellRendererParams=<ICellRendererParams>{};   
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"  
  constructor() {}

    agInit(params: ICellRendererParams): void {
      //console.log(params.data);
      this.value = params.data;
      this.valueFormatted = params.data.punt!;
      this.params=params;
      this.rowData = params.data;
    }
  
    refresh(params: ICellRendererParams): boolean {
      this.value = params.data;
      this.valueFormatted = params.data.punt!;
      return true;
    }  
  public onFocusClick(geometry){
        console.log(geometry);
        this.rowData.punt=geometry;   
        //this.loadOmgevingsCheck(geometry);
        this.params.setValue(this.rowData);
  }


}
