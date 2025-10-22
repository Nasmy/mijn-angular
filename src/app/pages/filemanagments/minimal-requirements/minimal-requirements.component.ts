import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { File_Folder, File_Managment, ResponseApi } from '@shared/models';
import { FileManagmentService } from '@shared/services';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MinimalRequirementsModalComponent } from '../minimal-requirements-modal/minimal-requirements-modal.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-minimal-requirements',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzGridModule,
    NzCardModule,
    NzToolTipModule,
    NzProgressModule
  ],
  templateUrl: './minimal-requirements.component.html',
  styleUrls: ['./minimal-requirements.component.scss']
})
export class MinimalRequirementsComponent implements OnInit {

  //@ViewChild('footherrequirements') _footherModal:  TemplateRef<{}>;
  private _fileManagment:File_Managment=<File_Managment>{};

  private _FileFolders$: BehaviorSubject<Array<File_Folder>> = new BehaviorSubject<Array<File_Folder>>([]);
  public  FileFolders$$: Observable<Array<File_Folder>> = this._FileFolders$.asObservable();  


  @Input()
  set fileManagment(value: File_Managment) {
    this._fileManagment = value;
  }

  get fileManagment(): File_Managment {
    return this._fileManagment;
  }  


  constructor(
    private _filemanagmentService: FileManagmentService,
    private modalZService: NzModalService,
    private translateService:TranslateService
  ){

  }
  ngOnInit(): void {

    this._filemanagmentService.reloadFileFolders$$.subscribe(dataReload=>{
      this.loadRequirementsData();
    })
    
  }

  ngOnChanges(changes: SimpleChanges) {  
    if (changes['fileManagment']!=null && changes['fileManagment']!=undefined &&  changes['fileManagment'].currentValue != changes['fileManagment'].previousValue) {    
      this.loadRequirementsData();
    }
  }


  loadRequirementsData(){
    if(this.fileManagment!=null && this.fileManagment!=undefined){
      this._filemanagmentService.loadFileFolderbyManagmentId(this.fileManagment.id)
      .pipe(first())
      .subscribe({
        next:(dataResponse:ResponseApi<Array<File_Folder>>)=>{
              this._FileFolders$.next(dataResponse.data);
        }
      })
    }

  }


  get notLinked(){
    return this._FileFolders$.value.filter(folder=>{return folder.fileAttachments.length==0})
  }

  get Linked(){
    return this._FileFolders$.value.filter(folder=>{return folder.fileAttachments.length>0})
  }



  showModal(id,tplFooter: TemplateRef<{}>){
    this.modalZService.create({
      nzTitle: this.translateService.instant("Minimal legaly required information"),
      nzContent: MinimalRequirementsModalComponent,
      nzWidth: '438px',
      nzMaskClosable: false,
      nzData: {
        value: id,
        filemanagment_id:id,
        fileFolders:this.FileFolders$$
      },
      nzFooter: null // tplFooter
    });

  }

  addDocument(id){

  }
  testFunction(){
    console.log("Comp Parent")
  }

  get calculateProcent(){
    return (this.Linked.length/this._FileFolders$.value.length)*100;
  }

}
