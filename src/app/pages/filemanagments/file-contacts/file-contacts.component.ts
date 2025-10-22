import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Contact, File_Contacts, File_Managment, ResponseApi } from '@shared/models';
import { ContactsService, FileManagmentService } from '@shared/services';
import { ContactsDrawerComponent } from '../../contacts/contacts-drawer/contacts-drawer.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, RowSelectionMode, RowSelectionOptions, colorSchemeDarkBlue, colorSchemeLight, themeQuartz } from 'ag-grid-enterprise';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { RoleActionComponent } from '../role-action/role-action.component'

import { ParametersService } from '@shared/services';
import { AgGridModule } from 'ag-grid-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ContactActionsComponent } from '../contact-actions/contact-actions.component';
import { FileContactsModalComponent } from '../file-contacts-modal/file-contacts-modal.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';


@Component({
  selector: 'app-file-contacts',
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
    NzDividerModule,
    ContactsDrawerComponent
  ],
  templateUrl: './file-contacts.component.html',
  styleUrl: './file-contacts.component.scss'
})
export class FileContactsComponent implements OnInit {

  //nzData: { fileManagment: string } = inject(NZ_MODAL_DATA);
  
  private _fileManagment:File_Managment=<File_Managment>{};

  private _FileContacts$: BehaviorSubject<Array<File_Contacts>> = new BehaviorSubject<Array<File_Contacts>>(null);
  public  FileContacts$$: Observable<Array<File_Contacts>> = this._FileContacts$.asObservable();  
  
  private _lstContacts$: BehaviorSubject<Array<Contact>> = new BehaviorSubject<Array<Contact>>(null);
  public  lstContacts$$: Observable<Array<Contact>> = this._lstContacts$.asObservable();

