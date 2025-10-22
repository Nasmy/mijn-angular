import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';

import { NzAlign, NzJustify } from 'ng-zorro-antd/flex';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public isPasswordVisible = false;
  loginForm!: FormGroup;
  isLoading = false;

  /*validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });*/



  constructor(
    private fb: NonNullableFormBuilder,
    private accountService: AuthService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    //private fb: FormBuilder, 
    private router: Router) {

    }

  ngOnInit(): void {
    const emailValidator = [Validators.pattern("^[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")];
    this.loginForm = this.fb.group({
      email: ['', emailValidator],
      password: ['', Validators.required],
      remember: ['']
    });
  }
  get f() { return this.loginForm.controls; }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      this.onSubmit();
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
    }

    if (this.loginForm.valid) {
        //this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid


        this.isLoading = true;
        this.accountService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: (res: any ) => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'geographical-searches';
                    if (res?.is2StepVerificationRequired!=undefined &&  res.is2StepVerificationRequired){
                        this.router.navigate(['/account/twostepverification'],
                        { queryParams: { returnUrl: returnUrl, provider: res.provider, email: this.f['email'].value }})
                      }else if(res.is2StepConfigurationRequired){
                        this.router.navigate(['/account/twostepconfiguration'],
                        { queryParams: { returnUrl: returnUrl, provider: res.provider, email: this.f['email'].value,token:res.token }})
                      }
                      else if(res!=undefined && res.access_token!=undefined){                             
                          this.router.navigateByUrl(returnUrl);
                      }
                    // get return url from query parameters or default to home page

                },
                error: error => {
                   // this.alertService.error(error);
                    this.isLoading = false;
                }
            });
          }




  }
}
