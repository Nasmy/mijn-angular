import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Contact, Form, ResponseApi, Submission } from '@shared/models';
import { Router, ActivatedRoute, RouterModule} from '@angular/router';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormsService, ContactsService, SubmissionsService, AuthService, ConfirmationDialogService, EncryptionService } from '@shared/services';
//import { AccountService, FormsService, ContactsService,  SubmissionsService } from '@shared/services';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SignaturepadComponent} from '@shared/components/signaturepad/signaturepad.component'
import { contactType } from '@enums/contactType.enum';

@Component({
  selector: 'app-screenings-single',
  standalone: true,
  imports: [SignaturepadComponent,NzDrawerModule, NzIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatRadioModule, NzCollapseModule, NzButtonModule, RouterModule, NzDropDownModule, MatSelectModule,TranslateModule],
  templateUrl: './screenings-single.component.html',
  styleUrl: './screenings-single.component.scss'
})
export class ScreeningsSingleComponent {

  idEncoded!: string;
  fidEncoded!: string;
  sidEncoded!: string;
  fmEncoded!: number;
  formBuild: FormGroup;
  form;
  forms;
  contact;
  contacts;
  companyId;
  submission;
  parsed;
  state: string = 'in progress';
  licenseAML: number =0;
  usedSubmission: number =0;
  addMode: boolean = true;
  contactType=contactType;

  public arrComboModels: { [key: string]: number } = {};
  public keepOriginalOrder = (a, b) => a.key;

  @Input() valueChange: Subject<string>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService,
    private contactsService: ContactsService,
    private authService: AuthService,
    private submissionsService: SubmissionsService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationDialogService,
    //private toaster: ToastrService,
    private translate: TranslateService,
    private encriptionService: EncryptionService,
) {

  //this.licenseAML=this.authService.userValue.client.license_details.license_package.amount_aml;

}

isDrawerVisible = true;

ngOnInit(): void {
  
  this.idEncoded = this.route.snapshot.params['id'];
  this.fidEncoded = this.route.snapshot.params['fid'];
  this.sidEncoded = this.route.snapshot.params['sid'] ?? '';
  this.fmEncoded = this.route.snapshot.params['fmid'] ?? '';
  
  if (this.sidEncoded !== '') {
    this.addMode = false;
  }

  //} else {}
  //const sidEncoded = 1;

  this.getAllContacts();

  this.formBuild = this.formBuilder.group({
    // Fields added dynamicaly
  });

  /*if(idEncoded!=""){
    this.id=this.encryptionService.getIdDecrypted( decodeURIComponent(idEncoded));
  }   
  if(fidEncoded!=""){
    this.fid=this.encryptionService.getIdDecrypted( decodeURIComponent(fidEncoded));
  }*/



if (this.sidEncoded !== '') {

  this.submissionsService.getById(this.sidEncoded).subscribe(result => {

    this.submission = result;
    this.state = this.submission.status;
    
    this.companyId = result['company_id'];

    this.parsed = JSON.parse(this.submission.formData);


    this.contactsService.getById(this.submission.contactId).subscribe(result => {
      this.contact = result;

      //console.log(this.contact);
    });

    this.formsService.getById(this.submission.formId).subscribe(result => {
      this.form = result;

      //console.log(this.form);
      let formGroup = new FormGroup([]);



      this.form.formBlocks.forEach(block => {
        block.formBlockInputs.forEach(input => {

          this.formBuild.addControl(input.label, this.formBuilder.control(this.parsed[input.label], [Validators.required]));
          input.value = this.parsed[input.label];
          if(input.inputType=="Contact"){
            this.arrComboModels[input.label]=this.parsed[input.label].contactId;
          }

        });

      });

    });

  });

} else {

  
this.contactsService.getById(this.idEncoded).subscribe((result: ResponseApi<Form>) => {
  this.contact = result;
  this.companyId = result['company_id'];
});


this.formsService.getAllForms().subscribe((result: ResponseApi<Form>) => {
  this.forms = result;
})

this.formsService.getById(this.fidEncoded).subscribe((result: ResponseApi<Form>) => {
  this.form = result;
  //console.log(this.form);

  let formGroup = {};

  this.form.formBlocks.forEach(block => {
    block.formBlockInputs.forEach(input => {
      //console.log(input);
      //formGroup[input.label.replace(' ', '_')] = [''];
      formGroup[input.label] = [''];
      //this.formBuild = this.formBuilder.group(formGroup);
      //console.log(this.formBuild);
    });
    
  //console.log(formGroup);
  this.formBuild = this.formBuilder.group(formGroup);
  //console.log(this.formBuild);

  });
});

}
  
}


public getAllContacts() {
this.contactsService.getAllContacts().subscribe(result => {
  this.contacts = result;
});

}

