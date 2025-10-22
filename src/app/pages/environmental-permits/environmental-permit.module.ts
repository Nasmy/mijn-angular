import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EnvironmentalPermitMainComponent } from './environmental-permit-main/environmental-permit-main.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { EnvironmentalPermitRoutingModule } from './environmental-permit.routes';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { CopyIconDefinition, DownloadIconDefinition, MoreCreditsIconDefinition, TrashCustomDefinition } from '../../../assets/img/icons/custom-icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { EnvironmentalpermitTableComponent } from './environmentalpermit-table/environmentalpermit-table.component';
import { EnvironmentalpermitTableArchiveComponent } from './environmentalpermit-table-archive/environmentalpermit-table-archive.component';

// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition,MoreCreditsIconDefinition,TrashCustomDefinition];

@NgModule({
  declarations: [ ],
  imports: [
    EnvironmentalPermitMainComponent,    
    EnvironmentalpermitTableComponent,
    EnvironmentalpermitTableArchiveComponent,
    MapViewerComponent,
    CommonModule,
    EnvironmentalPermitRoutingModule,  
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
    MatMomentDateModule,
    MatNativeDateModule

  ],
  providers: [
     { provide: DatePipe}, 
  ],
  exports: [MapViewerComponent],
})
export class EnvironmentalPermitModule { 
  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }

}
