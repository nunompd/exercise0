import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ObjectsComparisonComponent } from './components/objects-comparison/objects-comparison.component';
import { ObjectsScopingComponent } from './components/objects-scoping/objects-scoping.component';
import { ObservablesExe1Component } from './components/observables-exe-1/observables-exe-1.component';
import { ObservablesExe2Component } from './components/observables-exe-2/observables-exe-2.component';
import { PalindromeComponent } from './components/palindrome/palindrome.component';
import { ComparisonOperatorsComponent } from './components/comparison-operators/comparison-operators.component';
import { PromisesExe1Component } from './components/promises-exe-1/promises-exe-1.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    PromisesExe1Component,
    ObjectsComparisonComponent,
    ObjectsScopingComponent,
    ObservablesExe1Component,
    ObservablesExe2Component,
    PalindromeComponent,
    ComparisonOperatorsComponent,
    LifecycleComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
