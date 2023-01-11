import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objects-comparison',
  templateUrl: './objects-comparison.component.html',
  styleUrls: ['./objects-comparison.component.css'],
})
export class ObjectsComparisonComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const obj1 = {
      foo: 'bar',
    };

    const obj2 = {
      foo: 'bar',
      bar: {
        foo: 'bar',
      },
      obj1: obj1,
    };
    const obj3 = {
      foo: 'bar',
      bar: {
        foo: 'bar',
      },
      obj1: obj1,
    };

    // what will be the following outputs?
    console.log(obj2 === obj3); //
    console.log(obj2.bar === obj3.bar); //
    console.log(obj2.obj1 === obj3.obj1); //

    Object.assign(obj3.obj1, { key: 'value' });
    console.log(obj2.obj1 === obj3.obj1); //
  }
}
