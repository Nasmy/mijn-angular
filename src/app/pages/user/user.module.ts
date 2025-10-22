import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routes';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { CopyIconDefinition, DownloadIconDefinition } from '../../../assets/img/icons/custom-icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,  
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
  ],
  
  exports: [
  ],
})
export class UserModule { 
  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }

}
