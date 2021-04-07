import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyHelloComponent } from './lazy-hello/lazy-hello.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyHelloComponent],
})
export class Domain1LazyHelloModule {
  constructor(injector: Injector) {
    // custom element registration
    const CustomElement = createCustomElement(LazyHelloComponent, { injector });
    customElements.define(LazyHelloComponent.SELECTOR, CustomElement);
  }
}
