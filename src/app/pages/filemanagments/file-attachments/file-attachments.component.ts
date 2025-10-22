import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';

import { File_Attachments, File_Managment, ResponseApi } from '@shared/models';
import { AuthService, FileManagmentService } from '@shared/services';
import { environment } from '../../../../environments/environment';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG, DropzoneDirective, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FileAttachmentsModalComponent } from '../file-attachments-modal/file-attachments-modal.component';
import { FileAttachmentsPreviewComponent } from '../file-attachments-preview/file-attachments-preview.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-file-attachments',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    NzCardModule, 
    NzIconModule, 
    NzGridModule, 
    NgxDropzoneModule, 
    DropzoneModule, 
    NzToolTipModule,
    NzTypographyModule,
    FileAttachmentsModalComponent,
    FileAttachmentsPreviewComponent
  ],
  templateUrl: './file-attachments.component.html',
  styleUrl: './file-attachments.component.scss'
})
export class FileAttachmentsComponent {

private _fileManagment:File_Managment=<File_Managment>{};
@ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;  
@ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;

private _FileAttachments$: BehaviorSubject<Array<File_Attachments>> = new BehaviorSubject<Array<File_Attachments>>([]);
public  FileAttachments$$: Observable<Array<File_Attachments>> = this._FileAttachments$.asObservable();  

@Input()
set fileManagment(value: File_Managment) {
  this._fileManagment = value;
}
get fileManagment(): File_Managment {
  return this._fileManagment;
}

@Input()
set file_managmentId(id: number) {
  this._file_managmentId = id;
}  
get file_managmentId(): number {
  return this._file_managmentId;
}

private _file_managmentId:number;
public uploadSuccess:boolean = false;
public lstAttachments: Array<File_Attachments>;

public config1:any
arrHeaders: { [key: string]: string} = {};
arrDisplaySubMenu: { [key: string]: boolean} = {};

constructor(
  private translateService : TranslateService ,
  private filemanagmentService : FileManagmentService ,
  private accountService: AuthService,  
  private changeDetect: ChangeDetectorRef,
  private modalZService: NzModalService,
    //private toastService:ToastrService,
  ) {
  }

  ngOnInit(): void {
   console.log(this._fileManagment);
    this.arrHeaders["Authorization"]="Bearer "+ environment.currentUser.token;
    this.config1= <DropzoneConfigInterface> {
      clickable: true,
      autoReset: 3,
      errorReset: 3,
      cancelReset: 3,
      maxFiles: 1,
      addRemoveLinks:true,
      uploadMultiple:false,
      url:environment.apiBaseUrl+`/${this.accountService.userValue.client_id}/fileManagment/${this.file_managmentId}/attachments/single`,
      acceptedFiles: 'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf',
      headers:   this.arrHeaders,
      accept: (file, done) => {
       this.filemanagmentService.createSingleFileAttachment(file,this._file_managmentId,null)
       .subscribe({
       next: (data) => {
        // this.onUploadSuccess(data);                
         this.directiveRef.reset();
      
         return done();  
       },
       error: (e) => {          
        // this.toastService.error(e);
       },
       complete: () => {
        console.log('done')        
        //this.onUploadSuccess(data);
        this.loadAttachment();
       },
     })

 
     }
    }; 
    this.lstAttachments=[]; 
    this.loadAttachment();
  }





 loadAttachment(){
   this.filemanagmentService.loadAttachmentsByManagmentId(this._file_managmentId).subscribe((responseData:ResponseApi<Array<File_Attachments>>)=>{
     if (responseData.data!=null && responseData.data!=undefined){
       this._FileAttachments$.next(responseData.data);
       this.changeDetect.detectChanges;
     }
   })
 }


 getSize(nSize){
   let fileSize=0;
   fileSize= Number(parseFloat(""+(nSize/1024/1024)).toFixed(2));
   if(fileSize==0){
     fileSize= Number(parseFloat(""+(nSize/1024)).toFixed(2));
     return  fileSize +"kB";
   }else{
     return  fileSize +"MB";
   }
 }

 getTimeDiff(dateTime: Date){
   let date1=new Date(dateTime);
   let date2=new Date;
   var diff = Math.abs(date1.getTime() - date2.getTime());
   var diffHours = Math.ceil(diff / (1000 * 3600));
   var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
   if(diffHours<=24){
    var diffMinute= Math.floor((diff/1000)/ 60)
     if(diffMinute<60){
       return diffMinute + " "+this.translateService.instant("min ago");
     }else{
       return diffHours + " "+this.translateService.instant("hour ago");
     }
     
   }else{
     return diffDays + " "+this.translateService.instant("day ago");;
   }   
 }

 download(file){
   this.filemanagmentService.previewFile(file.url,file.name);
 }

 async deleteConfirm(id){
   let deleteData =await  this.filemanagmentService.deleteFileAttachment(id,this._file_managmentId)
   if(deleteData){
     this.loadAttachment()
     console.log("  delete OK")
   }else{
     console.log(" could not been delete")
   }
 }


 getExtension(extension){

   switch(extension){
     case ".png":
     case ".jpg":
     case ".jpeg":
       {
         return "file-image";         
       }      
     case ".xls":
       {
         return "file-excel";         
       }
     case ".xlsx":
         {
           return "file-excel";           
         }
     case ".doc":
       {
         return "file-word";          
       }

     case ".docx":
       {
         return "file-word";          
       }

     case ".pdf":
       {
         return "file-pdf";          
       }
     case ".zip":
       {
         return "file-zip";         
       }
    case ".rar":
      {
        return "file-zip";         
      }
     case ".ppt":
       {
          return "file-ppt";           
       }      
     case ".pptx":
       {
          return "file-ppt";           
       } 
     case ".mp3":
       {
          return "file-unknown";         
       } 
     default:
     {
       return  "file";
     }    

   }
 }
 
 public onUploadInit(args: any): void {
  
 }

 public onUploadError(args: any): void {
   console.log('onUploadError:', args);
 }

 public onUploadSuccess(args: any): void {
   this.loadAttachment(); 
 }

 
  showModal(id?): void {
    this.modalZService.create({
      nzTitle: this.translateService.instant("Attachments"),
      nzContent: FileAttachmentsModalComponent,
      nzWidth: '634px',
      nzData: {
        value: this._file_managmentId,
          //reference: this._reference,
        },
      nzFooter: []
    });
  }

  showPreview(file?): void {
    this.modalZService.create({
      nzTitle: this.translateService.instant("Preview"),
      nzContent: FileAttachmentsPreviewComponent,
      nzWidth: '800px',
      nzData: {
        fileType: file.file_extension,
        value: this._file_managmentId,
        file: file,
          //reference: this._reference,
        },
      nzFooter: []
    });
  }

  showImage(file?):void {
    this.filemanagmentService.previewImg(file.url);
  }

}
