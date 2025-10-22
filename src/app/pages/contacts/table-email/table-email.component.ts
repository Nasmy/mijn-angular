import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
//import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-email.component.html',
  styleUrl: './table-email.component.scss'
})
export class TableEmailComponent {
  //public value: any = '';
  public valueFormatted: string = '';

  agInit(params: ICellRendererParams): void {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.email;
  }

  refresh(params: ICellRendererParams): boolean {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.email;
    return true;
  }
}
