import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { ContactsIndividualTableComponent } from '../contacts-individual-table/contacts-individual-table.component'
import { ContactsCompaniesTableComponent } from '../contacts-companies-table/contacts-companies-table.component'
import { ContactsDrawerComponent } from '../contacts-drawer/contacts-drawer.component';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { INITIAL_GRID_OPTION_KEYS } from 'ag-grid-community/dist/types/src/gridOptionsInitial';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzSegmentedModule, NzSegmentedOptions } from 'ng-zorro-antd/segmented';
ModuleRegistry.registerModules([AllCommunityModule]);

import { CalendarCustomDefinition, CopyIconDefinition, DownloadIconDefinition, MapCustomDefinition } from '../../../../assets/img/icons/custom-icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition, CalendarCustomDefinition, MapCustomDefinition];

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { PageTittleService } from '@shared/services';

@Component({
  selector: 'app-contacts-main',
  standalone: true,
  imports: [
    ContactsIndividualTableComponent,
    ContactsCompaniesTableComponent,
    ContactsDrawerComponent,
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    TranslateModule,
    NzSegmentedModule,
    FormsModule,
    NzDrawerModule, 
    NzDatePickerModule, 
    NzFormModule, 
    NzInputModule, 
    NzSelectModule,
    NzTabsModule,
    NzDividerModule
  ],  // Add any necessary imports here.
  templateUrl: './contacts-main.component.html',
  styleUrls: ['./contacts-main.component.scss']
})

export class ContactsMainComponent {

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = '';
  

public selectedOption:number=0;

  
 

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(
    private iconService: NzIconService,
    private drawerService: NzDrawerService,
    public translate: TranslateService,
    private pageTitleService:PageTittleService,
  ) {
    this.iconService.addIcon(...CUSTOM_ICONS);
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('nl');
    this.pageTitleService.settitle("Contacts");


    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang?.match(/en|nl/) ? browserLang : 'nl');
  }

  options: NzSegmentedOptions = [
     this.translate.instant('Individual'),  this.translate.instant('Company')
  ];

  valueChanged(event){
    console.log(event)
    this.selectedOption = event;
  }

  openDrawer(): void {
    
    //const valueChange = new Subject<string>();   

    const drawerRef = this.drawerService.create<
    ContactsDrawerComponent,
      //{ valueChange: number, value: string },
      { value: string,
        outside: boolean
       },
      string
    >({
      nzTitle: this.translate.instant('Add Contact'),
      nzWidth: '565px',
      nzBodyStyle: { value: "overflow: 'hidden'" },
      //nzFooter: 'Footer',
      //nzExtra: 'Extra',
      nzContent: ContactsDrawerComponent,
      nzContentParams: {
        //valueChange: this.valueChanged,
        value: this.value,
        outside: false
      },
      nzData: {
        value: 'Ng Zorro',
        outside: false
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe((data) => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}
