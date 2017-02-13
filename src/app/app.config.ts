import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new OpaqueToken('app.config');

export class AppConfig {
  serverUrl: string;
  apiEndpoint: string;
  clientId: string;
}

const CONFIG_PRODUCTION: AppConfig = {
  serverUrl: "https://dkeeper-api-server.herokuapp.com",
  apiEndpoint: "https://dkeeper-api-server.herokuapp.com/api",
  clientId: "b6633ae982516d3f54a80749bc5c6b3749e3cededed1cf8b52bbd7386bec8b86"
};

const CONFIG_DEVELOPMENT: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "051476c1165ee4094f9102db43c5a70381f1dc6cce8012aa855dbc935d126541"
};

export function appConfig(): AppConfig {
  return environment.production ? CONFIG_PRODUCTION : CONFIG_DEVELOPMENT
}
