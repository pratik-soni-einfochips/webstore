import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppStoreModule } from './modules/store/store.module';
import { Store, StoreModule } from '@ngrx/store';
import { WebStoreReducer } from './store/storeReducers';
import { EffectsModule } from '@ngrx/effects';
import { WebStoreEffect } from './store/storeEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpwebstoreInterceptor } from './interceptors/httpwebstore-interceptor.service';
import { ProductCurrencyPipe } from './pipes/productCurrency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // ProductCurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppStoreModule,
    StoreModule.forRoot({ webStore: WebStoreReducer }),
    EffectsModule.forRoot([WebStoreEffect]),
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpwebstoreInterceptor,
      multi: true // Can have multiple interceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
