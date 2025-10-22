/// <reference types="@angular/localize" />

// Angular modules
import { enableProdMode }       from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// External modules
import { appConfig }            from './app/app.config';

// Internal modules
import { environment }          from './environments/environment';

// Components
import { AppComponent }         from './app/app.component';

//Syncfusion
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH5feXRSRWZeU0NxV0M=');

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(
  AppComponent,
  appConfig,

)
.catch(err => console.error(err));
