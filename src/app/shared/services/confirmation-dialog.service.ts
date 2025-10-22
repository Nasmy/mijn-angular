import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MpConfirmationComponent } from '@shared/components/modals/mp-confirmation/mp-confirmation.component'

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(
    private modalService: NgbModal, 
    private translateService: TranslateService,
  ) { }

  public confirm(
    title: string,
    message: string,
    btnOkText = 'OK',
    btnCancelText = 'Cancel',
    dialogSize: 'sm'|'lg' = 'lg',
    centered: true | false=true,
    backdrop: true | false=true,
    iconHeader:string=""): Promise<boolean> {    
    const modalRef = this.modalService.open(MpConfirmationComponent, { size: dialogSize, centered: centered, backdrop: backdrop });
    modalRef.componentInstance.title = this.translateService.instant(title);
    modalRef.componentInstance.message = this.translateService.instant(message);
    modalRef.componentInstance.btnOkText =this.translateService.instant( btnOkText);
    modalRef.componentInstance.btnCancelText = this.translateService.instant(btnCancelText);
    modalRef.componentInstance.icon = iconHeader;
    return modalRef.result;
  }

}
