import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLazyLoaderModule } from '@lazyelements-demo/shared/lazy-loader';

@NgModule({
  imports: [
    CommonModule,
    SharedLazyLoaderModule.registerLazyElements([
      {
        selector: 'lazyelements-demo-lazygreeting',
        lazyLoad: () =>
          import('@lazyelements-demo/domain2/lazy-greeting').then(
            (x) => x.Domain2LazyGreetingModule
          ),
      },
    ]),
  ],
})
export class Domain2BootstrappingModule {}
