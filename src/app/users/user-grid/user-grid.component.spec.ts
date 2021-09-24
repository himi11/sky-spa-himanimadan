import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser/test-module';
import { SkyAgGridService } from '@skyux/ag-grid';
import { SkyModalService } from '@skyux/modals';
import { UserDataService } from '../shared/user-data.service';
import { UsersGridComponent } from './users-grid.component';

describe('User grid component', () => {
  let userDataService: UserDataService;
  let component: UsersGridComponent;
  let skyAgGridService: SkyAgGridService;
  let skyModalService: SkyModalService;
  let fixture: ComponentFixture<UsersGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
      declarations: [UsersGridComponent],
      providers: [userDataService, skyAgGridService, skyModalService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UsersGridComponent);
        component = fixture.componentInstance;
        userDataService = TestBed.inject(UserDataService);
      });
  });

  it('create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
