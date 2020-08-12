import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://6dd6b79934654822b631951be27ec0e1@o87286.ingest.sentry.io/1190123",
  release: "3f56fcbcd9d77eb119fc91a855c6b3e192b99ee7"
  //TODO dynamic release, pass in via environment variable, pass in somehow, not static
})

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
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
