import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
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
import { FilemanagmentIndividualComponent } from "../filemanagment-individual/filemanagment-individual.component";
import { FilemanagmentAllComponent } from "../filemanagment-all/filemanagment-all.component";
import { PageTittleService } from '@shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filemanagment-main',
  standalone: true,
  imports: [
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
    NzDividerModule,
    FilemanagmentIndividualComponent,
    FilemanagmentAllComponent
],
  templateUrl: './filemanagment-main.component.html',
  styleUrls: ['./filemanagment-main.component.scss']
})
export class FilemanagmentMainComponent implements OnInit {
  selectedOption
  options: NzSegmentedOptions = [
    this.translate.instant('Individual'), this.translate.instant('All')
  ];

  constructor(
    public pageTitleService:PageTittleService,
    public translate: TranslateService,
    private router: Router,
    private translateService: TranslateService,
  ){
    
  }


  ngOnInit(): void {
    //this.selectedOption;
    this.pageTitleService.settitle(this.translateService.instant("File Management"));
    
  }


  valueChanged(event){

  }


  AddFileManagment(){
    this.router.navigate(['/filemanagment/add']);
  }



}
