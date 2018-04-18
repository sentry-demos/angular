import { Component } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textValue = '';
  color = 'black';
  currentUser = '';

  changeColor() {
    var that = this;
    this.color = 'black';
    setTimeout(() => {
      that.color = 'red'
    }, 3000);
  }

  handleSubmit() {
    this.currentUser = this.textValue;
    Raven.setUserContext({email: this.currentUser });
  }
  onSubmit(value: any) {
    console.log(value)
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
