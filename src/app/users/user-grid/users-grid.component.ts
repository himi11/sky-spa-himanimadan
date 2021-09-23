import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { UserDataService } from '../shared/user-data.service';
import { UserDetailsModel } from '../user-details.model';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html'
})
export class UsersGridComponent implements OnInit, OnDestroy {
  public gridData: UserDetailsModel[] = [];
  public gridOptions: GridOptions;
  protected gridApi: GridApi;
  protected subscription: Subscription;

  private columnDefs = [
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
      type: SkyCellType.Text
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: SkyCellType.Number
    },
    {
      field: 'address',
      headerName: 'Address',
      type: SkyCellType.Text
    }
  ];

  constructor(
    private agGridService: SkyAgGridService,
    private userDataService: UserDataService
  ) {
    this.subscription = this.userDataService.currentUsersList.subscribe(
      (data: UserDetailsModel[]) => {
        this.gridData = data.slice();
      }
    );
  }

  public ngOnInit(): void {
    this.gridData = this.userDataService.getUsersList();
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent: GridReadyEvent) =>
        this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
  }
}