onSubmit(state?:string) {

console.log(state);

this.submissionsService.getAllSubmissions().subscribe((result:Array<Submission>) => {
  //if(this.licenseAML>result.length) {

    //console.log(submission);
    //return false;
    
    if (this.addMode) {

      let submissionDate = new Date(Date.now());    
      const submission = {
        contactId: this.idEncoded, // Example contact ID
        formId: this.fidEncoded, // Example form ID
        company_id: this.companyId, // Example company_id
        submittedOn: submissionDate.toISOString(), // SubmittedOn
        formData: JSON.stringify(this.formBuild.value), // Convert form group data to JSON
        status: 'draft' // Convert form group data to JSON
      };


      this.submissionsService.createSubmission(submission).subscribe(
        (response) => {

          //console.log('Submission added.', response);

          this.confirmationService.confirm('Form Submitted Successfully!','The form has been successfully submitted and marked as "'+ this.state +'" in the screenings history. It will be used in making the final decision.','View Form',"Close","lg").then((result) => {
            if(result==false){
              //this.onDrawerCanClose.emit(false)
              //this.router.navigate(['/contacts/'], { relativeTo: this.route });
           
              if(this.fmEncoded!=undefined && this.fmEncoded.toString()!=""){
                let encodedId=this.encriptionService.getIdEncrypted(this.fmEncoded);
                this.router.navigate(['/filemanagment/'+encodeURIComponent(encodedId)]);
              }else{
                this.router.navigate(['/contacts/' + this.idEncoded + '/submission/' + this.fidEncoded + '/' + response.id], { relativeTo: this.route });
              }
            }else if(result==true){ 
              this.valueChange.next("false");
            }
        
            }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
            
        },
        (error) => {
          console.error('Form submission error:', error);
        }
      );
      
    } else {

      if (state !== '') {
        this.state = state;
      } else {
        this.state = this.submission.status;
      }

      let modalHead:string = '';
      let modalBody:string = '';
      let modalYes:string = '';
      let modalNo:string = '';

      if (this.state == 'draft') {
        modalHead = 'The form has been saved as a draft.';
        modalBody = 'You can find this draft in your screenings history, where you can edit it anytime. Would you like to see this message again in the future?';
        modalYes = 'Leave';
        modalNo = 'Continue Editing';
      } else if (this.state == 'pass') {
        modalHead = 'The client is accepted.';
        modalBody = 'The form has been successfully completed, and the client has been accepted. No further edits can be made.';
        modalYes = 'Close';
        modalNo = 'View Form';
      } else if (this.state == 'not accepted') {
        modalHead = 'The client is not accepted.';
        modalBody = 'The form has been successfully completed, and the client has been not accepted. No further edits can be made.';
        modalYes = 'Close';
        modalNo = 'View Form';
      } else {
        modalHead = 'Form Submitted Successfully!';
        modalBody = 'The form has been successfully submitted and marked as "in-progress" in the screenings history. It will be used in making the final decision.';
        modalYes = 'Close';
        modalNo = 'View Form';
      }

      //console.log(this.state);

      let submissionDate = new Date(Date.now());

      const submission = {
        id: this.sidEncoded,
        contactId: this.submission.contactId, // Example contact ID
        formId: this.submission.formId, // Example form ID
        company_id: this.companyId, // Example company_id
        submittedOn: submissionDate.toISOString(), // SubmittedOn
        formData: JSON.stringify(this.formBuild.value), // Convert form group data to JSON
        status: this.state // Convert form group data to JSON
      };
    
      //console.log(submission);
      //return false;
    
      this.submissionsService.updateSubmission(this.sidEncoded, submission).subscribe(
        (response) => {
        
          console.log('Submission updated successfully:', response);

          this.confirmationService.confirm(modalHead, modalBody, modalYes, modalNo, "lg").then((result) => {
            if(result==false){
              //this.onDrawerCanClose.emit(false)
              //this.router.navigate(['/contacts/'], { relativeTo: this.route });
              
              if (this.state == 'draft') {
                this.valueChange.next("false");
              } else {
                
                if(this.fmEncoded!=undefined && this.fmEncoded.toString()!=""){
                  let encodedId=this.encriptionService.getIdEncrypted(this.fmEncoded);
                  this.router.navigate(['/filemanagment/'+encodeURIComponent(encodedId)]);
                }else{
                  this.router.navigate(['/contacts/' + this.idEncoded + '/submission/' + this.fidEncoded + '/' + this.sidEncoded], { relativeTo: this.route });
                }
              }

            } else if (result==true){ 

              if (this.state == 'draft') {
                
                if(this.fmEncoded!=undefined && this.fmEncoded.toString()!=""){
                  let encodedId=this.encriptionService.getIdEncrypted(this.fmEncoded);
                  this.router.navigate(['/filemanagment/'+encodeURIComponent(encodedId)]);
                }else{
                  this.router.navigate(['/contacts'], { relativeTo: this.route });
                }
              } else {
                this.valueChange.next("false");
              }

            }
        
            }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

          //this.addEdit();
          //this.toaster.success('Submission saved');
          //this.router.navigate(['/contacts/'+ this.idEncoded +'/submission/'+ this.fidEncoded +'/'+ this.sidEncoded], { relativeTo: this.route });
          //this.router.navigate(['/general/contacts/submissions'], { relativeTo: this.route });
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    }

  //}else{
    //this.toaster.error(this.translate.instant("License exceeded maximum number of AML"))
  //}
});

}


onFieldsChange(event,label){

  let ContactForm = this.contacts.find(elem=>{return elem.contactId==event.target.value});
  if(ContactForm!=undefined){
    this.formBuild.controls[label].setValue(ContactForm)
    this.arrComboModels[label]=ContactForm.contactId;
  }else{
    this.formBuild.controls[label].setValue("/")
  }

}

reloadComponent(fid?) {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/contacts/' + this.idEncoded + '/submission/' + fid]);
}

onCancel(){
  if(this.fmEncoded!=undefined && this.fmEncoded.toString()!=""){
    let encodedId=this.encriptionService.getIdEncrypted(this.fmEncoded);
    this.router.navigate(['/filemanagment/'+encodeURIComponent(encodedId)]);
  }else{
    this.router.navigate(['/contacts/']);
  }  
}

}
