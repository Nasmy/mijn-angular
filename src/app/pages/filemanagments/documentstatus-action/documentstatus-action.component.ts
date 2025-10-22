import { Component, Input, OnInit } from '@angular/core';
import { ParametersService } from '@shared/services';
import { Parameters }  from '@shared/models/parameters.model';
import { ResponseApi } from '@shared/models';
import { ICellRendererParams } from 'ag-grid-enterprise';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { first } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'documentstatus-role-action',
  standalone: true,
  imports: [NzDropDownModule, NzIconModule,NzButtonModule,CommonModule,TranslateModule],
  templateUrl: './documentstatus-action.component.html',
  styleUrls: ['./documentstatus-action.component.scss']
})
export class DocumentStatusActionComponent implements ICellRendererAngularComp , OnInit {
  arrCombos: { [key: string]: Array<Parameters> } = {};

 public colorValue:string=""
 selectedLabel: string = ''; 
 params: ICellRendererParams=<ICellRendererParams>{};
 rowData: any;

  constructor(
    private ParamService: ParametersService,
    private translateService:TranslateService
  ){}

  ngOnInit(): void {   
    this.LoadStatuses();
  }

  agInit(params: ICellRendererParams): void {    
    this.params=params;
    this.rowData = params.data;
    if(params.data.status!=null && params.data.status!=undefined){    
      this.colorValue= params.data.status.value; 
      this.selectedLabel = this.translateService.instant(params.data.status.name); 
    }
  }

  refresh(params: ICellRendererParams): boolean {
    if(params.data.role!=null && params.data.role!=undefined){
     
      this.colorValue= params.data.status.value; 
      this.selectedLabel =this.translateService.instant(params.data.status.name); 
      //this.valueFormatted = params.data.actions!;
    }
    return true;
  }

  private LoadStatuses(){
    this.ParamService.getParamsByGroupSysCode('MODEL_STATUS').pipe(first()).subscribe({
      next: (DataResponse:ResponseApi<Array<Parameters>>)=>{
        this.arrCombos['DOCUMENTSTATUS']=DataResponse.data;
      }
    }
    )
  }
 
 public selectOption(option: any) { 
    this.colorValue= option.value; 
    this.selectedLabel =this.translateService.instant(option.name); 
    this.rowData.status=option;   
    this.rowData.statusId=option.id;   
    this.params.setValue(this.rowData);
    
  }

}
