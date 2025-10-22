import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentalpermitsRemoteService } from '@shared/services/environmentalpermits_remote.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, IDateFilterParams } from 'ag-grid-community';
import { TableFocusComponent } from '../table-focus/table-focus.component';
import Point from '@arcgis/core/geometry/Point';
import { TableopenRemoteComponent } from '../tableopen-remote/tableopen-remote.component';

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
  selector: 'app-environmentalpermit-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './environmentalpermit-table.component.html',
  styleUrl: './environmentalpermit-table.component.scss'
})
export class EnvironmentalpermitTableComponent implements OnInit {
 @Output() onFocusPoint= new EventEmitter<any>();
 @ViewChild('agGrid') agGrid!: AgGridAngular;

  rowData: any[] = [];
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
    minWidth: 30,
    resizable: true,
  };

  constructor(
    private translateService: TranslateService,
    public permitService:EnvironmentalpermitsRemoteService,
  ) {
    ModuleRegistry.registerModules([
      // Register any necessary modules here
    ]);
  }
  ngOnInit(): void {
      this.permitService.searchProjectsFiltered.subscribe(dataArray=>{
          this.rowData = dataArray.map(project=>{
            return {
              punt: project.punt,
              projectnummer: project.projectnummer,
              adress_capakey: project.adres,
              behandelendeOverheid: project.behandelendeOverheid,
              inzageGegevensTypeEnum:project.inzageGegevensTypeEnum,
              parameterversie:project.parameterversie,
              projectNaam:project.projectNaam,
              vvoEnum:project.vvoEnum,
            }   
          });
      })
    }

    ngAfterViewInit() {
      setTimeout(() => {
        if (this.agGrid?.api) {
          this.agGrid.api.sizeColumnsToFit(); // or this.agGrid.api.doLayout();
        }
      });
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
    { field: "projectnumber", headerName: this.translateService.instant("projectnumber"), filter: "agTextColumnFilter", cellRenderer:  TableopenRemoteComponent,flex:2, minWidth: 30},
    { field: "adress_capakey", headerName: this.translateService.instant("Adress/Capakey"), filter: "agTextColumnFilter" ,flex:3, minWidth: 30},
    { field: "behandelendeOverheid", headerName: this.translateService.instant("BehandelendeOverheid"), filter: "agTextColumnFilter",flex:2, minWidth: 30 },
    { field: "inzageGegevensTypeEnum", headerName: this.translateService.instant("reference"), filter: "agTextColumnFilter" ,flex:2, minWidth: 30},
    { field: "parameterversie" , headerName: this.translateService.instant("Parameterversie"), filter: "agTextColumnFilter",flex:2, minWidth: 30},
    { field: "projectNaam" , headerName: this.translateService.instant("ProjectNaam"), filter: "agTextColumnFilter", filterParams:filterParams,flex:3, minWidth: 30 },
    { field: "vvoEnum" , headerName: this.translateService.instant("vvoEnum"), filter: "agTextColumnFilter", filterParams:filterParams,flex:1, minWidth: 30 },
  ];
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
};
