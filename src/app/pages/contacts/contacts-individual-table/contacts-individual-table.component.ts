import { Component, OnInit } from '@angular/core';
import { Contact } from '@models/contact.model';
import { ContactArray } from '@models/contactArray.model';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { ContactsService } from '@services/contacts.service';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import '@extension/date.extensions';
import { Subject } from 'rxjs';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableStatusesComponent } from '../table-statuses/table-statuses.component';
import { TableEmailComponent } from '../table-email/table-email.component';
import { TablePhoneComponent } from '../table-phone/table-phone.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { contactType } from '@enums/contactType.enum';

interface IRow {
  name: string;
  vatNumber: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  actions: string;
}

@Component({
  selector: 'app-contacts-individual-table',
  standalone: true,
  imports: [AgGridAngular, TranslateModule],
  templateUrl: './contacts-individual-table.component.html',
  styleUrls: ['./contacts-individual-table.component.scss']
})
export class ContactsIndividualTableComponent {
 //private arrcontactsSubject=new Subject<ContactArray>();
 private arrcontactsSubject;
  private user: User | undefined;
  //rowData: any[] = [];
  rowData;
  public paginationPageSize = 50;
  public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];

  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  };

  constructor(
            private authService: AuthService,
            private contactsService: ContactsService,
            private translateService: TranslateService,
          ){}


  ngOnInit(): void {

    this.user= this.authService.userValue;

    this.authService.loadSecurityByCompanyId(this.user.client_id).then(data=>{
      //console.log(data);
    });

    //this.reloadContacts();

    this.contactsService.getAllContacts().subscribe((data:Array<any>)=>{
      this.rowData = data.filter(person => person.contactType === contactType.Individual).map(person => (
        {
        name: `${person.name} ${person.lastName ? person.lastName : ''}`,
        vatNumber: `${person.vatNumber ? person.vatNumber : ''}`,
        address: `${person.street ? person.street : ''} ${person.streetNumber ? person.streetNumber : ''}`,
        email: `${person.email ? person.email : ''}`,
        phone: `${person.phone ? person.phone : ''}`,
        status: `${person.contactId}`,
        actions: `${person.contactId}`,
        }));

    })

    /*this.arrcontactsSubject.subscribe(data=>{
     console.log(data);

     this.rowData = data;

      //this.arrRequestValue=data;
      this.rowData = Array(data).map(contact=>({
        //return {
          name: contact.name + ' ' + contact.lastName,
          vatNumber: contact.vatNumber,
          address: contact.street + ' ' + contact.streetNumber,
          email: contact.email,
          phone:contact.phone,
          status: contact.activity,
          actions: contact.contactType
        //}
      }));
      
      console.log(this.rowData);

    })*/
  }


// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef<any>[] = [
  //{ field: "user", cellRenderer: TableAvatarComponent,},
  { field: "name", headerName: this.translateService.instant("name")},
  { field: "vatNumber", headerName: this.translateService.instant("ID Number") },
  { field: "address", headerName: this.translateService.instant("address") },
  { field: "email", headerName: this.translateService.instant("email"), cellRenderer: TableEmailComponent },
  { field: "phone", headerName: this.translateService.instant("phone"), cellRenderer: TablePhoneComponent },
  { field: "status", headerName: this.translateService.instant("Screenings Status"), cellRenderer: TableStatusesComponent},
  { field: "actions", headerName: '',  cellRenderer: TableActionsComponent, floatingFilter: false, filter: false, width: 50},
];

  private reloadContacts(type){
    //this.loadAllContacts();

    console.log(type);

    this.contactsService.getAllContacts().subscribe((data:Array<any>)=>{
      this.rowData = data.map(person => (
        person.contactType==contactType.Individual ?
        {
        name: `${person.name} ${person.lastName ? person.lastName : ''}`,
        vatNumber: `${person.vatNumber}`,
        address: `${person.street} ${person.streetNumber}`,
        email: `${person.email}`,
        phone: `${person.phone}`,
        status: `${person.activity}`,
        actions: `${person.contactId}`,
        } : {

      }));

    })
    
  }

  
private loadAllContacts(){
  this.contactsService.getAllContacts().subscribe((data: ContactArray)=>{
    //this.arrcontactsSubject.next(data);
    this.arrcontactsSubject = data;
    //this.rowData=data;
    //console.log(data);
  })
}

}

