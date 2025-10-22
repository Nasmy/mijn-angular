import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '@models/alert.model';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-activateaccount',
  standalone: false,  
  templateUrl: './activateaccount.component.html',
  styleUrl: './activateaccount.component.scss'
})
export class ActivateAccountComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  sName="";
  succesmessage="";

  public countryFormControl = new FormControl();
  public countryFormGroup: FormGroup;
  private token: string;
  public  email: string;
  public allertMessage:Alert=<Alert>{};

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService,      
      private translateService: TranslateService,
  ) {


    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.params['id'];
    if (this.email=="" || this.token==""){
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
   }

  ngOnInit() {
    const emailValidator = [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")];
    this.form = this.formBuilder.group({
      email: [{value: '', disabled: true}, emailValidator],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      token: ['', Validators.required]
    });
      this.succesmessage=this.translateService.instant("Password reset successfully!")
      this.form.get('email').setValue(this.email);
      this.form.get('token').setValue(this.token);
      this.alertService.onAlert().subscribe(allertData=>{
        this.allertMessage=allertData;
     })
     // this.f.email.disable();

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      // reset alerts on submit
      this.alertService.clear();
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      if (this.f["password"].value!=this.f["confirmpassword"].value){
        this.form.controls['confirmpassword'].setErrors({'incorrect': true});
        this.alertService.error(this.translateService.instant('Both passwords don\'t match'),this.translateService.instant("Login"));  
        return;
      }
      const objPassReset: any=new Object();
      objPassReset.email=this.form.get("email").value
      objPassReset.password=this.form.get("password").value
      objPassReset.token=this.form.get("token").value

      this.loading = true;
      this.authService.changePasswoord(objPassReset)
          .pipe(first())
          .subscribe({
              next: () => {
                this.router.navigateByUrl("/account/password-reset-successful");
                /*
                  this.alertService.success(this.succesmessage);
                  this.loading =false;
                  setTimeout(function () {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/login';
                    this.router.navigateByUrl(returnUrl);
                  }.bind(this), 3000);
                  */
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

}
