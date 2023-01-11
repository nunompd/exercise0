import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objects-scoping',
  templateUrl: './objects-scoping.component.html',
  styleUrls: ['./objects-scoping.component.css']
})
export class ObjectsScopingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // what will be printed in the console.logs?
    const myObject = {
      foo: "bar",
      func: function () {
        const self = this;
        console.log(this?.foo);  //
        console.log(self?.foo);  //
        (function () {
          console.log(this?.foo); //
          console.log(self?.foo); //
        })();
      },
    };
    myObject.func();
  }

}