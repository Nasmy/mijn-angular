import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
//import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { FilemanagmentAddEditComponent } from '../filemanagment-add-edit/filemanagment-add-edit.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
//import { ContactsService, FormsService, EncryptionService } from '@shared/services';
import { ContactsService, EncryptionService, ConfirmationDialogService, AlertService } from '@shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  //imports: [NzGridModule,CommonModule],
  imports: [CommonModule, TranslateModule, NzToolTipModule, NzGridModule],
  providers: [NzModalService],
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  //public value: any = '';
  public valueFormatted: string = '';
  //value = '';
  encrypetdIds: { [key: string]: string } = {};
  
	closeResult: string;
  contacts = null;

  @Input() params: any;
  @Output() onDrawerCanClose= new EventEmitter<boolean>();
  //@Output() refreshTable = new EventEmitter<void>();


  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"

  constructor(
      private router: Router,
      private contactsService: ContactsService,
      private confirmationService: ConfirmationDialogService,    
      private encryptionService : EncryptionService,
    ) {}

  agInit(params: ICellRendererParams): void {
    //console.log(params.data);
    this.value = params.data;
    this.valueFormatted = params.data.actions!;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.data;
    this.valueFormatted = params.data.actions!;
    return true;
  }

  
    openDrawer(id?): void {
      this.router.navigate(['/filemanagment/'+this.encryptId(id)]);
      //console.log(id);
      //console.log(this.valueFormatted);
      /*const drawerRef = this.drawerService.create<
      FilemanagmentAddEditComponent,
        { value: string,
          id: number },
        string
      >({
        nzTitle: id ? 'Edit Contact' : 'Add Contact',
        nzWidth: '565px',
        nzBodyStyle: { value: "overflow: 'hidden'" },
        nzContent: FilemanagmentAddEditComponent,
        nzData: {
          value: this.value,
          id: id,
        },
      });
  
      drawerRef.afterOpen.subscribe(() => {
        
      });
  
      drawerRef.afterClose.subscribe((data) => {    
        if (typeof data === 'string') {
          this.value = data;
        }
      });*/
    }


    
   public encryptId(nId){
    if(this.encrypetdIds[nId]===undefined){
      this.encrypetdIds[nId]=encodeURIComponent( this.encryptionService.getIdEncrypted(nId));
      return this.encrypetdIds[nId]
    }else{
      return this.encrypetdIds[nId] ;
    }
    
  }
    

    public  deleteContact(id: string, content?): void {

      this.confirmationService.confirm('Are you sure you want to delete this?','This action cannot be undone. Deleting this contact will permanently remove it along with any screenings made.','Delete',"Cancel","lg").then((result) => {
        if(result==false){
          this.onDrawerCanClose.emit(false)
          this.valueChange.next("false");
        }else if(result==true){      
          this.contactsService.delete(id)
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
        this.router.navigate(['/filemanagments']);
    }
}
