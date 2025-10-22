import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-enterprise';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PermitsPreviewComponent }  from  '../permits-preview/permits-preview.component';

@Component({
  selector: 'app-tableopen-local',
  standalone: true,
  imports: [    
    CommonModule, 
    NzGridModule, 
    NzToolTipModule, 
    NzIconModule, 
    TranslateModule,  
    FormsModule,
    NzDrawerModule],
  templateUrl: './tableopen-local.component.html',
  styleUrl: './tableopen-local.component.scss',
})
export class TableopenLocalComponent {
  rowData;  
  public valueFormatted: string = '';
  valueCanCloseBasicRequest:string = "undefined";

  @Input() params: ICellRendererParams=<ICellRendererParams>{};   
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"  
  constructor(
     private modalZService: NzModalService,
     private translateService: TranslateService,
  ) {}

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


    openModal(projectid:string) {
      this.modalZService.create({
        nzTitle: this.translateService.instant("Environmental permit"),
        nzContent: PermitsPreviewComponent,
        nzWidth: '1024px',
        nzMaskClosable: false,
        nzData: {
          value: projectid,
          project_id:projectid
        },
        nzFooter: []
      });
    
    
    }

}
