import { Component, Input, Output, EventEmitter, Inject, Injector, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ResponseApi, Contact } from '@shared/models';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ContactsService, AlertService, EncryptionService } from '@shared/services';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../geographical-searches/add-request-klim/add-request-klim.component';
import { contactType } from '@enums/contactType.enum';

@Component({
  selector: 'app-contacts-drawer',
  standalone: true,
  imports: [
      TranslateModule,
      FormsModule,  
      ReactiveFormsModule,
      CommonModule,
      MatInputModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatDatepickerModule,
      NzDrawerModule,
      NzDatePickerModule, 
      NzFormModule, 
      NzInputModule, 
      NzSelectModule,
      NzTabsModule,
      NzDividerModule,
      MatNativeDateModule,
      NzImageModule,
      MatMomentDateModule,
      MatNativeDateModule
    ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    provideNativeDateAdapter(),
    /*{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}*/
  ],
  templateUrl: './contacts-drawer.component.html',
  styleUrl: './contacts-drawer.component.scss'
})
export class ContactsDrawerComponent {

  public form: FormGroup | undefined; 
  get f() { return this.form.controls; }
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  contact;
  oContact: Contact;
  visible = false;
  value;
  contactType = contactType; // 

  date = new Date();

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  @Output() refreshTable = new EventEmitter<void>();
  nzData: { value: string, outside: boolean } = inject(NZ_DRAWER_DATA);

  constructor(
    //private accountService: AccountService,
    //private iconService: NzIconService,
    //private drawerService: NzDrawerService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private contactsService: ContactsService,
    private alertService: AlertService,
    private drawerRef: NzDrawerRef<string>,
    private changeDetect: ChangeDetectorRef
  ) {
    //this.iconService.addIcon(...CUSTOM_ICONS);
    
    //this.accountService.checkRoute('contacts');

    const emailValidator = [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')];

    this.form = this.formBuilder.group({
      contactId:[],
      contactType: [contactType.Individual],
      name: ['', Validators.required],
      lastName: [''],
      birthPlace:[''],
      birthDate:[this.date.toJSON()],
      legalForm:[''],
      foundingDate:[this.date.toJSON()],
      vatNumber:[''],
      street:[''],
      streetNumber:[''],
      bus:[''],
      zip:[''],
      city:[''],
      country:[''],
      email: ['', emailValidator],
      phone:[''],
      fax:[''],
      gsm:[''],
      url:[''],
      nationality:[''],
      activity:[''],
      street2:[''],
      streetNumber2:[''],
      bus2:[''],
      zip2:[''],
      city2:[''],
      country2:[''],
      email2:[''],
      phone2:[''],
      fax2:[''],
      gsm2:[''],
      url2:[''],
  });

  //this.id = this.nzData.value.;
  console.log(this.nzData.value);

  //this.form.controls['name'].setValue(this.nzData.value['name']);

    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('nl');

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang?.match(/en|nl/) ? browserLang : 'nl');
  }

  
  ngOnInit(): void {
    console.log(this.submitted);
    //throw new Error('Method not implemented.');
    
    //const idEncoded = this.route.snapshot.params['id'];
    /*if(idEncoded!=""){
      this.id=this.encryptionService.getIdDecrypted( decodeURIComponent(idEncoded));   
    }*/   
    
      this.isAddMode = !this.id;
      //console.log(this.isAddMode);


  if (!this.isAddMode)
    {   
      this.contactsService.getById(this.id).subscribe((result: ResponseApi<Contact>) => {
        this.contact = result;
        this.form.patchValue(this.contact);
        console.log(this.form)
      });

   } else {
       this.oContact = new Contact();
       this.form.reset();
       this.form.get('contactType').setValue(contactType.Individual);
       this.form.get('birthDate').setValue(this.date.toJSON());
       this.form.get('foundingDate').setValue(this.date.toJSON());

   }

  }

  private createUser() {

    this.contactsService.create(this.form.value)
        .pipe(first())
        .subscribe({
            next: (usr: ResponseApi<any> ) => {
                this.alertService.success(this.translate.instant('Contact added successfully'), { keepAfterRouteChange: true, autoClose: true });

                this.submitted = true;
                this.changeDetect.detectChanges();
                this.resetContactForm();
                this.contactsService.notifyContactAdded();
                
                if (this.nzData.outside) {
                  this.reloadComponent();
                }

            },
            error: oError => {
                this.alertService.error(oError);
                //this.toaster.error(this.translate.instant(oError), this.translate.instant('Error'));
                this.loading = false;
                //this.scrollIntoView();
            }
        });

}

private updateUser() {
 console.log(this.form.value);
  this.contactsService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: (usr: ResponseApi<any> ) => {
                this.alertService.success(this.translate.instant('Update successful'), { keepAfterRouteChange: true, autoClose: true });
                //this.toaster.success(this.translate.instant('Update successful'), this.translate.instant('Save'));
                //this.scrollIntoView();
                //console.log(usr);

                this.submitted = true;
                this.changeDetect.detectChanges();

                this.contactsService.notifyContactAdded();

                if (this.nzData.outside) {
                  this.reloadComponent();
                }

            },
            error: oError => {
                this.alertService.error(oError);
                //this.toaster.error(this.translate.instant(oError), this.translate.instant('Error'));
                this.loading = false;
                //this.scrollIntoView();
            }
        });
}

 onSubmit() {
   //this.submitted = true;

   // reset alerts on submit
   this.alertService.clear();

   // stop here if form is invalid
   if (this.form.invalid) {
       return;
   }

   //this.loading = true;
   if (this.isAddMode) {
       this.createUser();
   } else {
       this.updateUser();
   }



}

closed() {
  this.drawerRef.close();
}

  onClose(): void {
    const canClose = confirm('Do you really want to close the drawer?');
    if (canClose) {
      this.visible = false; // Allow closing
    }
    // If canClose is false, do nothing to prevent the drawer from closing
  }

  
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contacts']);
  }

  contactTypeFunc(t): void {
    //console.log(t);
    this.form.controls['contactType'].setValue(t);
    //console.log(this.form.controls['contactType']);
  }
  
  resetContactForm(){
    this.form.reset();
  }

  get getSelectedContactType(): number {
   switch(this.f['contactType'].value){
    case contactType.Company:
      return 1;
    case contactType.Individual:
      return 0;
    default:
      return 0;  
   }
  }

}
