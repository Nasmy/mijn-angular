import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { RouterModule, Router, Routes } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FileSummaryComponent } from '../file-summary/file-summary.component';
import { FileContactsComponent } from '../file-contacts/file-contacts.component';
import { FileModeldocumentsComponent } from '../file-modeldocuments/file-modeldocuments.component';
import { MinimalRequirementsComponent } from '../minimal-requirements/minimal-requirements.component';
import { FileObjectsComponent } from '../file-objects/file-objects.component';
import { FileAttachmentsComponent } from '../file-attachments/file-attachments.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService, EncryptionService, FileManagmentService, ParametersService } from '@shared/services';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { Combo, File_Managment, ResponseApi } from '@shared/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PageTittleService } from '@shared/services';



@Component({
  selector: 'app-filemanagment-add-edit',
  standalone: true,
  imports: [
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NzDropDownModule,
    TranslateModule,
    NzSegmentedModule,
    NzTabsModule,
    NzModalModule,
    NzImageModule,  
    NzDividerModule,
    MatDatepickerModule,
    NzAlertModule,
    FileSummaryComponent,
    FileContactsComponent,
    FileModeldocumentsComponent,
    FileObjectsComponent,
    FileAttachmentsComponent,
    NzCardModule,
    MinimalRequirementsComponent

         
],
  templateUrl: './filemanagment-add-edit.component.html',
  styleUrl: './filemanagment-add-edit.component.scss'
})
export class FilemanagmentAddEditComponent implements OnInit {
  protected id:string;
  protected idNum:number;
  public editName:boolean | false;
  public name:string="";
  AddMode:boolean | false;
  EditMode:boolean | false;

  form: FormGroup;
  isAddMode: boolean;
  isEditMode: boolean = false;
  submitted: boolean = false;
  //id:number | undefined;
  public nTabSearchIndex =1;

  public oFileManagment: File_Managment;
  arrCombos: { [key: string]: Array<Combo> } = {};

  private _FileManagment$: BehaviorSubject<File_Managment> = new BehaviorSubject<File_Managment>(null);
  public  FileManagment$$: Observable<File_Managment> = this._FileManagment$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private _filemanagmentService:FileManagmentService,
    private changeDetect:ChangeDetectorRef,
    private accountService: AuthService,
    private paramService: ParametersService,
    private formBuilder: FormBuilder,
    private router: Router,
    public pageTitleService:PageTittleService,
  ){

  }

  ngOnInit(): void {

    this.arrCombos["STATUS"]=[];

    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      file_number: ['', Validators.required],
      description: ['', Validators.required],
      status_id: [{value: '', disabled: false}, Validators.required],
      client_id: ['', Validators.required],
      created_at: [''],
      updated_at: [''],    


    })
    this.loadComboStatus();

    this.editName=false;
    const idEncoded = this.route.snapshot.params['id'];
    if(idEncoded!=""){
      this.id=this.encryptionService.getIdDecrypted( decodeURIComponent(idEncoded));  
      this.idNum = Number(this.id); 
    } 
    if(this.id!=undefined && this.id!=""){
      this.LoadFilemanagment();
      this.EditMode=true;
      this.AddMode=false;
    }else{
      this.AddMode=true;
      this.EditMode=false;
      let newFileManagment:File_Managment=<File_Managment>{};
      newFileManagment.name="New File";
      newFileManagment.status_id=10;
      newFileManagment.file_number="";
      newFileManagment.description="";
      newFileManagment.fileObjects=[];
      newFileManagment.client_id=this.accountService.userValue.client_id;
      this._FileManagment$.next(newFileManagment);
    }       
  }





  private LoadFilemanagment(){
    this._filemanagmentService.load(Number(this.id)).pipe(first())
    .subscribe({
      next: ((dataFIlemanagment:ResponseApi<File_Managment>)=>{
          this._FileManagment$.next(dataFIlemanagment.data);
          this.pageTitleService.settitle(dataFIlemanagment.data.name);
      })
    }
    )
  }


  SetName(){
    this.name=this._FileManagment$.value.name;
    
  }

  loadComboStatus(){
    this.paramService.getParamsByGroupSysCode("FILESTATUS").
      subscribe((statusses:ResponseApi< Array<Combo>>)=>{
        this.arrCombos["STATUS"]=statusses.data;
      })    
  }

  Save(){
    this.editName=false;
    let valueFileManagment=this._FileManagment$.value;
    valueFileManagment.name=this.name;
    this._FileManagment$.next(valueFileManagment);
    this._save();
  }

  SaveSummary(oFileManagment:File_Managment){
    let valueFileManagment=this._FileManagment$.value;
    valueFileManagment.file_number=oFileManagment.file_number;
    valueFileManagment.name=oFileManagment.name;
    valueFileManagment.description=oFileManagment.description;
    valueFileManagment.status_id=oFileManagment.status_id;
    this._FileManagment$.next(valueFileManagment);
    this._save();
    this.changeDetect.markForCheck();
    this.pageTitleService.settitle(valueFileManagment.name);

  }

  private _save(){
    if(this.AddMode==true){
      this._filemanagmentService.create(this._FileManagment$.value).pipe(first())
      .subscribe({
        next:((DataSaved:ResponseApi<File_Managment>)=>{
          if(DataSaved.data!=undefined){
            this.id=DataSaved.data.id.toString();
            this.AddMode=false;
            this.EditMode=true;
            this._FileManagment$.next(DataSaved.data);
          }
        
        })
      })
    }
    if(this.EditMode==true){
      this._filemanagmentService.update(this._FileManagment$.value.id,this._FileManagment$.value).pipe(first())
      .subscribe({
        next:(DataSaved=>{
        })
      })
    }

  
  }

  get f() {
    return this.form.controls;
  }

  navigateToFilesList() {
    this.router.navigate(['/filemanagment/']);
  }

}
