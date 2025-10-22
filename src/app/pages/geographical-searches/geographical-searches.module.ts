import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeographicalSearchesTableComponent } from './geographical-searches-table/geographical-searches-table.component';
import { GeographicalSearchesRoutingModule } from './geographical-searches.routes';
import { AddRequestMainComponent } from './add-request-main/add-request-main.component';
import { TableStatusComponent } from './table-status/table-status.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { CopyIconDefinition, DownloadIconDefinition, MoreCreditsIconDefinition, TrashCustomDefinition } from '../../../assets/img/icons/custom-icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';

// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition,MoreCreditsIconDefinition,TrashCustomDefinition];

@NgModule({
  declarations: [],
  imports: [
    GeographicalSearchesTableComponent,
    AddRequestMainComponent,
    TableStatusComponent,
    CommonModule,
    GeographicalSearchesRoutingModule,  
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
    MatMomentDateModule,
    MatNativeDateModule

  ],
  exports: [GeographicalSearchesTableComponent,TableStatusComponent],
})
export class GeographicalSearchesModule { 
  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }

}
