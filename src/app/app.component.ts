import { Component } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textValue = '';

  showColor(ex) {
    // debugger;
  }

  handleSubmit(val) {
    Raven.setUserContext({email: this.textValue });
  }
  onSubmit(value: any) {
    console.log(value)
  }
  malformed() {
    decodeURIComponent('%');
  }

  // ERRORS
  notAFunctionError() {
    var obj = {
      validFunction: function () {}
    };
    obj.validFunction();
  }

  uriError() {
    decodeURIComponent('%');
  }

  // typeError() {
  //   null.f();
  // }

  syntaxError() {
    eval('foo bar');
  }

  // referenceError() {
  //   var a = undefinedVariable;
  // }

  rangeError() {
    throw new RangeError('Parameter must be between 1 and 100');
  }

  // evalError() {
  //   setTimeout(() => {
  //     throw new EvalError('Hello', 'someFile.js', 10);
  //   }, 1000);
  // }
  // ERRORS (end)

}
