import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-reset-success',
  standalone: false,
  templateUrl: './password-reset-success.component.html',
  styleUrl: './password-reset-success.component.scss'
})
export class PasswordResetSuccessComponent  implements OnInit {
  private returnUrl:string="";
  public email:string="";

  constructor(
     
      private route: ActivatedRoute,
      private router: Router,   
      private translateService: TranslateService,
  ) { }


  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.email = this.route.snapshot.queryParams['email'] || '';
  }
}
