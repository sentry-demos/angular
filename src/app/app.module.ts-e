import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://60443a2c0a0c45599b1387046605bc88@sentry.io/269722",
  release: "a2afab974a383f395cf6c92cdebbe97fd5770aeb"
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
