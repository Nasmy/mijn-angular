import { createElement, Event, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { DocumentEditor, FormatType, ImageFormat } from '@syncfusion/ej2-angular-documenteditor';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoopScrollStrategy} from '@angular/cdk/overlay';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { TemplatesService } from '@shared/services';
import { FileManagmentService } from '@shared/services';
//import { SuccessMessageComponent } from '@shared/components/success-message/success-message.component';
import {
    PdfBitmap,
    PdfDocument,
    PdfPageOrientation,
    PdfPageSettings,
    PdfSection,
    SizeF,
  } from '@syncfusion/ej2-pdf-export';
import { TranslateService } from '@ngx-translate/core';
/**
 * Represents document editor title bar.
 */
export let WEB_API_ACTION = 'api/documenteditor/';

export class TitleBar {
    private tileBarDiv: HTMLElement;
    private documentTitle: HTMLElement;
    private documentTitleContentEditor: HTMLElement;
    private export: DropDownButton;
    private print: Button;
    private addToFile: DropDownButton;
    private open: Button;
    private documentEditor: DocumentEditor;
    private isRtl: boolean;
    private isReadOnly: boolean;
    private _hideButtons: boolean;
    private _modelDocumentsService: TemplatesService;
    private _templateId:string;
    private _file_managmentId:number;
    private _attachmentService: FileManagmentService;
    private _translateService: TranslateService;

