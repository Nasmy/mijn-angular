import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PageTittleService, AuthService, LocalizationService } from '@shared/services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzDropDownModule, NzMenuModule, NzAvatarModule,TranslateModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

    isCollapsed = false;
    initials!:string;
    userName!:string;
    userEmail!:string;
    public sTitle="Welcome"
    public language = false;
    
    public languages: any[] = [
    /*{
      language: 'English',
      code: 'en-GB',
      code1: 'en',
      icon: 'gb',
      name:"EN"
    },*/
    {
      language: 'Nederlands',
      code: 'nl-NL',
      code1: 'nl',
      icon: 'nl',
      name:"NL"
    },
    {
      language: 'Français',
      code: 'fr-FR',
      code1: 'fr',
      icon: 'fr',
      name:"FR"
    }
  ];

  get selectedLanguage(){
    return this.languages.find(lang=>{return lang.code==localStorage.getItem('language')})
  }
  set selectedLanguage(lang){}

  isSubmenuOpen = true;

  constructor(
    public pageTitleService:PageTittleService,
    public authService: AuthService,
    private changeDetect:ChangeDetectorRef,
    private translate: TranslateService,
    private localizationService: LocalizationService,
  ){
    pageTitleService.onTitleChange().subscribe(data=>{
      console.log("New title: " +data);
      this.sTitle=data;
      this.changeDetect.detectChanges();
    })
    
    this.initials = this.authService.userValue?.firstname.charAt(0) + this.authService.userValue?.lastname.charAt(0);
    this.userName = this.authService.userValue?.firstname + ' ' + this.authService.userValue?.lastname;
    this.userEmail = this.authService.userValue?.email;

    this.localizationService.initService();
  }

  logout() {
    this.authService.logout();
  }

  checkPermission(permission:string){
    return this.authService.checkSecurity(permission);
  }

  changeLanguage(event: MouseEvent, lang) {

    event.stopPropagation(); // prevent bubbling up

    localStorage.setItem('language',  lang.code1);    
    this.translate.use(lang.code1);
    this.selectedLanguage = lang;
    this.localizationService.initService();
  }

  onSubmenuOpenChange(open: boolean): void {
    // Prevent closing
    this.isSubmenuOpen = true;
  }
}
