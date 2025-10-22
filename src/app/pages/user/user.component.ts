import { Component, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTittleService, AuthService, AlertService, ConfirmationDialogService } from '@shared/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Combo, Company, ResponseApi, User } from '@shared/models';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '@env/environment';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ImageCropperComponent } from '@shared/components/image-cropper/image-cropper.component';
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QRCodeComponent } from 'angularx-qrcode';

import { Settings2faComponent } from './settings2fa/settings2fa.component';
import { Color } from '@helpers/color';
//import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    NzButtonModule,
    CommonModule,
    NzAvatarModule,
    MatInputModule,
    NzFormModule,
    ReactiveFormsModule,
    MatIconModule,
    NzIconModule,
    MatSelectModule,
    NgxDropzoneModule,
    QRCodeComponent
  ],
  providers: [NzModalService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  @ViewChild("twofactorsetup", { static: false }) twofactorsetup: TemplateRef<any>;
  @ViewChild("twofactorreset", { static: false }) twofactorreset: TemplateRef<any>;
  private _loadingAddEdit: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  //private _loadingAddEdit: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  //public loadingAddEdit: Observable<boolean>=this._loadingAddEdit.asObservable();
  public qrcode: string="";
  public sharedKey: string="";
  public closeResult: string;
  public submitted2fa:boolean=false;
  public twofaSuccessEnabled:boolean=false;
  public ontwofactorenable:boolean=false;
  public recoveryCodes:Array<string>=[];
  public resetAuthKey:boolean=false;
  public resetSuccess:boolean=false;

  public form: FormGroup | undefined; 
  public form2fa: FormGroup | undefined;
  public pwdForm: FormGroup | undefined;

  get f() { return this.form.controls; }
  get pwdf() { return this.pwdForm.controls; }

  hide = true;
  passwordConditions = {
    hasLetter: false,
    hasUppercase: false,
    hasNumber: false,
    hasMinLength: false,
  };

  arrModules: { [key: string]: number } = {};
  
   constructor(
      public translate: TranslateService,
      private pageTitleService:PageTittleService,
      private formBuilder: FormBuilder,
      private accountService: AuthService,
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private changeDetect: ChangeDetectorRef,
      public dialog: MatDialog,
      private modalZService: NzModalService,
      private modalService: NgbModal,
      private confirmationDialogService: ConfirmationDialogService,
    ) {
        translate.addLangs(['en', 'fr', 'nl']);
        translate.setDefaultLang('nl');
        this.pageTitleService.settitle("Profile");
    
    
        const emailValidator = [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')];

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang?.match(/en|nl/) ? browserLang : 'nl');
        
        
        this.loadSecurityModules();
        this.getUserAccess();
    }

    hideOldPwd; hideNewPwd; hideConfPwd;
    files: File[] = [];
    
    id!: string;
    initials!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    // image
    fileToUpload: File | null = null;
    imageUrl = '';
    oUser: User;
    oUserAccess: any;

    public defFoto = '../../../assets/img/img_avatar.png';

    public get userLogeedIn(): User {
      return this.accountService.userValue;
    }
      // convenience getter for easy access to form fields

      private getUserAccess(){

        this.oUserAccess = new Object();
        this.oUserAccess = JSON.parse(JSON.stringify(environment.security )); // {...environment.security };
  
        for (let i = this.oUserAccess.components.length - 1; i >= 0; i--)
        {
          Object.entries(this.oUserAccess.components[i].modules).forEach(
            ([key, value]) => {
              if (key === 'index'){
                delete this.oUserAccess.components[i].modules[key];
              }
              if (this.oUserAccess.components[i].modules[key] === 0){
                delete this.oUserAccess.components[i].modules[key];
              }
            });
  
          if (this.oUserAccess.components[i].access === 0){
            this.oUserAccess.components.splice(i, 1);
          }
        }
      }

      
    ngOnInit() {
      this.oUser = new User();
      this.recoveryCodes = [];
      if (this.oUser.avatar === undefined){
          this.oUser.avatar = this.defFoto;
      }
      this.id= this.accountService.userValue.id.toString(); 
      this.initials = this.accountService.userValue.firstname.charAt(0) + this.accountService.userValue.lastname.charAt(0);
      
      this.isAddMode =false;
      this.hideOldPwd = false;
      this.hideNewPwd = false;
      this.hideConfPwd = false;

      // password not required in edit mode

      let passwordValidators = [];
      const emailValidator = [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')];
      if (this.isAddMode) {
        passwordValidators = [Validators.minLength(6)];
        passwordValidators.push(Validators.required);
        emailValidator.push(Validators.required);
      } ///else {
        //passwordValidators = [Validators.required];
        ///passwordValidators.push(Validators.minLength(6));
      //}

      this.form = this.formBuilder.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', emailValidator],
          password: ['', passwordValidators],
          client_id: ['', Validators.required],
          color: [''],
          language: ['', Validators.required],
          avatar: [this.defFoto],
          lvl: [''],
          from: [''],
          till: [''],
          active: [''] ,
          c_password: [''],
          twoFactorEnabled: [{value: '',disabled:true}],

      });

      this.form2fa = this.formBuilder.group({
        twoFactorCode: ['',Validators.required],
      });
      

 
      this.loadProfile();

      this.pwdForm = this.formBuilder.group({
        old_password: ['', Validators.required],
        new_password: ['', Validators.required],
        conf_password: ['', Validators.required]
      });

      for (let i = 0; i < this.oUserAccess.components.length; i++){
        this.oUserAccess.components[i].index = i;
      }

      this.pwdForm.get("new_password").valueChanges.subscribe(value=>{
        this.form.get("password").setValue(value);
      })

  }

  
  private loadProfile(){
    this.accountService.getProfile()
    .pipe()
    .subscribe({
      next: (Userdata: ResponseApi<User> ) => {
        if (Userdata.data.client_id !== this.accountService.userValue.client_id){
          this.router.navigate(['../'], { relativeTo: this.route });
        }else{
            this.oUser = Userdata.data;
            this.loadAccesUserLevel(this.oUser.id);
            if (this.oUser.avatar === undefined){
                this.oUser.avatar = this.defFoto;
                this.imageUrl = this.defFoto;
            }
            
            /*if (Userdata.data.color != null){
                try{
                  Userdata.data.color = JSON.parse('' + Userdata.data.color);

                }catch {
                    const sColortmp = new Color(2, 117, 129);
                    Userdata.data.color = sColortmp;
                }
            }else{
              const sColortmp = new Color(2, 117, 129);
              Userdata.data.color = sColortmp;
            }

            let sColor: any = Userdata.data.color;
            if (sColor === undefined || sColor === '' ){
                sColor = new Color(2, 117, 129);
                Userdata.data.color = sColor;
            }
            const rgb = this.hexToRgb(Userdata.data.color.hex);
            Userdata.data.color = new Color( rgb.r, rgb.g, rgb.b, 1); */

            this.imageUrl = this.oUser.avatar;
            this.form.patchValue(this.oUser);
            
          }

        },
        error: oError => {
          this.alertService.error(oError);
          this.router.navigate(['../'], { relativeTo: this.route });

        }

      }
    );

  }

  
  ngAfterContentChecked(): void {
    this.changeDetect.detectChanges();
}

