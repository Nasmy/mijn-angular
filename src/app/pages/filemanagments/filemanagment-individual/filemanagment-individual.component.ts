import { Component } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-enterprise';
import { TableStatusComponent } from '../../geographical-searches/table-status/table-status.component';
import { FileManagmentService } from '@shared/services';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
interface IRow {
  name: string;  
  address: string;
  buildtype: string;
  reference: string;
  status: string;
  createdOm: string;
  modifiedAt: string;
  actions: string;
}

@Component({
  selector: 'app-filemanagment-individual',
  standalone: true,
  imports: [AgGridAngular,TranslateModule],
  templateUrl: './filemanagment-individual.component.html',
  styleUrls: ['./filemanagment-individual.component.scss']
})
export class FilemanagmentIndividualComponent {
  rowData;
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];
  
  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  };
  colDefs: ColDef<any>[] = [
    //{ field: "user", cellRenderer: TableAvatarComponent,},
    { field: "name", headerName: this.translateService.instant("Name")},
    { field: "address", headerName: this.translateService.instant("Address") },
    { field: "buildtype", headerName: this.translateService.instant("Buildtype") },
    { field: "reference", headerName: this.translateService.instant("Reference") },
    { field: "status", headerName: this.translateService.instant("Status"), cellRenderer: TableStatusComponent },
    { field: "createdOm", headerName: this.translateService.instant("Created On") },
    { field: "modifiedAt", headerName: this.translateService.instant("Modified At") },
    { field: "actions", headerName: this.translateService.instant("Acties"), cellRenderer: TableActionsComponent, floatingFilter: false, filter: false, width: 50},   

    ];
    
    constructor(
      private filemanagmentService: FileManagmentService,
      private translateService: TranslateService
    ){
  
    }
    ngOnInit(): void {
      this.loadFilemanagmentsByCompany();
      this.filemanagmentService.lstFileManagments$$.subscribe(fileManagments=>{
        if(fileManagments!=undefined &&  fileManagments.length>0){
          //console.log(fileManagments);
          this.rowData = fileManagments.map(managment=>{
            //const created = managment.created_at.split("T");
            return {
              name:managment.name,
              address:"nvt",
              buildtype:"nvt",
              reference:managment.file_number,
              status: managment.status.name,
              statusCode:managment.status.syscode,
              createdOm:managment.created_at,
              modifiedAt:managment.updated_at,
              actions: managment.id,
      
            
            }
          });
        }
      })
    }
    
    
    private loadFilemanagmentsByCompany(){
      this.filemanagmentService.getByUser().subscribe();
    }
}
