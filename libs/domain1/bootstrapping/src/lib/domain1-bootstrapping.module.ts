import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLazyLoaderModule } from '@lazyelements-demo/shared/lazy-loader';

@NgModule({
  imports: [
    CommonModule,
    SharedLazyLoaderModule.registerLazyElements([
      {
        selector: 'lazyelements-demo-lazy-hello',
        lazyLoad: () =>
          import('@lazyelements-demo/domain1/lazy-hello').then(
            (x) => x.Domain1LazyHelloModule
          ),
      },
    ]),
  ],
})
export class Domain1BootstrappingModule {}
