import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { environment } from '@env/environment';
import { AlertService } from '@services/alert.service';
import { Alert } from '@models/alert.model';
import { first } from 'rxjs';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-settings2fa',
  standalone: true,
  imports: [
    TranslateModule,
    NzAlertModule,
    CommonModule,
    NzInputModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeComponent,
    NzButtonModule],
  templateUrl: './settings2fa.component.html',
  styleUrl: './settings2fa.component.scss'
})

export class Settings2faComponent {
  public submitted:any;
  public loaded:boolean=false;
  form: FormGroup;
  returnUrl:string;
  email:string;
  token:string;
  provider:string;
  
  submitted2fa
  
  ontwofactorenable:boolean;
  qrcode:string;
  sharedKey:string;
  twofaSuccessEnabled:boolean=false;
  recoveryCodes:Array<string>=[];
  public allertMessage:Alert=<Alert>{};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private http: HttpClient,
    private iconService: NzIconService    
) {
  //this.iconService.addIcon(CustomIconDefinition);

   // this.iconService.addIcon(CopyIconDefinition); // Dynamically add custom icons
  

 }
  ngOnInit(): void {

    this.qrcode="";
    this.sharedKey="";
    this.twofaSuccessEnabled=false;
    this.ontwofactorenable=false;
    this.recoveryCodes=[];

    this.form = this.formBuilder.group({
      twoFactorCode: [''],      
      code1: ['', Validators.required],      
      code2: ['', Validators.required],      
      code3: ['', Validators.required],      
      code4: ['', Validators.required],      
      code5: ['', Validators.required],      
      code6: ['', Validators.required],      
  });
  this.alertService.onAlert().subscribe(allertData=>{
    this.allertMessage=allertData;  
  })
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  this.email = this.route.snapshot.queryParams['email'] || '';
  this.provider = this.route.snapshot.queryParams['provider'] || '';
  this.token = this.route.snapshot.queryParams['token'] || '';
  if(this.token!=undefined){
    this.http.get(`${environment.apiBaseUrl}/manage/enableAuthenticator`,this.createRequestHeader(this.token))
    .pipe(first())
        .subscribe({
            next: (data: any ) => {
              this.loaded=true;
              this.qrcode=data.authenticatorUri;
              this.sharedKey=data.sharedKey;         
            },
            error: error => {      
              this.alertService.error(this.translateService.instant('The authenticator could not be initialized at this moment. Please try again later!'),this.translateService.instant("Login"));     
              this.loaded = false;
             }
        });     
      }
  }


  get f2fa() { return this.form.controls; }


  onSubmit(){
    this.verifyAuthenticatorApp();
  }


  private verifyAuthenticatorApp(){
    this.alertService.clear();
    this.submitted=true;
    if(!this.form.valid){
      this.alertService.error(this.translateService.instant('twoFactorCode is required'),this.translateService.instant("Login")); 
      return
    }
    this.form.get("twoFactorCode").setValue(this.form.get("code1").value+""+this.form.get("code2").value+""+this.form.get("code3").value+""+this.form.get("code4").value+""+this.form.get("code5").value+""+this.form.get("code6").value);
  
    this.ontwofactorenable=true;
    this.twofaSuccessEnabled=false;
   // {code, sharedKey, authenticatorUri}
    this.http.post(`${environment.apiBaseUrl}/manage/verifyAuthenticator`,{code:this.form.controls["twoFactorCode"].value,sharedKey:"", authenticatorUri:""},this.createRequestHeader(this.token))
    .pipe(first())
            .subscribe({
                next: (datarecoveryCodes: any ) => {
                  if(datarecoveryCodes.length > 0){
                    this.recoveryCodes= datarecoveryCodes;
                    this.submitted=false;
                    this.twofaSuccessEnabled=true;                   
                    this.ontwofactorenable=false;
                 }else{
                   this.form.controls["twoFactorCode"].setErrors({'incorrect':true});
                   this.alertService.error(this.translateService.instant('Invalid code'),this.translateService.instant("Login"));  
                 }

                },
                error: error => {
                  this.ontwofactorenable=false;
                  this.form.controls["twoFactorCode"].setErrors({'incorrect':true});
                  this.alertService.error(this.translateService.instant('Invalid code'),this.translateService.instant("Login"));  
                }
            });
}


  private createRequestHeader(token:string){
    const headerDict = {   
      'Content-Type': 'application/json',  
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return requestOptions;
  }

  goToLogin(){
    this.router.navigate(['/login/login'], { queryParams: { returnUrl:this.returnUrl }});
  }
  downloadRecoveryCodes(){
    const blob = new Blob([JSON.stringify(this.recoveryCodes)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download ='recovery_codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

 async copyToClipboard(){
  await navigator.clipboard.writeText(this.sharedKey);
  this.alertService.info(this.translateService.instant('Succesfully copied to clipboard'),this.translateService.instant("Login")); 
  /*setTimeout(() => {
    this.alertService.clear();
  }, 700);*/
 }
 onKeyUp(event,id){
  event.preventDefault();
  let key = event.which || event.keyCode || event.charCode;

  if(key != 8){
    let el=document.getElementById(id);
    //el.dispatchEvent(event2);
    el.focus();
  }
  //const event2 = new KeyboardEvent("keypress", {
  //  "key": "Tab"
  //});

 }

}
