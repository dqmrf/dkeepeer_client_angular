import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new OpaqueToken('app.config');

export class AppConfig {
  serverUrl: string;
  apiEndpoint: string;
  clientId: string;
}

const CONFIG_PRODUCTION: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "4ea0017b14c0fdf8831b50de281fe003f062576381d35b9b9eb309eae5cccba6"
};

const CONFIG_DEVELOPMENT: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "4ea0017b14c0fdf8831b50de281fe003f062576381d35b9b9eb309eae5cccba6"
};

export function appConfig(): AppConfig {
  return environment.production ? CONFIG_PRODUCTION : CONFIG_DEVELOPMENT
}
