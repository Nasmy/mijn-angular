import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, ViewContainerRef, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { File_Folder, File_Managment, ResponseApi } from '@shared/models';
import { FileManagmentService } from '@shared/services';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FileAttachmentsModalComponent } from '../file-attachments-modal/file-attachments-modal.component';


@Component({
  selector: 'app-minimal-requirements-modal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzGridModule,
    NzCardModule,
    NzToolTipModule,
    NzIconModule,
    NzDividerModule
  ],
  templateUrl: './minimal-requirements-modal.component.html',
  styleUrls: ['./minimal-requirements-modal.component.scss']
})
export class MinimalRequirementsModalComponent implements OnInit {

  private _FileFolders$: BehaviorSubject<Array<File_Folder>> = new BehaviorSubject<Array<File_Folder>>([]);
  public  FileFolders$$: Observable<Array<File_Folder>> = this._FileFolders$.asObservable();  

  nzData: { value, filemanagment_id: string, fileFolders:Observable<Array<File_Folder>> } = inject(NZ_MODAL_DATA);

  constructor(  
    private translateService:TranslateService,
    private _filemanagmentService: FileManagmentService,
    private modalZService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ){

  }
  ngOnInit(): void {
    this.nzData["fileFolders"].subscribe(data=>{
      this._FileFolders$.next(data);
    })
      
  }



  get notLinked(){
    return this._FileFolders$.value.filter(folder=>{return folder.fileAttachments.length==0})
  }

  get Linked(){
    return this._FileFolders$.value.filter(folder=>{return folder.fileAttachments.length>0})
  }


  onAdd(folder:File_Folder){
    this.modalZService.create({
      nzTitle: null,
      nzContent: FileAttachmentsModalComponent,
      nzWidth: '438px',
      nzMaskClosable: false,
      nzData: {      
        fileFolder:folder     
      },
      nzFooter: null
    });
  }

  showAttachments(folder:File_Folder){
    this.modalZService.create({
      nzTitle:null, // this.translateService.instant("Attachments"),
      nzContent: FileAttachmentsModalComponent,
      nzViewContainerRef:this.viewContainerRef,
      nzWidth: '538px',
      nzMaskClosable: false,
      nzData: {      
        fileFolder:folder     
      },
      nzFooter: null
    });

  }
  removeAttachments(folder:File_Folder){
      this._filemanagmentService.deleteAllFilesByFolderId(folder.id,Number(this.nzData["filemanagment_id"]));

  }

  get textDivider(){
    return this.translateService.instant("Linked")+ " ("+this.Linked.length+")"; 

  }

}
