// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Enums
import { EnvName } from '@enums/environment.enum';

// Packages
import packageInfo from '../../package.json';



const scheme = 'https://';
const host   = 'localhost';
const port   = ':7158';
const path   = '/api';
const baseUrl = scheme + host + port + path;



/*const scheme = 'https://';
const host   = 'alexa-api.mijnperceel.be';
const path   = '/api';
const baseUrl = scheme + host + path;*/





export const environment = {
  production      : false,
  version         : packageInfo.version,
  appName         : 'Mijnperceel',
  envName         : EnvName.LOCAL,
  defaultLanguage : 'en',
  apiBaseUrl      : baseUrl,
  enc_key         : "GV4Qh2S8dQb8j26Q",
  currentUser     : null,
  security        : null,
  modes           : null,  
  appVersion      : require('../../package.json').version + '-dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
