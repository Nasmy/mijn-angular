import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Combo, ResponseApi } from '@shared/models';
import { FileTemplates, SyncfusionEditorSerialized, TemplateBlocks, Templates } from '@shared/models';
import { NzModalRef, NzModalService, NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { EncryptionService, ParametersService, TemplatesService } from '@shared/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EmptyDocument } from './defaultDocument';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-file-add-modeldocument',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule, 
    ReactiveFormsModule, 
    RouterModule, 
    NzModalModule, 
    NzCollapseModule, 
    MatCheckboxModule,
    NzDropDownModule, 
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './file-add-modeldocument.component.html',
  styleUrl: './file-add-modeldocument.component.scss'
})
export class FileAddModeldocumentComponent {
  @ViewChild("templatePreview", { static: false }) templatePreview: TemplateRef<any>;
  nzData: { filemanagment_id: string } = inject(NZ_MODAL_DATA);

  public showSelectCategory:boolean=false;
  public colorValue:string=""
  public selectedLabel:string=""

  get filemanagment_id(): string {
    return this.nzData["filemanagment_id"];
  }

  public arrCombos: { [key: string]: Array<Combo> } = {};
  public arrCombosAmount: { [key: string]: number } = {};
  
  form: FormGroup | undefined;
  template:any ="";

  readonly #modal = inject(NzModalRef);
  selectedItems: { [category: string]: { [docName: string]: boolean } } = {};

  //readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  constructor(
    public modelDocumentsService: TemplatesService,
    private paramService: ParametersService,
    private formBuilder: FormBuilder,
    public modalService: NzModalService,
    public changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private router: Router,
    private encryptionService: EncryptionService,
  ) { }

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

    this.loadCategory();
    this.searchDocuments();
   
    this.form.controls['title'].valueChanges.subscribe(data => {
      this.searchDocuments();

    });  
  }

  updateSelection(category: string, docName: string, event: MatCheckboxChange) {
    this.selectedItems[category][docName] = event.checked;  
  }
    
  searchDocuments() {
    let oSearchParams: Templates
    oSearchParams=this.form.value;
    this.modelDocumentsService.search(oSearchParams);   
}


  private loadCategory() {
    this.paramService.getParamsByGroupSysCode("DOCUMENTTYPE").
      subscribe((statusses:ResponseApi< Array<Combo>>)=>{
        this.arrCombos["DOCUMENTTYPE"]=statusses.data;
        statusses.data.forEach((type)=>{
          this.getDatabyId(type.id);
        });
      })    
  }

  getDatabyId(id: string) {
    this.modelDocumentsService.getCountPerCategoryId(id).subscribe((data:number)=>{
      this.arrCombosAmount[id]=data
    }
  );
}

searchByCategory(categoryId: string): void{
  this.form.controls['categoryId'].setValue(categoryId);
  this.searchDocuments();

}

navigateToEditor(templateId:string=undefined) {
  
  let idEncrypted=this.encryptionService.getIdEncryptedUrlEncoded(Number(this.filemanagment_id));
  if(templateId!=undefined){  
    this.modalService.closeAll();
    this.#modal.destroy({ data: 'this the result data' });
    this.router.navigate([`/filemanagment/document/editor/filemanagment/${idEncrypted}/template/${templateId}`]).then(() => {
      this.changeDetectorRef.detectChanges();
    });
  }else{    
    this.showSelectCategory=true;    
  }
}

toggle(event: any) { 
  event.preventDefault()
  console.log('toggle'); 
}

selectCategory(category): void {
  let idEncrypted=this.encryptionService.getIdEncryptedUrlEncoded(Number(this.filemanagment_id));
  let idCategoryEncrypted=this.encryptionService.getIdEncryptedUrlEncoded(Number(category.id));
  this.#modal.destroy({ data: 'this the result data' });
  this.modalService.closeAll();
  this.router.navigate([`/filemanagment/document/editor/filemanagment/${idEncrypted}/category/${idCategoryEncrypted}/new`]).then(() => {
    this.changeDetectorRef.detectChanges();
  });
}

}
