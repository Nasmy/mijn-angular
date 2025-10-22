import { Component, Input, OnInit } from '@angular/core';
import { ParametersService } from '@shared/services';
import { ComboService } from '@shared/services/combo.service';
import { Parameters }  from '@shared/models/parameters.model'
import { Subject, first } from 'rxjs';
import { ResponseApi } from '@shared/models';
import { ICellRendererParams } from 'ag-grid-enterprise';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-role-action',
  standalone: true,
  imports: [NzDropDownModule, NzIconModule,NzButtonModule,CommonModule, TranslateModule],
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.scss']
})
export class RoleActionComponent implements ICellRendererAngularComp , OnInit {
  arrCombos: { [key: string]: Array<Parameters> } = {};

 public colorValue:string=""
 selectedLabel: string = ''; 
 //RowValue: ICellRendererParams=<ICellRendererParams>{};

 params: ICellRendererParams=<ICellRendererParams>{};
 rowData: any;



  constructor(
    private ParamService: ParametersService,
    private translateService: TranslateService
  ){}

  ngOnInit(): void {   
    this.LoadRoles();
  }

  agInit(params: ICellRendererParams): void {
    //console.log(params.data);
    this.params=params;
    this.rowData = params.data;
    if(params.data.role!=null && params.data.role!=undefined){    
      this.colorValue= params.data.role.value; 
      this.selectedLabel = this.translateService.instant(params.data.role.name);   
    
      //this.refresh(params);
      //this.valueFormatted = params.data.actions!;
    }
  }

  refresh(params: ICellRendererParams): boolean {
    if(params.data.role!=null && params.data.role!=undefined){
     
      this.colorValue= params.data.role.value; 
      this.selectedLabel = this.translateService.instant(params.data.role.name); 
      //this.valueFormatted = params.data.actions!;
    }
    return true;
  }



  private LoadRoles(){
    this.ParamService.getParamsByGroupSysCode('FILEROLE').pipe(first()).subscribe({
      next: (DataResponse:ResponseApi<Array<Parameters>>)=>{
        this.arrCombos['FILEROLE']=DataResponse.data;
      }
    }
    )
  }
 
 public selectOption(option: any) { 
    this.colorValue= option.value; 
    this.selectedLabel = this.translateService.instant(option.name); 
    this.rowData.role=option;   
    this.params.setValue(this.rowData);
    //this.params.context?.onCellValueChange(this.rowData);
  }

}
