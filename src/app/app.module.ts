import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/angular";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

//import { AppModule } from "./app/app.module";

Sentry.init({
  dsn: "https://b38e0f5adaf845008633151efaeef0ea@o87286.ingest.sentry.io/5462755" ,
  integrations: [
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "http://localhost:4200/"],
      routingInstrumentation: Sentry.routingInstrumentation,

    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
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
    AppRoutingModule,
    FormsModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