onSubmit() {
    this.submitted = true;
    //this.form.controls.avatar.setValue( this.oUser.avatar);

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {

       // this.createUser();
    } else {
        this.updateUser();
    }
}


get f2fa(){
  return this.form2fa.controls;
}

private async  loadAccesUserLevel(nUserId){
  let oAccesUserLevel: any;
  await this.accountService.loadSecurityByUserID(nUserId).then(dataSec => {
   if (dataSec !== undefined){
    oAccesUserLevel = dataSec;
    for (let i = this.oUserAccess.components.length - 1; i >= 0; i--) {
      const oComponentUserLevel: any = oAccesUserLevel.components.find(usrlvl => {
        return usrlvl.name === this.oUserAccess.components[i].name;
      });
      if (oComponentUserLevel != null && oComponentUserLevel !== undefined) {
        this.oUserAccess.components[i].access = oComponentUserLevel.access;
        Object.entries(oComponentUserLevel.modules).forEach(
          ([key, value]) => {
           if (key === 'index'){
             delete this.oUserAccess.components[i].modules[key];
           }else if (this.oUserAccess.components[i].modules[key] !== undefined){
             // delete this.oUserAccess.components[i].modules[key];
             this.oUserAccess.components[i].modules[key] = value==1?true:false;
           }
         });
      }
    }
   }
  });
  //this.oUserAccess = Object.assign({}, this.oUserAccess);
  //this.dataSource.data =  this.oUserAccess.components;   
 }

 private updateUser() {
  // console.log(this.form.value);
    const sColortmp = new Color(2, 117, 129);
    this.form.get("color").setValue(sColortmp);
   this.accountService.updateProfile(this.form.value)
         .pipe(first())
         .subscribe({
             next: (usr: any ) => {
                 this.saveAccessModules(usr.id);
                  this.alertService.success('Update successful', { keepAfterRouteChange: true, autoClose: true });
                 //this.toaster.success(this.translate.instant('Update successful'), this.translate.instant('Save'));
                 //this.scrollIntoView();
                 this.router.navigate(['/geographical-searches'], { relativeTo: this.route });
             },
             error: oError => {
                 //this.alertService.error(error);
                 //this.toaster.error(this.translate.instant(oError), this.translate.instant('Error'));
                 this.loading = false;
                 //this.scrollIntoView();
             }
         });
 }

 /*private scrollIntoView(){
  this.userTitle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}*/

