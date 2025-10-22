import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { TitleBar, WEB_API_ACTION } from './title-bar';
import { ToolbarService, DocumentEditorContainerComponent, BlockWidget, DocumentEditorContainer,DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { defaultDocument ,headerFooter} from './data';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { AlertService, EncryptionService, ParametersService, TemplatesService } from '@shared/services/';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Alert, FileTemplates, File_Managment, Guid, Parameters} from '@shared/models';
import { FileManagmentService } from '@shared/services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ResponseApi } from '@shared/models';
import { MatDialog } from '@angular/material/dialog';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
@Component({
  standalone: true,
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    DocumentEditorContainerModule,
    ButtonModule, 
    NzIconModule,
    TranslateModule,
    NzGridModule,
    NzAlertModule
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [ToolbarService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DocumentEditorComponent
    }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentEditorComponent implements OnInit, OnChanges, OnDestroy,  ControlValueAccessor {
  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  @ViewChild('documenteditor_default') container: DocumentEditorContainerComponent;
  @Output() onSaveClick= new EventEmitter<any>();
  @Output() onLoaded= new EventEmitter<any>();
  private _documentName:string;
  private _dockxBlob:any;
  private _readOnly:boolean = false;
  private _hideButtons:boolean = false;
  private _templateId:string;
  private _categoryId:number;
  private _statusId:number;
  private _mytemplate_id:string;
  private _filemanagment_id:number;
  public fileManagment:File_Managment=<File_Managment>{};
  public beditName:boolean=false;
  public allertMessage:Alert=<Alert>{};

  @Input() 
  set documentName(value: string) {
    this._documentName = value;
  }

  get documentName(): string {
    return this._documentName;
  }

  @Input() 
  set templateId(value: string) {
    this._templateId = value;
  }

  get templateId(): string {
    return this._templateId;
  }

  @Input() 
  set category_Id(value: number) {
    this._categoryId = value;
  }

  get category_Id(): number {
    return this._categoryId;
  }


  @Input() 
  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }

  @Input() 
  set filemanagment_id(value: number) {
    this._filemanagment_id = value;
  }

  get filemanagment_id(): number {
    return this._filemanagment_id;
  }

  @Input() 
  set mytemplate_id(value: string) {
    this._mytemplate_id = value;
  }

  get mytemplate_id(): string {
    return this._mytemplate_id;
  }

  @Input() 
  set status_id(value: number) {
    this._statusId = value;
  }

  get status_id(): number {
    return this._statusId;
  }

  @Input() 
  set dockxBlob(value: any) {
    this._dockxBlob = value;
  }

  get dockxBlob(): any {
    return this._dockxBlob;
  }

  @Input() 
  set hideButtons(value: boolean) {
    this._hideButtons = value;
  }

  get hideButtons(): boolean {
    return this._hideButtons;
  }

  arrCombos: { [key: string]: Array<Parameters> } = {};
  


  public culture: string = 'en-US';
  titleBar: TitleBar;
  disabled: boolean = false;

  //public documentValue:string;
  private _documentValue$ = new BehaviorSubject<string>('');
  public documentValue$$: Observable<string> = this._documentValue$.asObservable();


  constructor(
    private _dialog: MatDialog,
    private _modelDocumentsService: TemplatesService,
    private _fileManagmentService: FileManagmentService,
    private _translateService:TranslateService,   
    private _alertService:AlertService,  
    private _paramService: ParametersService,
    private _router: Router, 
    private _encryptionService: EncryptionService,
    //private _toastService:ToastrService,   
  ){}


  ngOnInit(): void { 
    this._alertService.clear();
    this.LoadStatuses();
    this.documentValue$$.subscribe(value=>{
      if(value!="" && value!=undefined && value!=null && this.container!=undefined) {
        if(this.container.documentEditor!=undefined){
          this.container.documentEditor.open(value);
          //this.container.documentEditor.selection.goToFooter();
          // Insert page number in the current cursor position
         // this.container.documentEditor.editor.insertPageNumber();
            this.container.toolbarModule.toolbar.hideItem(0, true);
            this.container.toolbarModule.toolbar.hideItem(1, true);
        }

      }else{
        this.container?.documentEditor?.openBlank();   
      }      
      this.container?.documentEditor?.dataBind();
    })

    this._alertService.onAlert().subscribe(allertData=>{
      this.allertMessage=allertData;
   })
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes["documentName"]!=undefined && changes["documentName"].currentValue!=undefined && changes["documentName"].currentValue!=null && changes["documentName"].currentValue!=""){
      if(this.container!=undefined ){
        this.container.documentEditor.documentName = this._documentName ?? 'Getting Started';
        this.titleBar.updateDocumentTitle();  
      } 
    }
    if(changes["filemanagment_id"]!=undefined && changes["filemanagment_id"].currentValue!=undefined && changes["filemanagment_id"].currentValue!=null && changes["filemanagment_id"].currentValue!=""){
      if(this.filemanagment_id!=undefined){
        this.loadFileManagment();
      }   
     
    }    
    if(changes["dockxBlob"]!=undefined && changes["dockxBlob"].currentValue!=undefined && changes["dockxBlob"].currentValue!=null && changes["dockxBlob"].currentValue!=""){
      if(this._dockxBlob!=undefined){
        this.titleBar.hideButtons();
        this.container.documentEditor.documentName = 'Preview_'+Guid.newGuid().toString();
        this.loadDocumentFromBlob();
      }   
     
    }    
  }

  ngAfterViewInit() {
    this.onLoaded.emit(true);
  }
  

  onCreate(): void {
    if(this._readOnly==true){      
      this.container.showPropertiesPane=false;
      this.container.enableToolbar=false;
      this.container.restrictEditing=true;
    } 

    let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
    this.titleBar = new TitleBar(this._dialog,titleBarElement, this.container.documentEditor,this._translateService, true,this._modelDocumentsService,this._templateId,false,this.readOnly,this._fileManagmentService, this._filemanagment_id);  
    this.container.serviceUrl = this.hostUrl + WEB_API_ACTION;
   // this.container.documentEditor.open(JSON.stringify(headerFooter));
   // let object =JSON.parse(localStorage.getItem('templates'))
   // this.container.documentEditor.open(JSON.parse(object.content));
     this.container.documentEditor.documentName = this.documentName ?? 'Getting Started';
     if(this._documentValue$.value!="" && this._documentValue$.value!=undefined) {
      this.container.documentEditor.open(this._documentValue$.value);
    }else{
      this.container.documentEditor.openBlank();
    }
    
     this.container.documentEditor.dataBind();
     //this.container.documentEditor.editor.insertPageNumber();
     this.titleBar.updateDocumentTitle();
}

onDocumentChange(): void {
    if (!isNullOrUndefined(this.titleBar)) {
        this.titleBar.updateDocumentTitle();
    }
    this.container.documentEditor.focusIn();    
}

onSave(): void {  
  let sfdt: any = { content: this.container.documentEditor.serialize() };
  this.onSaveClick.emit(sfdt);
}


addSamleText(text: string): void {
  let block: BlockWidget;  
  //this.container.documentEditor.editor.insertBlock(block);
  this.container.documentEditor.editor.insertText('Syncfusion');
  /*
    // You can also load HTML file/string from server side.
    Syncfusion.EJ2.DocumentEditor.WordDocument document = Syncfusion.EJ2.DocumentEditor.WordDocument.LoadString(data.content, FormatType.Html); // Convert the HTML to SFDT format.
    string json = Newtonsoft.Json.JsonConvert.SerializeObject(document);
  */
 }

 onEditorContentChange(event: any): void {
  //this.onSave();
  let sfdt: any =  this.container.documentEditor.serialize() ;
  this.onChange(sfdt);
 }

 public saveToDB(): void {
  if(this.readOnly==true){
    this._alertService.error('You are in preview mode. You can not save this changes!',"Modal");  
    return;
  }

  if(this.status_id==undefined || this.status_id==null || this.status_id==0){
    let modStatusNotCompleted=this.arrCombos['DOCUMENTSTATUS'].find(modStatus=>{return modStatus.system_code=='NOTCOMPLETED'});
    this.status_id=modStatusNotCompleted.id;
  }


  let sfdt: any =  this.container.documentEditor.serialize() ;
  let Filetemplate:FileTemplates =<FileTemplates>{};
  Filetemplate.title=this.container.documentEditor.documentName;
  Filetemplate.categoryId=this._categoryId;
  Filetemplate.statusId=this._statusId;
  Filetemplate.fileManagmentId=this._filemanagment_id;
  Filetemplate.content=sfdt;
  if(this._mytemplate_id!=null && this._mytemplate_id!=""){
    Filetemplate.id=this._mytemplate_id;
    this._modelDocumentsService.updateFileTemplate(this._mytemplate_id,this._filemanagment_id,Filetemplate).subscribe((dataResponse)=>{      
       ///this._toastService.success(this._translateService.instant('Update successful'),this._translateService.instant("Save"));
       this._alertService.success("Save successful","Modal");      
    }); 
  }else{
    this._modelDocumentsService.createFileTemplates(Filetemplate).subscribe((dataResponse:ResponseApi<FileTemplates>)=>{
      this._mytemplate_id=dataResponse.data.id;   
      this._alertService.success("Save successful","Modal"); 
       //this._toastService.success(this._translateService.instant('Save successful'),this._translateService.instant("Save"));
    }); 
  }
}

writeValue(obj: any): void {
  this._documentValue$.next(obj!);
}
registerOnChange(fn: any): void {
  this.onChange=fn;
}
registerOnTouched(fn: any): void {
 this.onTouched=fn;
}
setDisabledState?(isDisabled: boolean): void {
 this.disabled=isDisabled;
}

onChange = (fileUrl: string) => {};

onTouched = () => {};

ngOnDestroy(): void{
  this._documentValue$.next('');
}

close(){
  let idEncr=encodeURIComponent(this._encryptionService.getIdEncrypted(this.filemanagment_id));
  this._router.navigateByUrl("/filemanagment/"+idEncr);
}


private loadFileManagment(){
  this._fileManagmentService.load(this._filemanagment_id).pipe(first()).subscribe(
    {
      next: (dataResponse:ResponseApi<File_Managment>) => {  
        this.fileManagment=dataResponse.data;
      },
      error: error => {
          this._alertService.error(error);        
      }       
  })
}

saveTitle(){
  this._fileManagmentService.update(this._filemanagment_id,this.fileManagment)
  .pipe(first())
  .subscribe({
    next: () => {  
      this.beditName=false;
    },
    error: error => {
        this._alertService.error(error);        
    }
  })
}


private LoadStatuses(){
  this._paramService.getParamsByGroupSysCode('MODEL_STATUS').pipe(first()).subscribe({
    next: (DataResponse:ResponseApi<Array<Parameters>>)=>{
      this.arrCombos['DOCUMENTSTATUS']=DataResponse.data;
    }
  }
  )
}


loadDocumentFromBlob(){
  this.container.documentEditor.open(this._dockxBlob);
}


}
