import {
  NgModule
} from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  AppSkyModule
} from './app-sky.module';
import {
  AgGridModule
} from "ag-grid-angular/";



@NgModule({
  exports: [
    AppSkyModule,
    AgGridModule
  ],
  imports:[
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: []
})
export class AppExtrasModule { }
