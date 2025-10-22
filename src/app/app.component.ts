import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
    AgGridAngular
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  private _localeId;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'nl' ]);
    this._localeId = localStorage.getItem('language') || 'nl-NL';
    if (this._localeId === 'undefined' || this._localeId === ''){
        this._localeId = 'nl-NL';
    }
    // Set default language
    translate.setDefaultLang(this._localeId.split("-")[0]);
    // Use a specific language
    //translate.use('es');
  }
}
