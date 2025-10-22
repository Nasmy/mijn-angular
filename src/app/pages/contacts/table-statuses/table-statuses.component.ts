import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ResponseApi, Contact, Submission } from '@shared/models';
import { ContactsService, SubmissionsService } from '@shared/services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-statuses',
  standalone: true,
  imports: [NzIconModule, CommonModule, TranslateModule],
  templateUrl: './table-statuses.component.html',
  styleUrl: './table-statuses.component.scss'
})
export class TableStatusesComponent {

  public valueFormatted: string = '';  
  submissions;
  submissionStatus;
  submissionDate;
  
  constructor(
    private contactsService: ContactsService,
    private submissionsService: SubmissionsService,
    private translateService: TranslateService,
  ) {
  
      this.getAll();
  
    }
  
    public getAll() {
  
      this.submissionsService.getAllSubmissions().subscribe((result:Array<Submission>) => {
  
        this.submissions = result.filter((person) => person.contactId == Number(this.valueFormatted));
        
        //this.usedSubmission=result.length;

        this.submissionStatus = this.submissions[this.submissions.length-1];
        this.submissionDate = this.submissionStatus.submittedOn;
        this.submissionStatus = this.submissionStatus.status;

        //console.log(this.submissionStatus);
  
      });
  
    }

  agInit(params: ICellRendererParams): void {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.status;
  }

  refresh(params: ICellRendererParams): boolean {
    //this.value = params.data.statusCode;
    this.valueFormatted = params.data.email;
    return true;
  }

}
