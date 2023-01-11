import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-observables-exe-2',
  templateUrl: './observables-exe-2.component.html',
  styleUrls: ['./observables-exe-2.component.css'],
})
export class ObservablesExe2Component implements OnInit {
  constructor() {}

  ngOnInit() {
    const obsB = new Observable((subscriber) => {
      subscriber.next({ name: 'Capgemini' });
    });

    const subB = new Subject();
    subB.next({ name: 'Capgemini' });
    
    // what is the current ouput?
    combineLatest([obsB, subB])
    .pipe(tap((val) => console.log(val)))
    .subscribe();

    //
  }
}
