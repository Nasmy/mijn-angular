import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '@models/alert.model';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  //standalone: true,
  //imports: [],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  sName="";
  succesmessage="";
  private returnUrl:string ="";
  public allertMessage:Alert=<Alert>{};

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AuthService,
      private alertService: AlertService,   
      private translateService: TranslateService,
  ) { }

  ngOnInit() {
    const emailValidator = [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required];
      this.form = this.formBuilder.group({
        email:["", { validators: emailValidator}],
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

      this.succesmessage=this.translateService.instant("Password reset successfully! Check your e-mail box for instruction.")
      this.alertService.onAlert().subscribe(allertData=>{
        this.allertMessage=allertData;  
      })

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          this.alertService.error(this.translateService.instant('email is required'),this.translateService.instant("Login")); 
          return;
      }

      this.loading = true;
      this.accountService.resetPasswoord(this.f["email"].value)
          .pipe(first())
          .subscribe({
              next: () => {

                this.router.navigate(['/account/password-reset-confirm'], { queryParams: {email:this.f["email"].value, returnUrl:this.returnUrl }});
                  // get return url from query parameters or default to home page
                 /* this.alertService.success(this.succesmessage);
                  this.loading =false;
                  setTimeout(function () {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
                    this.router.navigateByUrl(returnUrl);
                  }.bind(this), 5000);
                  */


              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }





}
