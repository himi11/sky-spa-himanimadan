import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AppSkyModule } from './app-sky.module';
import { UserGridEditModelComponent } from './users/user-grid/user-grid-edit-modal.component';
import { UserGridMenuComponent } from './users/user-grid/user-grid-menu.component';

@NgModule({
  exports: [AppSkyModule, AgGridModule],
  imports: [ReactiveFormsModule, AgGridModule.withComponents([])],
  entryComponents: [UserGridEditModelComponent, UserGridMenuComponent]
})
export class AppExtrasModule {}
