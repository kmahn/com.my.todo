import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export interface AppConfig {
  apiHost: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const appConfigProvider = {
  provide: APP_CONFIG, useValue: { apiHost: environment.apiHost, }
};
