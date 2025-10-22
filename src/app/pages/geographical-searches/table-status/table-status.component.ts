import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-status',
  standalone: true,
  imports: [NzGridModule,CommonModule],
  templateUrl: './table-status.component.html',
  styleUrl: './table-status.component.scss'
})
export class TableStatusComponent {
  public value: any = '';
  public valueFormatted: string = '';

  agInit(params: ICellRendererParams): void {
    this.value = params.data.statusCode;
    this.valueFormatted = params.data.status!;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.data.statusCode;
    this.valueFormatted = params.data.status!;
    return true;
  }
}
