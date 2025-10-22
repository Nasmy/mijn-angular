import { Component, OnInit } from '@angular/core';
import { Requests } from '@models/requests.model';
import { RequestsArray } from '@models/requestsArray.model';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { RequestsService } from '@services/requests.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, IDateFilterParams } from 'ag-grid-community';
import { AdvancedFilterModule,ColumnMenuModule } from 'ag-grid-enterprise';
//ModuleRegistry.registerModules([ AdvancedFilterModule, ColumnMenuModule ]); 
/*import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  SetFilterModule,
} from "ag-grid-enterprise";*/

/*ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ValidationModule ,
]);*/

import '@extension/date.extensions';
import { Subject } from 'rxjs';
import { TableAvatarComponent } from '../table-avatar/table-avatar.component';
import { TableStatusComponent } from '../table-status/table-status.component';
import { DownloadComponent } from '../download/download.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
//import { ColDef, GridApi, GridReadyEvent, IDateFilterParams, SideBarDef } from 'ag-grid-enterprise';

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
  selector: 'app-geographical-searches-table',
  standalone: true,
  imports: [AgGridAngular, TranslateModule],  
  templateUrl: './geographical-searches-table.component.html',
  styleUrl: './geographical-searches-table.component.scss',

})
export class GeographicalSearchesTableComponent  implements OnInit{
  private arrrequestsSubject=new Subject<RequestsArray>();
  private user: User | undefined;
  rowData: any[] = [];
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  };

  

  constructor(
            private http: HttpClient,
            private authService: AuthService,
            private requestsService: RequestsService,
            private translateService: TranslateService,
          ){}




  ngOnInit(): void {
    this.user= this.authService.userValue;
    this.authService.loadSecurityByCompanyId(this.user.client_id).then(data=>{
      console.log(data);
    });

    this.reloadRequests();
    //this.arrrequestsSubject.subscribe(data=>{
    this.requestsService.lstRequestsCompany$$.subscribe(data=>{
      //this.arrRequestValue=data;
      if(data?.requests!=undefined && data?.requests.length>0){
        this.rowData = data.requests.map(request=>{
          return {
            user: request.user.name,
            useravatar: data.users[request.user_id].image,
            useractive: data.users[request.user_id].active,
            capakey:request.capakey,
            address:request.address,
            reference:request.reference,
            dossier:request.filenumber,
            date_requested:new Date(request.created_at).toLocaleString(),
            date_processed:request.date_send !=null? new Date(request.date_send).toLocaleString():"/",
            status: request.status.name,
            statusCode: request.status.syscode,
            folder: request.folder
          }
        });
      }   
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    })
  }


// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef<any>[] = [
  { field: "user", headerName: this.translateService.instant("user"), cellRenderer: TableAvatarComponent,},
  { field: "capakey", headerName: this.translateService.instant("Capakey"), filter: "agTextColumnFilter" },
  { field: "address", headerName: this.translateService.instant("address"), filter: "agTextColumnFilter" },
  { field: "reference", headerName: this.translateService.instant("reference"), filter: "agTextColumnFilter" },
  { field: "dossier" , headerName: this.translateService.instant("dossier"), filter: "agTextColumnFilter"},
  { field: "date_requested" , headerName: this.translateService.instant("Date Requested"), filter: "agDateColumnFilter", filterParams:filterParams },
  { field: "date_processed" , headerName: this.translateService.instant("Date Processed"), filter: "agDateColumnFilter", filterParams:filterParams },
  { field: "status", headerName: this.translateService.instant("Status"), filter: "agTextColumnFilter", cellRenderer: TableStatusComponent},
  { field: "download", headerName: this.translateService.instant("Download"), cellRenderer: DownloadComponent,floatingFilter: false,filter: false,width: 50},
];




  private reloadRequests(){
    this.loadAllRequests();
    
  }
  private loadAllRequests(){
    this.requestsService.getByCompanyId(this.user.client_id).subscribe((data: RequestsArray)=>{
      this.arrrequestsSubject.next(data);
      //this.rowData=data;
      console.log(data);
    })
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
};

