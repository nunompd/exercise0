import { Component, OnInit } from '@angular/core';
import { of, take, tap } from 'rxjs';

@Component({
  selector: 'app-observables-exe-1',
  templateUrl: './observables-exe-1.component.html',
  styleUrls: ['./observables-exe-1.component.css']
})
export class ObservablesExe1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    const obsB = of([1,2,3,4,5]);
    obsB.pipe(
      take(2),
      tap((val) => console.log(val))
    );
  }

}