private loadSecurityModules(){
  this.arrModules = {};
  this.accountService.getSecurityModules().subscribe((data: ResponseApi<any>) => {
   const tempData: any = data.data;
   if (tempData.length > 0){
    tempData.forEach(module => {
      if (module.name === 'index'){
        this.arrModules[module.component] = module.id;
      }else{
        this.arrModules[module.name] = module.id;
      }

    });

   }
  });
}

private saveAccessModules(idUsr){
  const ArrModulesIDs: Array<number> = [];
  this.oUserAccess.components.forEach(component => {
    if (this.arrModules[component.name] !== undefined && component.access === true){
      ArrModulesIDs.push(this.arrModules[component.name]);
    }
    Object.entries(component.modules).forEach(
      ([key, value]) => {
        if (component.modules[key] === true){
          ArrModulesIDs.push(this.arrModules[key]);
        }
      });
  });

  this.accountService.updateSecurityByUser(idUsr, ArrModulesIDs).subscribe(data => {
   // console.log(data);
  });

  //console.log(ArrModulesIDs);
}

public getLangs(){
  return this.translate.getLangs();
}

validatePassword(): void {
  const password = this.pwdForm.get('new_password')?.value || '';

  this.passwordConditions = {
    hasLetter: /[a-zA-Z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMinLength: password.length >= 8,
  };
}


handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  
  onSelect(event) {
    const reader = new FileReader();
      reader.readAsDataURL(event.addedFiles[0]); // read file as data url

      reader.onload = (eventFile) => { // called once readAsDataURL is completed
        this.openAvatarEditor('' + eventFile.target.result)
        .subscribe(
          (result) => {
            if(result){                 
              this.onFileChange(result);
            }
          }
        )
        
      };
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.replaceFile();
    }
  }

  onFileChange = (fileUrl: string) => {
    this.form.get('avatar').setValue(fileUrl);
    this.oUser.avatar =fileUrl;
    this.imageUrl =fileUrl;

  };

  openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
  
  replaceFile() {
    this.files.splice(0,1);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  show2faModal(id?): void {
        //console.log(this.value);
  
        this.modalZService.create({
          nzTitle: "Two Factor Authentication",
          nzContent: Settings2faComponent,
          nzWidth: '584px',
          nzData: {
            value: '',
            id: id,
          },
          nzFooter: []
        });
  }

  disable2FA(){
    this.confirmationDialogService.confirm('2FA', this.translate.instant("Are you sure you want to disable 2FA?"), 'Yes','Cancel','lg',true,false,'fas fa-exclamation-triangle')
    .then((confirmed) => {
      if (confirmed === true){
        this.accountService.disable2FaAuthenticator().subscribe(data =>{
          this.loadProfile();
        }, err =>{});
      }        
      
    })
    .catch(() => {console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')});
  }
  resetRecoveryCodes(){
    this.resetSuccess=false;
    this.resetAuthKey=false;
    this.recoveryCodes=[];
    this.modalService.open(this.twofactorreset, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
    //this.accountService.resetRecoveryCodes().subscribe(data =>{}, err =>{});
  }
  configureAuthenticatorApp(){
    this.qrcode="";
    this.sharedKey="";
    this.recoveryCodes=[];
    this.twofaSuccessEnabled=false;
    event.stopPropagation();
    this._loadingAddEdit.next(true);
    this.accountService.enableAuthenticator().subscribe((data:any) =>{
      this.qrcode=data.authenticatorUri
      this.sharedKey=data.sharedKey
      this.modalService.open(this.twofactorsetup, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
        (result) => {},
        (reason) => {
          this.closeResult = `Dismissed with: ${reason}`;
          this.loadProfile();
        },
      );

    }, err =>{

    });
 
    setTimeout(() => {
      this._loadingAddEdit.next(false);
    }, 200);
  }
  verifyAuthenticatorApp(){
    this.submitted2fa=true;
    if(!this.form2fa.valid){return}

    
    this.ontwofactorenable=true;
    this.twofaSuccessEnabled=false;
    this.accountService.verifyAuthenticator(this.form2fa.controls['twoFactorCode'].value,"","").subscribe((datarecoveryCodes:any) =>{
      if(datarecoveryCodes.length > 0){
         this.recoveryCodes= datarecoveryCodes;
         this.submitted2fa=false;
         this.twofaSuccessEnabled=true;
         this.twofaSuccessEnabled=true;
         this.ontwofactorenable=false;
      }else{
        this.form2fa.controls['twoFactorCode'].setErrors({'incorrect':true});
      }
    }, err =>{        
      this.ontwofactorenable=false;
      this.form2fa.controls['twoFactorCode'].setErrors({'incorrect':true});
    });
  }

  resetAuthenticatorKey(){
    this.resetSuccess=false;
    this.resetAuthKey=true;
    this.modalService.open(this.twofactorreset, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
    //this.accountService.resetAuthenticatorKey().subscribe(data =>{}, err =>{});
    
  }


  confirmResetAuthKey() {      
    this.confirmationDialogService.confirm('2FA', this.translate.instant("Are you sure you want to reset authenticator keys?"), 'Yes','Cancel','lg',true,false,'fas fa-exclamation-triangle')
    .then((confirmed) => {
      if (confirmed === true){
        this.accountService.resetAuthenticatorKey().subscribe((dataResetAuthenticator:any) =>{
          //.recoveryCodes= datarecoveryCodes;
          //this.resetAuthKey=false;
          this.recoveryCodes=[];
          this.resetSuccess=true;
          this.ontwofactorenable=false;
          this.twofaSuccessEnabled=false;
          this.modalService.dismissAll();
          this.qrcode=dataResetAuthenticator?.authenticatorUri
          this.sharedKey=dataResetAuthenticator?.sharedKey
          this._loadingAddEdit.next(true);
          setTimeout(() => {
            this._loadingAddEdit.next(false);
            this.modalService.open(this.twofactorsetup, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
              (result) => {},
              (reason) => {
                this.closeResult = `Dismissed with: ${reason}`;
                this.loadProfile();
              },
            );
          }, 200);
      
  
      
        }, err =>{this.ontwofactorenable=false;});
      }    
    })
    .catch(() => {console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')});      
  }

  
  confirmRecoveryCodes() {   
    this.confirmationDialogService.confirm('2FA', this.translate.instant("Are you sure you want to regenerate Authenticator recovery codes"), 'Yes','Cancel','lg',true,false,'fas fa-exclamation-triangle')
    .then((confirmed) => {
      if (confirmed === true){   
          this.accountService.resetRecoveryCodes().subscribe((datarecoveryCodes:any) =>{
            this.recoveryCodes= datarecoveryCodes.recoveryCodes;
            this.resetAuthKey=false;
            this.resetSuccess=true;
            this.ontwofactorenable=false;
            this.loadProfile();
          }, err =>{this.ontwofactorenable=false;});
        }}
      );
    
  }

}
