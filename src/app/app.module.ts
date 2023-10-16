import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { environment } from "./../environments/environment.prod";
import { BrowserTracing } from "@sentry/angular";

import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://6dd6b79934654822b631951be27ec0e1@o87286.ingest.sentry.io/1190123",
  release: environment.release,
  debug: true,
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "http://localhost/5000"],
      routingInstrumentation: Sentry.routingInstrumentation,
      _experiments: {
        enableInteractions: true,
      },
    }),
    new Sentry.BrowserProfilingIntegration(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

export class SentryErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Sentry.captureException(err.originalError || err);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
