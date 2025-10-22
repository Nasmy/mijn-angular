import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentEditorComponent } from '@shared/components/document-editor/document-editor.component';

@Component({
  selector: 'app-file-attachments-preview',
  standalone: true,
  imports: [DocumentEditorComponent],
  templateUrl: './file-attachments-preview.component.html',
  styleUrl: './file-attachments-preview.component.scss'
})
export class FileAttachmentsPreviewComponent {

    nzData: { fileType: string, value:number, file } = inject(NZ_MODAL_DATA);
    public pdfSrc;
    public docXSrc;
    public pdfSafe;

    constructor(
        private http: HttpClient,
        public sanitizer: DomSanitizer
      ) {

          console.log(this.nzData.fileType);
          console.log(this.nzData.file);

          if (this.nzData.fileType == '.pdf') {
            this.previewPdf();
          } else  if (this.nzData.fileType == '.docx') { 
            this.previewDocX()
          }

        }

        previewPdf() {
          return this.http.get(`${this.nzData.file.url}`,{ responseType: 'blob'}).subscribe(
            (response: any) =>{        
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let blob = new Blob(binaryData, {type: dataType});
                this.pdfSrc = window.URL.createObjectURL(blob);
                this.pdfSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
              })
        }

        previewDocX() {
          return this.http.get(`${this.nzData.file.url}`,{ responseType: 'blob'}).subscribe(
            (response: any) =>{        
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let blob = new Blob(binaryData, {type: dataType});
                this.docXSrc = window.URL.createObjectURL(blob);
                //this.pdfSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
              })
        }

}
