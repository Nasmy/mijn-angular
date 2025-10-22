import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
//import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-phone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-phone.component.html',
  styleUrl: './table-phone.component.scss'
})
export class TablePhoneComponent {
  //public value: any = '';
  public valueFormatted: string = '';

  agInit(params: ICellRendererParams): void {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.phone;
  }

  refresh(params: ICellRendererParams): boolean {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.phone;
    return true;
  }
}
