// Angular modules
import { DatePipe, registerLocaleData }               from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS,withInterceptors, withFetch, withInterceptorsFromDi, provideHttpClient }             from '@angular/common/http';
import { ApplicationConfig }      from '@angular/core';
import { importProvidersFrom }    from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations }      from '@angular/platform-browser/animations';
import { provideRouter }          from '@angular/router';
import { withInMemoryScrolling }  from '@angular/router';
import { withRouterConfig }       from '@angular/router';

// External modules
import { TranslateModule }        from '@ngx-translate/core';
import { TranslateLoader }        from '@ngx-translate/core';
import { TranslateHttpLoader }    from '@ngx-translate/http-loader';
import { AngularSvgIconModule }   from 'angular-svg-icon';

// Internal modules
import { environment }            from '@env/environment';
import { route }                 from './app.routes';

// Services
import { AppService }             from '@services/app.service';
import { StoreService }           from '@services/store.service';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



//helpers
import { ErrorInterceptor, JwtInterceptor } from '@helpers/index';


// custom layout icons
import { CalendarCustomDefinition, CopyIconDefinition, DownloadIconDefinition } from '../assets/img/icons/custom-icons';
const CUSTOM_ICONS = [CopyIconDefinition,DownloadIconDefinition,CalendarCustomDefinition];
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { AuthService } from '@services/auth.service';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';




registerLocaleData(en);
export function createTranslateLoader(http : HttpClient)
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig : ApplicationConfig = {  
  providers : [
    provideClientHydration(), 
    provideHttpClient(
      //withFetch(),
      withInterceptors([JwtInterceptor,ErrorInterceptor]),
      withInterceptorsFromDi()      
    ),
    /*  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },    
   { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true 
    },
    {
      provide: NZ_ICONS, // Register the icons
      useValue: CUSTOM_ICONS,
    }, */

    // Routing
    provideRouter(
      route,
      withRouterConfig({
        onSameUrlNavigation : 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration : 'enabled'
      }),
    ),

    importProvidersFrom(        
      FormsModule,    
      // Angular modules
      BrowserModule,
      // External modules
      TranslateModule.forRoot({
       
        loader : {
          provide    : TranslateLoader,
          useFactory : (createTranslateLoader),
          deps       : [HttpClient]
        },       
      }),
      /*TranslateModule.forRoot({           
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        isolate: false
      }),*/
      AngularSvgIconModule.forRoot(),
      // Internal modules
    ),

    // External modules

    // Services
    StoreService,
    AuthService,
    //AppService,

    // Pipes
    DatePipe,

    // Guards

    // Resolvers
    provideAnimations(),
 
    provideNzIcons(icons), 
    provideNzI18n(en_US),  
    provideAnimationsAsync(),  
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    
  ]
};
