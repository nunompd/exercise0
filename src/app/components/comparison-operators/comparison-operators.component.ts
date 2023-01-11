import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparison-operators',
  templateUrl: './comparison-operators.component.html',
  styleUrls: ['./comparison-operators.component.css'],
})
export class ComparisonOperatorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const firstName = 'Cap';
    const lastName = 'Gemini';
    const email = null;
    const age = 0;

    console.log(!!(firstName && lastName)); //
    console.log(!!(email || lastName)); //
    console.log(!!(age ?? lastName)); //
  }
}
