import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
Raven
  .config('https://60443a2c0a0c45599b1387046605bc88@sentry.io/269722', {
    release : '1f89bbc1436d314c0e0a4eb5fd736f15a5580d1d'
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError || err);
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ { provide: ErrorHandler, useClass: RavenErrorHandler } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
