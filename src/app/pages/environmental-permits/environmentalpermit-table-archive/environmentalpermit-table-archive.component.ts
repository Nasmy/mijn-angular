import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentalpermitsRemoteService } from '@shared/services/environmentalpermits_remote.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, IDateFilterParams } from 'ag-grid-community';
import { TableFocusComponent } from '../table-focus/table-focus.component';
import Point from '@arcgis/core/geometry/Point';
import { TableopenLocalComponent } from '../tableopen-local/tableopen-local.component';
import { EnvironmentalpermitsLocalService } from '@shared/services';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { permitFilterData } from './permit-betreft'
import { Combo } from '@shared/models';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';

interface IRow {
  user: string;
  capakey: string;
  address: string;
  reference: string;
  dossier: string;
  date_requested: Date;
  date_processed: Date;
  status: string;
  statusCode: string;
  folder: string;
}

@Component({
  selector: 'app-environmentalpermit-table-archive',
  standalone: true,
  imports: [AgGridAngular,NzSelectModule,CommonModule,FormsModule,ReactiveFormsModule,NzGridModule,TranslateModule],
  templateUrl: './environmentalpermit-table-archive.component.html',
  styleUrl: './environmentalpermit-table-archive.component.scss'
})
export class EnvironmentalpermitTableArchiveComponent {
@Output() onFocusPoint= new EventEmitter<any>();
@ViewChild('agGridArchive') agGrid!: AgGridAngular;
@Output() onFilterChange= new EventEmitter<any>();

  arrCombos: { [key: string]: Array<Combo> } = {};
  arrCombosFiltered: { [key: string]: Array<Combo> } = {};
  listOfSelectedValue: string[] = [];
   

  rowData: any[] = [];
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];
  public formFilter!: FormGroup;

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
    minWidth: 30,
    resizable: true,
  };

  constructor(
    private translateService: TranslateService,
    public permitServiceLocal:EnvironmentalpermitsLocalService,
     private formBuilder: FormBuilder,
  ) {
    ModuleRegistry.registerModules([
      // Register any necessary modules here
    ]);
  }
  ngOnInit(): void {
      this.formFilter = this.formBuilder.group({
        betrefts: [[]],
        beslising: ['']
      });
      this.permitServiceLocal.searchProjectsFiltered.subscribe(dataArray=>{
          this.rowData = dataArray.map(project=>{
            return {
              punt: project.punt,
              projectnummer: project.projectnummer,
              adress_capakey: project.adres,
              behandelendeOverheid: project.behandelendeOverheid,
              inzageGegevensTypeEnum:project.inzageGegevensTypeEnum,
              parameterversie:project.parameterversie,
              projectNaam:project['projectnaam'],
              vvoEnum:project.vvoEnum,
            }   
          });
      })
      this.loadArrBetreft();
      this.loadArrStatus();
      this.formFilter.valueChanges.subscribe((value) => {
        if( value.betrefts && value.betrefts.length > 0) {
          this.permitServiceLocal.searchTerm["betrefts"]=permitFilterData.categoryElements[value.betrefts[0]]; 
        }else{
          this.permitServiceLocal.searchTerm["betrefts"]= null;
        }
        if( value.beslising && value.beslising.length > 0) {
          //this.permitServiceLocal.searchTerm = value.beslising;
          this.permitServiceLocal.searchTerm["beslising"]= permitFilterData.categoryStatus[value.beslising];
        }else{
           this.permitServiceLocal.searchTerm["beslising"]= null;
        }
        this.permitServiceLocal.searchTerm=this.permitServiceLocal.searchTerm || {};  
      
      

        //this.onFilterChange.emit(value);
      })
    }

    
  resizeGrid(): void {
    setTimeout(() => {
      if (this.agGrid?.api) {
        this.agGrid.api.sizeColumnsToFit();
        this.agGrid.api.refreshCells({ force: true });
      }
    }, 50); // Delay helps in tabs
  }

  public colDefs: ColDef<any>[] = [
    { field: "punt", headerName: this.translateService.instant("preview"), cellRenderer: TableFocusComponent,
          valueGetter: params => {
            return params.data.preview ? params.data.preview : null;
          },
          valueSetter: params => {
            params.data = params.newValue;
            return true;
          },
          onCellValueChanged:(ev)=>{
            console.log(ev);
            console.log("cell value changed")
             let sampleRegEx: RegExp = /(\d+\.?\d* \d+\.?\d*)/;
             let oPoints= sampleRegEx.exec(ev.data.punt);
             let oPoint: Point=new Point();
             oPoint.x=Number(oPoints[0].split(' ')[0]);
             oPoint.y=Number(oPoints[0].split(' ')[1]);
             this.onFocusPoint.emit(oPoint);
          },
      floatingFilter: false, filter: false, flex:1, minWidth: 15},
    { field: "projectnumber", headerName: this.translateService.instant("projectnumber"), filter: "agTextColumnFilter", cellRenderer:  TableopenLocalComponent,flex:2, minWidth: 30},
    { field: "adress_capakey", headerName: this.translateService.instant("Adress/Capakey"), filter: "agTextColumnFilter" ,flex:3, minWidth: 30},
    { field: "behandelendeOverheid", headerName: this.translateService.instant("BehandelendeOverheid"), filter: "agTextColumnFilter",flex:2, minWidth: 30 },
    { field: "inzageGegevensTypeEnum", headerName: this.translateService.instant("reference"), filter: "agTextColumnFilter" ,flex:2, minWidth: 30},
    { field: "parameterversie" , headerName: this.translateService.instant("Parameterversie"), filter: "agTextColumnFilter",flex:2, minWidth: 30},
    { field: "projectNaam" , headerName: this.translateService.instant("ProjectNaam"), filter: "agTextColumnFilter", filterParams:filterParams,flex:3, minWidth: 30 },
    { field: "vvoEnum" , headerName: this.translateService.instant("vvoEnum"), filter: "agTextColumnFilter", filterParams:filterParams,flex:1, minWidth: 30 },
  ];

  private loadArrBetreft(){
    this.arrCombos["BETREFT"]=[]
    permitFilterData.category.forEach(element => {
      let oCombo: Combo=new Combo();
      oCombo.id=element;
      oCombo.name=element;
      this.arrCombos["BETREFT"].push(oCombo);
    });
  }
  private loadArrStatus(){
    this.arrCombos["STATUS"]=[]
    permitFilterData.beslisingStatus.forEach(element => {
      let oCombo: Combo=new Combo();
      oCombo.id=element;
      oCombo.name=element;
      this.arrCombos["STATUS"].push(oCombo);
    });
  }
}

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const onlydateParts = dateAsString.split(",");
    const dateParts = onlydateParts[0].split("-");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
}
