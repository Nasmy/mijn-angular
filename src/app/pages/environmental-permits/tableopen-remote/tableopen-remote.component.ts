import { Component, Input, TemplateRef, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-tableopen-remote',
  standalone: true,
  imports: [    
    CommonModule, 
    NzGridModule, 
    NzToolTipModule, 
    NzIconModule, 
    TranslateModule,  
    FormsModule,
    NzDrawerModule],
  templateUrl: './tableopen-remote.component.html',
  styleUrl: './tableopen-remote.component.scss'
})
export class TableopenRemoteComponent {
  rowData;  
  public valueFormatted: string = '';
  valueCanCloseBasicRequest:string = "undefined";

  @Input() params: ICellRendererParams=<ICellRendererParams>{};   
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"  
  constructor() {}

    agInit(params: ICellRendererParams): void {
      //console.log(params.data);
      this.value = params.data.projectnummer;
      this.valueFormatted = params.data.projectnummer!;
      this.params=params;
      this.rowData = params.data;
    }
  
    refresh(params: ICellRendererParams): boolean {
      this.value = params.data;
      this.valueFormatted = params.data.punt!;
      return true;
    }  

}
