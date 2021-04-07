# Lazy loading of Elements from static HTML

Quick POC of lazy loading Angular elements lazily from an HTML page.

## Idea / Rational

There's a `partial.component.ts` which gets registered on any local unmatched routes. If the component gets triggered, it looks at the url, e.g. `/partial1` and tries to load a `partial1.html` into the page.

`partial1.html` might contain other Angular Elements that have been registered with this Angular application, which should be **lazy loaded** once the partial gets embedded into the DOM.

Angular Elements need to be defined as usual (e.g. see `libs/domain1/lazy-hello/domain1-lazy-hello.module.ts`). Each "domain" (e.g. a feature area) needs to have a bootstrapping module that does the static registration. That registration is a mapping `element selector => lazy loaded module`. There's a `shared/lazy-loader` library that handles the registration and loading logic of those Angular elements.

```
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
```

For an example see `libs/domain1/bootstrapping/src/lib/domain1-bootstrapping.module.ts`.

Each domain feature module might contribute its own lazy loaded elements.

**IMPORTANT:** Those "bootstrapping modules" need to be registered in the main app module (see `apps/demoapp/.../app.module.ts`)

## Demo

Just launch the app `npm start`. Clicking on the `Partial 1` link will pull down the partial HTML from `apps/demoapp/src/assets/partials/partial1.html`, which contains an Angular Element defined within which gets lazy loaded automatically and instantiated.
