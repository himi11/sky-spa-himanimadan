import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { UserDetailsModel } from '../models/user-details.model';
import { UserGridModel } from '../models/user-grid.model';
import { UserDataService } from '../shared/user-data.service';
import { UserGridEditModalComponent } from './user-grid-edit-modal.component';
import { UserGridMenuComponent } from './user-grid-menu.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html'
})
export class UsersGridComponent implements OnInit, OnDestroy {
  public gridData: UserDetailsModel[] = [];
  public gridOptions: GridOptions;
  public searchText: string;
  public subscription: Subscription;
  public gridApi: GridApi;

  private columnDefs = [
    {
      field: 'selected',
      type: SkyCellType.RowSelector
    },
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: UserGridMenuComponent
    },
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
    private userDataService: UserDataService,
    private modalService: SkyModalService
  ) {
    this.subscription = this.userDataService.currentUsersList.subscribe(
      (userList: UserDetailsModel[]) => {
        if (userList) {
          this.gridData = userList.slice();
        }
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

  public openModal(): void {
    const context = new UserGridModel();
    context.gridData = this.gridData;

    const options = {
      providers: [{ provide: UserGridModel, useValue: context }],
      ariaDescribedBy: 'docs-edit-grid-modal-content',
      size: 'large'
    };

    const modalInstance = this.modalService.open(
      UserGridEditModalComponent,
      options
    );

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel' || result.reason === 'close') {
        alert('Edits canceled!');
      } else {
        this.gridData = result.data;
        this.gridApi.refreshCells();
        alert('Saving data!');
      }
    });
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }

  protected onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
  }
}
