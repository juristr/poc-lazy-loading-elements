import { InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

export const LAZY_CMPS_PATH_TOKEN = new InjectionToken('lazy-cmp-registry');

export interface LazyComponentDef {
  selector: string;
  lazyLoad: LoadChildrenCallback;
}
