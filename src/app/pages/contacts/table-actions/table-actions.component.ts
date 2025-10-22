import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
//import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ContactsDrawerComponent } from '../contacts-drawer/contacts-drawer.component';
import { ScreeningsListComponent } from '../screenings-list/screenings-list.component';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
//import { ContactsService, FormsService, EncryptionService } from '@shared/services';
import { ContactsService, EncryptionService, ConfirmationDialogService, AlertService } from '@shared/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
  selector: 'app-table-actions',
  standalone: true,
  //imports: [NzGridModule,CommonModule],
  imports: [CommonModule, TranslateModule, NzGridModule],
  providers: [NzModalService],
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  //public value: any = '';
  public valueFormatted: string = '';
  //value = '';
  
	closeResult: string;
  contacts = null;

  @Input() params: any;
  @Output() onDrawerCanClose= new EventEmitter<boolean>();
  //@Output() refreshTable = new EventEmitter<void>();


  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"

  constructor(
      private router: Router,
      private drawerService: NzDrawerService,
      private modalZService: NzModalService,
      private contactsService: ContactsService,
      private modalService: NgbModal,
      private changeDetect: ChangeDetectorRef,
      private confirmationService: ConfirmationDialogService,
      private alertService: AlertService,
      private translateService: TranslateService,

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
      //console.log(id);
      //console.log(this.valueFormatted);
      const drawerRef = this.drawerService.create<
      ContactsDrawerComponent,
        { value: string,
          id: number },
        string
      >({
        nzTitle: id ? 'Edit Contact' : 'Add Contact',
        nzWidth: '565px',
        nzBodyStyle: { value: "overflow: 'hidden'" },
        //nzFooter: 'Footer',
        //nzExtra: 'Extra',
        nzContent: ContactsDrawerComponent,
        /*nzContentParams: {
          value: this.value,
        },*/
        nzData: {
          value: this.value,
          id: id,
        },
      });
  
      drawerRef.afterOpen.subscribe(() => {
        //console.log('Drawer(Component) open');
      });
  
      drawerRef.afterClose.subscribe((data) => {
        //console.log(data);
        if (typeof data === 'string') {
          this.value = data;
        }
      });
    }

    showModal(id): void {
      //console.log(this.value);

      this.modalZService.create({
        nzTitle: this.value['name'] + "'s Screenings",
        nzContent: ScreeningsListComponent,
        nzWidth: '800px',
        nzData: {
          value: this.value,
          id: id,
        },
        nzFooter: []
      });
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
              //this.refreshTable.emit();
              //this.router.navigateByUrl('/contacts');

              this.reloadComponent();
              //this.refresh(true);
              //this.contacts = this.contacts.filter(x => x.id !== id);
              //this.getAll();
            });    
        }
    
        }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      
      }

      reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/contacts']);
    }
}
