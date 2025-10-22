import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsIndividualTableComponent } from './contacts-individual-table/contacts-individual-table.component';
import { ContactsCompaniesTableComponent } from './contacts-companies-table/contacts-companies-table.component';
import { ContactsRoutingModule } from './contacts.routes';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { CopyIconDefinition, DownloadIconDefinition } from '../../../assets/img/icons/custom-icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition];

@NgModule({
  declarations: [],
  imports: [
    ContactsIndividualTableComponent,
    ContactsCompaniesTableComponent,
    CommonModule,
    ContactsRoutingModule,  
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
  ],
  
  exports: [
    ContactsIndividualTableComponent,
    ContactsCompaniesTableComponent
  ],
})
export class ContactsModule { 
  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }

}
