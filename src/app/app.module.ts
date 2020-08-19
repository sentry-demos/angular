import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://60443a2c0a0c45599b1387046605bc88@sentry.io/269722",
  release: "b6d7c8d5e2d0ca00c65090c8761ca07cefd95f12"
});

export class SentryErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Sentry.captureException(err.originalError || err);
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
  providers: [ { provide: ErrorHandler, useClass: SentryErrorHandler } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
