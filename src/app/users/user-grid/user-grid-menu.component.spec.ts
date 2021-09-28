import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser/test-module';
import { ICellRendererParams } from 'ag-grid-community';
import { UserGridMenuComponent } from './user-grid-menu.component';

describe('User grid menu component', () => {
  let component: UserGridMenuComponent;
  let fixture: ComponentFixture<UserGridMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
    fixture = TestBed.createComponent(UserGridMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('refresh', () => {
    const output = component.refresh();
    expect(output).toBe(false);
  });

  it('actionClicked', () => {
    const alertSpy = spyOn(window, 'alert');
    component.actionClicked('Delete');
    expect(alertSpy).toHaveBeenCalled();
  });

  it('agInit called', () => {
    let params: ICellRendererParams;
    params = {
      data: { firstName: 'aaa' },
      value: {},
      valueFormatted: {},
      $scope: {},
      node: undefined,
      api: undefined,
      columnApi: undefined,
      rowIndex: undefined,
      context: undefined,
      eGridCell: undefined,
      eParentOfValue: undefined,
      registerRowDragger: undefined
    };
    component.agInit(params);
    expect(params).toBeTruthy();
  });
});
