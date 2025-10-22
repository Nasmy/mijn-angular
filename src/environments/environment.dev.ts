// Enums
import { EnvName } from '@enums/environment.enum';

// Packages
import packageInfo from '../../package.json';

const scheme = 'https://';
const host   = 'alexa-api.mijnperceel.be';
const port   = ':5000';
const path   = '/api';

const baseUrl = scheme + host  + path;

export const environment = {
  production      : true,
  version         : packageInfo.version,
  appName         : 'Mijnperceel',
  envName         : EnvName.PROD,
  defaultLanguage : 'en',
  apiBaseUrl      : baseUrl,
  enc_key         : "GV4Qh2S8dQb8j26Q",
  currentUser     : null,
  security        : null,
  modes           : null,  
  appVersion      : require('../../package.json').version + '-dev'
};
