import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser/test-module';
import { SkyAgGridService } from '@skyux/ag-grid';
import {
  SkyModalConfiguration,
  SkyModalHostService,
  SkyModalInstance
} from '@skyux/modals';
import { GridApi } from 'ag-grid-community';
import { UserGridModel } from '../models/user-grid.model';
import { UserGridEditModalComponent } from './user-grid-edit-modal.component';

describe('User grid edit modal component', () => {
  let userGridModel: UserGridModel;
  let component: UserGridEditModalComponent;
  let agGridService: SkyAgGridService;
  let fixture: ComponentFixture<UserGridEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
      providers: [
        UserGridModel,
        SkyModalConfiguration,
        SkyModalHostService,
        SkyModalInstance
      ]
    });
    fixture = TestBed.createComponent(UserGridEditModalComponent);
    component = fixture.componentInstance;
    agGridService = TestBed.inject(SkyAgGridService);
    userGridModel = TestBed.inject(UserGridModel);
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit called', () => {
    component.gridApi = new GridApi();
    userGridModel.gridData = [
      {
        firstName: 'abc',
        lastName: 'ghs',
        emailId: 'aa@aa.com',
        dateOfBirth: new Date(),
        phoneNumber: '1223',
        address: 'aqwe'
      }
    ];
    const getEditableGridOptionsSpyOn = spyOn(
      agGridService,
      'getEditableGridOptions'
    );
    component.ngOnInit();
    expect(component.gridData.length).toBe(1);
    expect(component.columnDefs.length).toBe(6);
    expect(getEditableGridOptionsSpyOn).toHaveBeenCalled();
  });
});