    constructor( 
        private dialog: MatDialog,
        element: HTMLElement, 
        docEditor: DocumentEditor, 
        translateService:TranslateService,
        isShareNeeded: Boolean,  
        service: TemplatesService,
        templateId?:string,
        isRtl?: boolean,
        isReadOnly?: boolean,
        attachmentService?: FileManagmentService,
        fileManagmentId?:number,
        hideButtons?:boolean,
        
    ) {
        this._hideButtons = hideButtons;
        this.isRtl = isRtl;
        this.isReadOnly = isReadOnly;
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.documentEditor = docEditor;
        this._modelDocumentsService=service;
        this._templateId=templateId;
        this._attachmentService=attachmentService;
        this._file_managmentId=fileManagmentId;
        this._translateService=translateService;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    private initializeTitleBar = (isShareNeeded: Boolean): void => {
        let addToFileText: string;
        let downloadText: string;
        let downloadToolTip: string;
        let printText: string;
        let printToolTip: string;
        let openText: string;
        let documentTileText: string;
        if (!this.isRtl) {
            addToFileText = this._translateService.instant('Add to file');
            downloadText = this._translateService.instant('Download');
            downloadToolTip = 'Download this document.';
            printText = 'Print';
            printToolTip = 'Print this document (Ctrl+P).';
            openText = this._translateService.instant('Open');
            documentTileText = 'Document Name. Click or tap to rename this document.';
        } else {
            addToFileText = this._translateService.instant('Add to file');
            downloadText = this._translateService.instant('Download');
            downloadToolTip = 'Download this document.';
            printText = 'Print';
            printToolTip = 'Print this document (Ctrl+P).';
            openText = this._translateService.instant('Open');
            documentTileText = 'Document Name. Click or tap to rename this document.';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitle = createElement('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
        let iconCss: string = 'e-de-padding-right';
        let btnFloatStyle: string = 'float:right;';
        let titleCss: string = '';
        if (this.isRtl) {
            iconCss = 'e-de-padding-right-rtl';
            btnFloatStyle = 'float:left;';
            titleCss = 'float:right;';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitleContentEditor = createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
        this.documentTitleContentEditor.appendChild(this.documentTitle);
        this.tileBarDiv.appendChild(this.documentTitleContentEditor);
        this.documentTitleContentEditor.setAttribute('title', 'Document Name. Click or tap to rename this document.');
        let btnStyles: string = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
            + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;'
            + 'margin-top: 2px;';
        // tslint:disable-next-line:max-line-length
       
        this.print = this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false) as Button;
        this.open = this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', documentTileText, false) as Button;
        let items: ItemModel[] = [
           // { text: 'Microsoft Word (.docx)', id: 'word' },
           // { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
           // { iconCss: 'data', text: 'Syncfusion Document Text (*.sfdt)', id: 'sfdt'},
            { iconCss: 'data', text: 'Microsoft Word Document (*.docx)', id: 'docx' },
           // { iconCss: 'data', text: 'Word Template (*.dotx)', id: 'dotx' },
           // { iconCss: 'data', text: 'Plain Text (*.txt)', id: 'text' },
           // { iconCss: 'data', text: 'PDF (*.pdf)', id: 'pdf'},
           // { iconCss: 'data', text: 'HyperText Markup Language (*.html)', id: 'html' },
           // { iconCss: 'data', text: 'Rich Text Format (*.rtf)', id: 'rtf'},
           // { iconCss: 'data', text: 'Markdown (*.md)', id: 'md'},
           // { iconCss: 'data', text: 'OpenDocument Text (*.odt)', id: 'odt' },
        ];

        let itemsBlob: ItemModel[] = [
             { iconCss: 'data', text: 'Microsoft Word Document (*.docx)', id: 'docx' },
             { iconCss: 'data', text: 'PDF (*.pdf)', id: 'pdf'},
         ];
        // tslint:disable-next-line:max-line-length
        /*if(this.isReadOnly==false){
            btnStyles+="margin-right:55px;"
        }*/
        this.export = this.addButton('e-de-icon-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items,"FILE") as DropDownButton;
        if(!this._templateId && this._hideButtons==false ) this.addToFile = this.addButton('e-de-icon-Download ' + iconCss, addToFileText,this.isReadOnly==true? btnStyles: btnStyles, 'documenteditor-share', downloadToolTip, true, itemsBlob,"BLOB") as DropDownButton;
        if (!isShareNeeded) {
            this.export.element.style.display = 'none';
        } else {
            this.open.element.style.display = 'none';
        }
    }
    private setTooltipForPopup(): void {
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    }
    private wireEvents = (): void => {
        this.print.element.addEventListener('click', this.onPrint);
        this.open.element.addEventListener('click', (e: Event) => {
            if ((e.target as HTMLInputElement).id === 'de-open') {
                let fileUpload: HTMLInputElement = document.getElementById('uploadfileButton') as HTMLInputElement;
                fileUpload.value = '';
                fileUpload.click();
            }
        });
        this.documentTitleContentEditor.addEventListener('keydown', (e: KeyboardEventArgs) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.documentTitleContentEditor.contentEditable = 'false';
                if (this.documentTitleContentEditor.textContent === '') {
                    this.documentTitleContentEditor.textContent = 'Document1';
                }
            }
        });
        this.documentTitleContentEditor.addEventListener('blur', (): void => {
            if (this.documentTitleContentEditor.textContent === '') {
                this.documentTitleContentEditor.textContent = 'Document1';
            }
            this.documentTitleContentEditor.contentEditable = 'false';
            this.documentEditor.documentName = this.documentTitle.textContent;
        });
        this.documentTitleContentEditor.addEventListener('click', (): void => {
            this.updateDocumentEditorTitle();
        });
    }
    private updateDocumentEditorTitle = (): void => {
        this.documentTitleContentEditor.contentEditable = 'true';
        this.documentTitleContentEditor.focus();
        window.getSelection().selectAllChildren(this.documentTitleContentEditor);
    }
    // Updates document title.
    public updateDocumentTitle = (): void => {
        if (this.documentEditor.documentName === '') {
            this.documentEditor.documentName = 'Untitled';
        }
        this.documentTitle.textContent = this.documentEditor.documentName;
    }

        // Updates document title.
        public updateDocument = (): void => {
            this.documentEditor.refresh(); 
        }
    // tslint:disable-next-line:max-line-length
    private addButton(iconClass: string, btnText: string, styles: string, id: string, tooltipText: string, isDropDown: boolean, items?: ItemModel[],downloadFormat:string=""): Button | DropDownButton {
        let button: HTMLButtonElement = createElement('button', { id: id, styles: styles }) as HTMLButtonElement;
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            if(downloadFormat=="FILE"){
                let dropButton: DropDownButton = new DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: (): void => { this.setTooltipForPopup(); } }, button);
                return dropButton;
            }else if(downloadFormat=="BLOB"){
                let dropButton: DropDownButton = new DropDownButton({ select: this.onExportBlobClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: (): void => { this.setTooltipForPopup(); } }, button);
                return dropButton;
            }
            let ejButton: Button = new Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;

        } else {
            let ejButton: Button = new Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    }
    private onPrint = (): void => {
        this.documentEditor.print();
    }
    private onExportClick = (args: MenuEventArgs): void => {
        let value: string = args.item.id;
        switch (value) {
            case 'docx':
                this.save('Docx');
                break;
            case 'sfdt':
                this.save('Sfdt');
                break;
        }
    }
    private onExportBlobClick = (args: MenuEventArgs): void => {
        let value: string = args.item.id;
      
        switch (value) {
            case 'docx':
                this.documentEditor.saveAsBlob('Docx').then((sfdtBlob)=>{ 
                    const myFile = new File([sfdtBlob], this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName+".docx", {
                        type: sfdtBlob.type 
                    });       
                    this._attachmentService.createSingleFileAttachment(myFile,this._file_managmentId,null).subscribe((dataResponse)=>{
                        this.openSuccessModal(this._file_managmentId.toString());
                        });;                 
                  });
               // this.save('Docx');
                break;
            case 'pdf':             
                this.exporttoPdf();                
                break;
        }
    }
    private save = (format: string): void => {
        if(this._templateId!="" && this._templateId!=null&&this._templateId!=undefined){
            this._modelDocumentsService.downloadTemplate(this._templateId).subscribe(data => {
                this.documentEditor.save(this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName, format as FormatType);
            });
        }else{
            this.documentEditor.save(this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName, format as FormatType);
        }

        // tslint:disable-next-line:max-line-length        
        // console.log(this.documentEditor.serialize());
        //  localStorage.setItem('templates', this.documentEditor.serialize());

        /* this.documentEditor.saveAsBlob('Sfdt').then(function (sfdtBlob) { 
            var fileReader = new FileReader(); 
            fileReader.onload = function (e) { 
                // Get Json string here 
                var sfdtText = fileReader.result; 
               // This string can send to server for saving it in database 
                //alert(sfdtText); 
                localStorage.setItem('templates', JSON.stringify(fileReader.readAsText(sfdtBlob)));
            } 
             
          }); */

 
           //You can save the document as below
           /* this.documentEditor.saveAsBlob('Docx').then(async (blob: Blob) => {
                console.log('Saved sucessfully');
                let exportedDocument: Blob = blob;
                //Now, save the document where ever you want.
                let formData: FormData = new FormData();
                formData.append('fileName', 'sample.docx');
                formData.append('data', exportedDocument);
                localStorage.setItem('templates', JSON.stringify(await exportedDocument.text()));
                */
                /* tslint:disable */
                /*var req = new XMLHttpRequest();
                // Replace your running Url here
                req.open(
                  'POST',
                  'http://localhost:62869/api/documenteditor/SaveToS3',
                  true
                );
                req.onreadystatechange = () => {
                  if (req.readyState === 4) {
                    if (req.status === 200 || req.status === 304) {
                      console.log('Saved sucessfully');
                    }
                  }
                };
                req.send(formData);*/
           // });

           /*let sfdt: any = { content: this.documentEditor.serialize() };
           localStorage.setItem('templates', JSON.stringify(sfdt));*/
              
    }

