import { Component } from '@angular/core';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onSubmit(value:any){
    console.log(value)
  
  }
  error(){
    Raven.setUserContext({
      email: "angluar@demo.com"
    })
    decodeURIComponent('%'); 
  } 
  undefinedMethod(){
    Raven.setUserContext({
      email: "angluar@demo.com"
    })
    undefined(); 
  } 

}
