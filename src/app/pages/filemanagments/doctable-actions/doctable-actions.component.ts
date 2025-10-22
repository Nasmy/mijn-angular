import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EncryptionService, ConfirmationDialogService, AlertService, FileManagmentService, TemplatesService } from '@shared/services';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  //imports: [NzGridModule,CommonModule],
  imports: [CommonModule, NzGridModule],
  providers: [NzModalService],
  templateUrl: './doctable-actions.component.html',
  styleUrls: ['./doctable-actions.component.scss']
})
export class DocTableActionsComponent {
  //public value: any = '';
  public valueFormatted: string = '';
  public valueFileManagmentId: string = '';
  //value = '';
  encrypetdIds: { [key: string]: string } = {};
  
	closeResult: string;
  contacts = null;

  @Input() params: any;
  @Output() onDrawerCanClose= new EventEmitter<boolean>();

  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"

  constructor(
      private router: Router,
      private _modelDocumentsService: TemplatesService,
      private confirmationService: ConfirmationDialogService,    
      private encryptionService : EncryptionService,
      private modalService : NzModalService,
    ) {}

  agInit(params: ICellRendererParams): void {  
    this.value = params.data;
    this.valueFormatted = params.data.action!;
    this.valueFileManagmentId = params.data.fileManagmentId!;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.data;
    this.valueFormatted = params.data.action!;
    this.valueFileManagmentId = params.data.fileManagmentId!;
    return true;
  }

  
    openDrawerEdit(id?): void {    
      this.modalService.closeAll();  
      this.router.navigate([`/filemanagment/document/editor/filemanagment/${this.encryptId(this.valueFileManagmentId)}/modaldocument/${this.valueFormatted}/edit`]).then(() => {
        
      });      
    }

    openDrawerRead(id?): void {
      this.modalService.closeAll();  
      this.router.navigate([`/filemanagment/document/editor/filemanagment/${this.encryptId(this.valueFileManagmentId)}//modaldocument/${this.valueFormatted}/preview`]).then(() => {
        
      });  
    }


    
   public encryptId(nId){
    if(this.encrypetdIds[nId]===undefined){
      this.encrypetdIds[nId]=encodeURIComponent( this.encryptionService.getIdEncrypted(nId));
      return this.encrypetdIds[nId]
    }else{
      return this.encrypetdIds[nId] ;
    }    
  }    

    public  delete(id: string, content?): void {
      this.confirmationService.confirm('Are you sure you want to delete this?','This action cannot be undone. Deleting this contact will permanently remove it along with any screenings made.','Delete',"Cancel","lg").then((result) => {
        if(result==false){
          this.onDrawerCanClose.emit(false)
          this.valueChange.next("false");
        }else if(result==true){      
          this._modelDocumentsService.deleteFileTemplate(id,Number(this.valueFileManagmentId))
          .pipe(first())
          .subscribe(() => 
            {             
               this.reloadComponent();
            });    
        }
    
        }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));      
      }

      reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/filemanagment/'+this.encryptId(this.valueFileManagmentId)]);
    }
}
