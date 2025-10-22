import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContactsService, FormsService, EncryptionService } from '@shared/services';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-form-selector',
  standalone: true,
  imports: [FormsModule, NzModalModule, NzButtonModule, TranslateModule],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent {

  forms;
  formSelector;
  nzData: { value: string } = inject(NZ_MODAL_DATA);

  constructor(
    //private accountService: AccountService,
    private modal: NzModalRef,
    private formsService: FormsService,
    private router: Router,
    ) {

      this.formSelector = '';

      this.formsService.getAllForms().subscribe( res => {
        this.forms = res;
        console.log(this.forms);
      });

      //this.accountService.checkRoute('contacts');
    }

    public formChooser(id: string): void {

      console.log(this.formSelector);
      //return false;
      this.destroyModal();
      this.router.navigateByUrl('/contacts/'+id+'/submission/'+this.formSelector.id);
    }

    destroyModal(): void {
      this.modal.destroy();
    }


}
