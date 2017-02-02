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
  clientId: "666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8"
};

const CONFIG_DEVELOPMENT: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8"
};

export function appConfig(): AppConfig {
  return environment.production ? CONFIG_PRODUCTION : CONFIG_DEVELOPMENT
}
