import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponentDef, LAZY_CMPS_PATH_TOKEN } from './tokens';

@NgModule({
  imports: [CommonModule],
})
export class SharedLazyLoaderModule {
  static registerLazyElements(
    modulePaths: LazyComponentDef[]
  ): ModuleWithProviders<SharedLazyLoaderModule> {
    return {
      ngModule: SharedLazyLoaderModule,
      providers: [
        {
          provide: LAZY_CMPS_PATH_TOKEN,
          useValue: modulePaths,
          multi: true,
        },
      ],
    };
  }
}