  private gridApi!: GridApi<File_Contacts>;

  
  rowData
  rowDataContacts
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];

  isVisibleAddContact:boolean =false;
  onloadingContact:boolean =false;
  SubmitedSuccessfullAddContact:boolean =false;
  
  @Input()
  set fileManagment(value: File_Managment) {
    this._fileManagment = value;
  }

  get fileManagment(): File_Managment {
    return this._fileManagment;
  }  

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
  public colDefs: ColDef<any>[] = [
    //{ field: "user", cellRenderer: TableAvatarComponent,},
      { field: "name", headerName: this.translateService.instant("name")},
      { field: "role", headerName: this.translateService.instant("Role"), cellRenderer: RoleActionComponent, floatingFilter: false, filter: false, width: 50, 
        valueGetter: params => {
          return params.data.name;
        },
        valueSetter: params => {
        params.data = params.newValue;
        return true;
        },
        onCellValueChanged:(ev)=>{
          console.log(ev);
          this.onFileRoleChange(ev.data);
        }
      },    
      { field: "email", headerName: this.translateService.instant("Email") },
      { field: "telephone", headerName: this.translateService.instant("Telephone") },
      
      { field: "actions", headerName: this.translateService.instant("Acties"), cellRenderer: ContactActionsComponent, floatingFilter: false, filter: false, width: 50 }
    ];

  public  colDefsContact: ColDef<any>[] = [      
        { field: "name", headerName: this.translateService.instant("Name")},
        { field: "role", headerName: this.translateService.instant("Role"), cellRenderer: RoleActionComponent, floatingFilter: false, filter: false, width: 50, 
          valueGetter: params => {
            return params.data.name;
          },
          valueSetter: params => {
          params.data = params.newValue;
          return true;
          },
          onCellValueChanged:(ev)=>{
            console.log(ev);
          }
        },        
      ];

  public rowSelectionContact: RowSelectionOptions | "single" | "multiple" = {
        mode: "multiRow",
        isRowSelectable: (rowNode) => rowNode.data ?this.checkLinkedContact(rowNode.data.contactid): true,
    
      
      };

   public   myTheme = themeQuartz
      .withPart(colorSchemeLight)
      .withParams({
          // We prefer red to blue. Because the built in color schemes
          // derive all colors from foreground, background and
          // accent colors, changing these two values is sufficient.
          //backgroundColor: 'darkred',
          accentColor: 'red',
      });


  constructor(  
    private fileManagmentService:FileManagmentService,
    private contactService:ContactsService,
    private modalZService: NzModalService,
    private drawerService: NzDrawerService,
    private translateService: TranslateService,
  ){

  }


  ngOnInit(): void {

    this.contactService.contactAdded$.subscribe(() => {

      this.contactService.getAllContacts().subscribe((data:Array<any>)=>{
        if(data!=null && data.length>0){
          this.rowDataContacts = data.map(oContact=>{
  
            let lstLinked=this._FileContacts$.value;
            let foundedLinkedContact=lstLinked.find(fc=>{return fc.contactid==oContact.contactId && fc.filemanagmentid==this.fileManagment.id});
            return {
              name:oContact.name,
              role:foundedLinkedContact?.role,
              contactid:oContact.contactId
            }
        })
      }
    })


    });

  
    this.FileContacts$$.subscribe(data=>{
        if(data!=null && data.length>0){
          this.rowData = data.map(FileContact=>{
            return {
              name:FileContact.contact?.name,
              role:FileContact?.role,
              email:FileContact.contact?.email,
              telephone:FileContact.contact?.phone,          
              actions:FileContact.contactid, 
              contactid:FileContact.contactid,
              filemanagmentid:FileContact.filemanagmentid
            
            }
        })
      }
    })


    this.lstContacts$$.subscribe(data=>{
      if(data!=null && data.length>0){
        this.rowDataContacts = data.map(oContact=>{

          let lstLinked=this._FileContacts$.value;
          let foundedLinkedContact=lstLinked.find(fc=>{return fc.contactid==oContact.contactId && fc.filemanagmentid==this.fileManagment.id});
          return {
            name:oContact.name,
            role:foundedLinkedContact?.role,
            contactid:oContact.contactId
          }
      })
    }
  })
  }

  checkLinkedContact(contactid:number):boolean{
    let lstLinked=this._FileContacts$.value;
    let foundedLinkedContact=lstLinked.find(fc=>{return fc.contactid==contactid&& fc.filemanagmentid==this.fileManagment.id});
    return foundedLinkedContact==null && foundedLinkedContact==undefined;
  }

  ngOnChanges(changes: SimpleChanges) {  
    if (changes['fileManagment']!=undefined &&  changes['fileManagment'].currentValue != changes['fileManagment'].previousValue) {    
      this.loadLinkedContacts();
    }
  }


  loadLinkedContacts(){
    this.fileManagmentService.LoadAllContactsFilemanagment(this._fileManagment.id).pipe(first()).subscribe({
      next:((DataResponse:ResponseApi<Array<File_Contacts>>)=>{
        this._FileContacts$.next(DataResponse.data)
      })
    })
  }


  loadAllContacts(){
    this.contactService.getAllContacts().pipe(first()).subscribe({
      next:((DataResponse:Array<Contact>)=>{
        this.onloadingContact=false;
        this._lstContacts$.next(DataResponse)
      })
    })
  }

  Edit(){
    this.isVisibleAddContact=true;
    this.onloadingContact=true;
    this.loadAllContacts();
    
  }


  onFileAddContact(){
    const selectedData = this.gridApi.getSelectedRows();

    selectedData.forEach(NewRole => {
      let FileContact:File_Contacts=<File_Contacts>{};
      FileContact.filemanagmentid=this._fileManagment.id;
      FileContact.contactid=NewRole.contactid;
      if(NewRole.role!=undefined && NewRole.role.id!=undefined){
        FileContact.roleId=NewRole.role.id;
      }
     

      this.fileManagmentService.LinkContactToFile(this._fileManagment.id,FileContact).pipe(first())
      .subscribe({next:(dataResponse)=>{
        this.loadLinkedContacts();
        this.loadAllContacts();
        this.isVisibleAddContact=false;

      }})      
    });  
  }

  private onFileRoleChange(RoleChange: File_Contacts){

    let FileContact:File_Contacts=<File_Contacts>{};
      FileContact.filemanagmentid=this._fileManagment.id;
      FileContact.contactid=RoleChange.contactid;
      if(RoleChange.role!=undefined && RoleChange.role.id!=undefined){
        FileContact.roleId=RoleChange.role.id;
      }
     this.fileManagmentService.ChangeRoleFileContact(this._fileManagment.id,FileContact).pipe(first())
      .subscribe({next:(dataResponse)=>{
        this.loadLinkedContacts();
        this.loadAllContacts();

      }})      
  
  }

  onGridReady(params: GridReadyEvent<File_Contacts>) {
    this.gridApi = params.api;
  }


  updateSelectionOptions() {
    this.gridApi.setGridOption("rowSelection", {
      mode: this.getSelectValue("#input-selection-mode"),
    });
  }

  getSelectValue(id: string): RowSelectionMode {
    return (
      (document.querySelector<HTMLSelectElement>(id)
        ?.value as RowSelectionMode) ?? "singleRow"
    );
  }
  

 /* onCellValueChange(rowData){
    console.log(rowData)
  }*/


    showModal(id?): void {
      this.modalZService.create({
        nzTitle: this.translateService.instant("Contacts"),
        nzContent: FileContactsModalComponent,
        nzWidth: '1032px',
        nzData: {
          value: id,
        },
        nzFooter: []
      });
    }

    openDrawer(id?): void {
      //console.log(id);
      //console.log(this.valueFormatted);
      const drawerRef = this.drawerService.create<
      ContactsDrawerComponent,
        { 
          id: number },
        string
      >({
        nzTitle: id ? this.translateService.instant('Edit Contact') : this.translateService.instant('Add Contact'),
        nzWidth: '565px',
        nzBodyStyle: { value: "overflow: 'hidden'" },
        //nzFooter: 'Footer',
        //nzExtra: 'Extra',
        nzContent: ContactsDrawerComponent,
        /*nzContentParams: {
          value: this.value,
        },*/
        nzData: {
          //value: this.value,
          id: id,
        },
      });
  
    }

}
