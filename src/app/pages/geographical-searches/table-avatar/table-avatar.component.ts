import { Component } from '@angular/core';
//import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-avatar',
  standalone: true,
  imports: [NzGridModule,CommonModule],
  templateUrl: './table-avatar.component.html',
  styleUrl: './table-avatar.component.scss'
})
export class TableAvatarComponent {
  public columnData: any;
  public defFoto:string = "";
  agInit(params: ICellRendererParams): void {
    this.columnData = params.data;

  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert("clicked");
  }
}