    exporttoPdf(){
        let pdfdocument: PdfDocument = new PdfDocument();
        let count: number =this.documentEditor.pageCount;
        this.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
        let loadedPage = 0;
        for (let i = 1; i <= count; i++) {
            setTimeout(() => {
              let format: ImageFormat = 'image/jpeg' as ImageFormat;
              // Getting pages as image
              let image = this.documentEditor.exportAsImage(i, format);
              image.onload = function () {
                let imageHeight = parseInt(
                  image.style.height.toString().replace('px', '')
                );
                let imageWidth = parseInt(
                  image.style.width.toString().replace('px', '')
                );
                let section: PdfSection = pdfdocument.sections.add() as PdfSection;
                let settings: PdfPageSettings = new PdfPageSettings(0);
                if (imageWidth > imageHeight) {
                  settings.orientation = PdfPageOrientation.Landscape;
                }
                settings.size = new SizeF(imageWidth, imageHeight);
                (section as PdfSection).setPageSettings(settings);
                let page = section.pages.add();
                let graphics = page.graphics;
                let imageStr = image.src.replace('data:image/jpeg;base64,', '');
                let pdfImage = new PdfBitmap(imageStr);
                graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
                loadedPage++;
                if (loadedPage == count) {
                    // Exporting the document as pdf
                  pdfdocument.save().then((blob)=>{ 
                    const myFile = new File([blob.blobData], this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName+".pdf", {
                        type: blob.blobData.type 
                    });       
                    this._attachmentService.createSingleFileAttachment(myFile,this._file_managmentId,null).subscribe((dataResponse)=>{
                        this.openSuccessModal(this._file_managmentId.toString());
                    });                 
                  });
        
                }
              }.bind(this);
            }, 100);
          }
    }

    openSuccessModal(ObjectId:string){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
       // dialogConfig.scrollStrategy = this.sso.block();
        dialogConfig.scrollStrategy = new NoopScrollStrategy();
        dialogConfig.backdropClass ="backdropBackground";      
        dialogConfig.width="320px"
        dialogConfig.data= this._translateService.instant("Document ") +": "+ this.documentEditor.documentName + " "+ this._translateService.instant("is added to this file")+"." ;   
  
        //this.dialog.open(SuccessMessageComponent, dialogConfig);
        setTimeout(() => {
          this.dialog.closeAll();
        }, 2000);     
      }

      public hideButtons = (): void => {
       this._hideButtons=true;
      }
            
    
}
