import { Component, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalInstance } from '@skyux/modals';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';
import { UserDetailsModel } from '../models/user-details.model';
import { UserGridModel } from '../models/user-grid.model';

@Component({
  selector: 'user-grid-edit-modal',
  templateUrl: './user-grid-edit-modal.component.html'
})
export class UserGridEditModalComponent implements OnInit {
  public columnDefs: ColDef[];
  public gridApi: GridApi;
  public gridData: UserDetailsModel[];
  public gridOptions: GridOptions;

  constructor(
    private agGridService: SkyAgGridService,
    public context: UserGridModel,
    public instance: SkyModalInstance
  ) {}

  public ngOnInit(): void {
    this.gridData = this.context.gridData;
    this.columnDefs = [
      {
        field: 'firstName',
        headerName: 'First Name',
        type: SkyCellType.Text
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        type: SkyCellType.Text
      },
      {
        field: 'dateOfBirth',
        headerName: 'Date Of Birth',
        type: SkyCellType.Date,
        sort: 'asc'
      },
      {
        field: 'emailId',
        headerName: 'Email Id',
        type: SkyCellType.Text,
        editable: true
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        type: SkyCellType.Text,
        editable: true
      },
      {
        field: 'address',
        headerName: 'Address',
        type: SkyCellType.Text,
        editable: true
      }
    ];

    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getEditableGridOptions({
      gridOptions: this.gridOptions
    });
  }

  protected onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
  }
}
