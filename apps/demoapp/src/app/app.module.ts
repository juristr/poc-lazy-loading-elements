import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PartialComponent } from './partial/partial.component';
import { SafePipe } from './partial/safe-pipe.pipe';

import { Domain1BootstrappingModule } from '@lazyelements-demo/domain1/bootstrapping';
import { Domain1LazyHelloModule } from '@lazyelements-demo/domain1/lazy-hello';

@NgModule({
  declarations: [AppComponent, HomeComponent, PartialComponent, SafePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PartialComponent,
      },
    ]),

    // bootstrapping references from the various feature modules
    // that want to contribute lazy registrations
    Domain1BootstrappingModule,
    // Domain1LazyHelloModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
