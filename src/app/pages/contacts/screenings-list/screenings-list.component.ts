import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ResponseApi, Contact, Submission } from '@shared/models';
import { ContactsService, SubmissionsService} from '@shared/services';
//import { ScreeningsSingleComponent } from '../screenings-single/screenings-single.component';
import { ScreeningsPreviewComponent } from '../screenings-preview/screenings-preview.component';
import { FormSelectorComponent } from '../form-selector/form-selector.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-screenings-list',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, CommonModule, RouterModule, NzIconModule, TranslateModule],
  templateUrl: './screenings-list.component.html',
  styleUrl: './screenings-list.component.scss'
})
export class ScreeningsListComponent {

  
  contacts = null;
  forms;
  formSelector;
  submissions;
  licenseAML:number =0;
  usedSubmission:number =0;
  nzData: { value: string, filemanagment_id:number } = inject(NZ_MODAL_DATA);

  constructor(
    private modal: NzModalRef,
    private modalZService: NzModalService,
    private submissionsService: SubmissionsService,
    private translateService: TranslateService,
    //private router: Router,
  ) {

    //console.log(this.nzData.value);

    this.getAll();

  }

  public getAll() {

    this.submissionsService.getAllSubmissions().subscribe((result:Array<Submission>) => {

      this.submissions = result.filter((person) => person.contactId == this.nzData.value["actions"]);

      this.usedSubmission=result.length;
      console.log(this.submissions);

    });

  }

  startScreening(val): void {

    //console.log(this.value);
    this.modal.destroy();
    this.modalZService.create({
      nzTitle: this.translateService.instant("Select a form template"),
      nzContent: FormSelectorComponent,
      //nzWidth: '800px',
      nzData: {
        value: val,
      },
      //nzFooter: "modalFooter"
    });
  }
  
  previewScreening(id, title, status?): void {
    //console.log(this.value);
    this.modal.destroy();
    this.modalZService.create({
     
      //nzTitle: title+ 'test <small class="text-warning"> ' + this.translateService.instant("Status")+ ': '+ this.translateService.instant(status) +'</small>',
      nzContent: ScreeningsPreviewComponent,
      nzWidth: '700px',
      nzData: {
        title: title,
        id: id,
        status: status,
      },
      nzFooter: []
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
