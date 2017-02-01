import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export class AppConfig {
  serverUrl: string;
  apiEndpoint: string;
  clientId: string;
}

export const CONFIG_PRODUCTION: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8"
};

export const CONFIG_DEVELOPMENT: AppConfig = {
  serverUrl: "http://localhost:3000",
  apiEndpoint: "http://localhost:3000/api",
  clientId: "666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8"
};

