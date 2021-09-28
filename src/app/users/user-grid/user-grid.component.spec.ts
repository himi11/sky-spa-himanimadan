import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser/test-module';
import { SkyAgGridService } from '@skyux/ag-grid';
import { SkyModalInstance, SkyModalService } from '@skyux/modals';
import { GridApi } from 'ag-grid-community';
import { UserDataService } from '../shared/user-data.service';
import { UsersGridComponent } from './users-grid.component';

describe('User grid component', () => {
  let userDataService: UserDataService;
  let agGridService: SkyAgGridService;
  let component: UsersGridComponent;
  let fixture: ComponentFixture<UsersGridComponent>;
  let modalService: SkyModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
    fixture = TestBed.createComponent(UsersGridComponent);
    component = fixture.componentInstance;
    userDataService = TestBed.inject(UserDataService);
    agGridService = TestBed.inject(SkyAgGridService);
    modalService = TestBed.inject(SkyModalService);
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit called ', () => {
    const getUserDataSpyOn = spyOn(userDataService, 'getUsersList');
    const getGridOptionsSpyOn = spyOn(agGridService, 'getGridOptions');
    component.ngOnInit();
    expect(getUserDataSpyOn).toHaveBeenCalled();
    expect(getGridOptionsSpyOn).toHaveBeenCalled();
  });

  it('ngOnDestroy called', () => {
    const unsubscribeSpyOn = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpyOn).toHaveBeenCalled();
  });

  it('searchApplied called', () => {
    component.gridApi = new GridApi();
    spyOn(component.gridApi, 'setQuickFilter');
    component.searchApplied('abc');
    expect(component.searchText).toBe('abc');
  });

  it('openModal called', () => {
    const modalInstance = new SkyModalInstance();
    const modelServiceSpyOn = spyOn(modalService, 'open').and.returnValue(modalInstance);
    component.openModal();
    expect(modelServiceSpyOn).toHaveBeenCalled();
  });
});
