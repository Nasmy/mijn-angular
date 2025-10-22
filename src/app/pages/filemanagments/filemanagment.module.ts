import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilemanagmentMainComponent } from './filemanagment-main/filemanagment-main.component';
import { FilemanagmentIndividualComponent } from './filemanagment-individual/filemanagment-individual.component';
import { FilemanagmentAllComponent } from './filemanagment-all/filemanagment-all.component';
import { FileManagmentRoutingModule } from './filemanagment.routes';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CopyIconDefinition, DownloadIconDefinition, MoreCreditsIconDefinition, TrashCustomDefinition } from '../../../assets/img/icons/custom-icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition,MoreCreditsIconDefinition,TrashCustomDefinition];

@NgModule({
  declarations: [],
  imports: [
    FilemanagmentIndividualComponent,    
    FilemanagmentMainComponent,    
    FilemanagmentAllComponent,    
    CommonModule,
    FileManagmentRoutingModule,  
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
  ],
  
  exports: [
    FilemanagmentMainComponent,
    FilemanagmentIndividualComponent,
    FilemanagmentAllComponent
  ],
})
export class FileManagmentModule { 
  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }

}
