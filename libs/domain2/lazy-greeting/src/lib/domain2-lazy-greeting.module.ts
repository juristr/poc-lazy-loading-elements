import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazygreetingComponent } from './lazygreeting/lazygreeting.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [CommonModule],
  declarations: [LazygreetingComponent],
})
export class Domain2LazyGreetingModule {
  constructor(injector: Injector) {
    // custom element registration
    const CustomElement = createCustomElement(LazygreetingComponent, {
      injector,
    });
    customElements.define(LazygreetingComponent.SELECTOR, CustomElement);
  }
}
