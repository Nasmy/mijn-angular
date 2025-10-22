import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectorRef, inject, ViewEncapsulation } from '@angular/core';
import { Alert, Combo, File_Managment, ResponseApi } from '@shared/models';
import { TranslateModule } from '@ngx-translate/core';
import { ContactsService, FileManagmentService, AuthService, EncryptionService,  } from '@shared/services';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, RowSelectionMode, RowSelectionOptions, colorSchemeDarkBlue, colorSchemeLight, themeQuartz } from 'ag-grid-enterprise';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

import { RoleActionComponent } from '../role-action/role-action.component'

import { ParametersService, TemplatesService } from '@shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileTemplates, SyncfusionEditorSerialized, TemplateBlocks, Templates } from '@shared/models';

import { AgGridModule } from 'ag-grid-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DocTableActionsComponent } from '../doctable-actions/doctable-actions.component';
import { DocumentStatusActionComponent } from '../documentstatus-action/documentstatus-action.component';
import { FileAddModeldocumentComponent } from '../file-add-modeldocument/file-add-modeldocument.component';

@Component({
  selector: 'app-file-modeldocuments-modal',
  standalone: true,
  imports: [
    NzCardModule,
    TranslateModule,
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    NzAlertModule,
    NzModalModule,
    NzSpinModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerModule
  ],
  templateUrl: './file-modeldocuments-modal.component.html',
  styleUrl: './file-modeldocuments-modal.component.scss',
  encapsulation:ViewEncapsulation.Emulated
})
export class FileModeldocumentsModalComponent {

  private _fileManagment:File_Managment=<File_Managment>{};
  private _id:number;

  @Output() oFileManagment= new EventEmitter<any>();
  @Input()
  set fileManagment(value: File_Managment) {
    this._fileManagment = value;
  }

  get fileManagment(): File_Managment {
    return this._fileManagment;
  }  

  @Input()
  set id(value:number) {
    this._id = value;
  }

  get id(): number {
    return this._id;
  }  

  rowData
  rowDataModelDocuments
  form: FormGroup | undefined;
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: false,
    flex: 1,
  };
  public defaultColDefContacts: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  };

  constructor(
    public modelDocumentsService: TemplatesService,
    private paramService: ParametersService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    public changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private modalZService: NzModalService,
  ) { }

    nzData: { value, fileManagment: File_Managment } = inject(NZ_MODAL_DATA);

    public colDefs: ColDef<any>[] = [
      { field: "title", headerName:this.translateService.instant("Name")},
      { field: "categoryName", headerName:this.translateService.instant("Category")},
      { field: "date" },
      { field: "status", headerName: this.translateService.instant("Status"), cellRenderer: DocumentStatusActionComponent, floatingFilter: false, filter: false, width: 50, 
        valueGetter: params => {
          return params.data.name;
        },
        valueSetter: params => {
        params.data = params.newValue;
        return true;
        },
        onCellValueChanged:(ev)=>{
          console.log(ev);
          console.log("cell value changed")
          ev.data.statusId=ev.data.status.id;
          this.onTemplateStatusChange(ev.data);
        }
      },  
     
      { field: "actions", headerName:"",cellRenderer: DocTableActionsComponent,  floatingFilter: false, filter: false, width: 50 }
      ];

      ngOnInit(): void {
        this.form = this.formBuilder.group({
          title: [''],
          header: [''],
          foother: [''],
          categoryId: [''],
          watermark: [''],
          stared: [''],
          recent: [''],
    
        });
        this.loadModelDocs();    
        this.fileManagment=this.nzData["fileManagment"]; 
      }
    

      loadModelDocs() {
        this.modelDocumentsService.loadFileTemplatesByFilemanagment(this.nzData['value']).subscribe(result => {
          if(result!=null && result['data'].length>0){
            this.rowDataModelDocuments = result['data'].map(ModDoc=>{
              return {
                id:ModDoc.id,
                title:ModDoc.title,
                category:ModDoc.category,
                categoryName:ModDoc.category.name,
                categoryId:ModDoc.categoryId,
                date:ModDoc.created_at,
                status:ModDoc.status,
                statusId:ModDoc.statusId,
                fileManagmentId:ModDoc.fileManagmentId,
                content:ModDoc.content,
                action:ModDoc.id,              
              }
          })
        }       
      });      
    }

    addDocument(id?): void {  
      this.modalZService.create({
        nzTitle: "Add a model document",
        nzContent: FileAddModeldocumentComponent,
        nzWidth: '438px',
        nzMaskClosable: false,
        nzData: {
          value: id,
          filemanagment_id:id
        },
        nzFooter: []
      });
    }    
    onTemplateStatusChange(data){
      this.modelDocumentsService.updateFileTemplate(data.id,this._fileManagment.id, data).subscribe(result => {
      
      })
    }

}
