import { Component } from "@angular/core";
import * as Sentry from "@sentry/browser";

function block(time) {
  const start = performance.now();
  while (performance.now() - start < time) {}
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  color = "black";
  textValue = "";
  currentUser = "";

  changeColor() {
    var that = this;
    this.color = "red";
    setTimeout(() => {
      that.color = "black";
    }, 1500);
  }

  handleSubmit() {
    this.currentUser = this.textValue;
    Sentry.configureScope((scope) => {
      scope.setUser({ email: this.currentUser });
    });
  }

  malformed() {
    decodeURIComponent("%");
  }

  // ERRORS
  notAFunctionError() {
    var someArray = [{ func: function () {} }];
    someArray[1].func();
  }

  uriError() {
    decodeURIComponent("%");
  }

  syntaxError() {
    eval("foo bar");
  }

  rangeError() {
    throw new RangeError("Parameter must be between 1 and 100");
  }

  profilingIssue() {
    block(500);
  }
}
