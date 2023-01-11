import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.css'],
})
export class LifecycleComponent implements OnInit {
  @ViewChild('mapViewNode') public mapViewEl: ElementRef;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const container = this.mapViewEl.nativeElement;
  }
}
