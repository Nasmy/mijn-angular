import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-mp-confirmation',
  standalone: true,
  imports: [
    TranslateModule,
    NzIconModule,
    NzGridModule,
    CommonModule,
    
  ],
  providers:[NzModalService],
  templateUrl: './mp-confirmation.component.html',
  styleUrls: ['./mp-confirmation.component.scss']
})
export class MpConfirmationComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() icon: string;

  constructor(
    private activeModal: NgbActiveModal
    //private modal: NzModalService
    //private modalService: NgbModal, 
    
  ) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  get IconTitle(): string {

    if(this.icon!=undefined && this.icon!=""){
      return this.icon;
    }else{

      return "fa fa-trash";
    }
  }
}
