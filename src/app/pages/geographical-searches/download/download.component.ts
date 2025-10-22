import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { NzIconService,NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

import { CopyIconDefinition, DownloadIconDefinition } from '../../../../assets/img/icons/custom-icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RequestsService } from '@services/requests.service';
// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition];

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [NzIconModule,CommonModule,NzGridModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss'
})
export class DownloadComponent {  
  public columnData: any;
  public defFoto:string = "";


  constructor(
    private iconService: NzIconService,
    private requestsService: RequestsService,
  ){
    this.iconService.addIcon(...CUSTOM_ICONS);  
  }


  agInit(params: ICellRendererParams): void {
    this.columnData = params.data;    
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  download(){
    this.requestsService.downloadDocuments(this.columnData?.folder).subscribe(data => {
      if(data!=null){
        const blob = new Blob([data], {
          type: 'application/zip'
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = this.columnData?.folder;
        // start download
        a.click();
      }
    })
  }
}
