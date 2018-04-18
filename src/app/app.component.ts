import { Component } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color = 'black';
  textValue = '';
  currentUser = '';

  changeColor() {
    var that = this;
    this.color = 'red';
    setTimeout(() => {
      that.color = 'black'
    }, 1500);
  }

  handleSubmit() {
    this.currentUser = this.textValue;
    Raven.setUserContext({email: this.currentUser });
  }

  malformed() {
    decodeURIComponent('%');
  }

  // ERRORS
  notAFunctionError() {
    var someArray = [{ func: function () {}}];
    someArray[0].func();
  }

  uriError() {
    decodeURIComponent('%');
  }

  syntaxError() {
    eval('foo bar');
  }

  rangeError() {
    throw new RangeError('Parameter must be between 1 and 100');
  }
  // ERRORS (end)

}
