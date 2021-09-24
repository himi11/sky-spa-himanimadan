import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { SkyPagesModule } from '@skyux-sdk/builder/src/app/sky-pages.module';
import { expect } from '@skyux-sdk/testing';
import { UserDetailsModel } from '../models/user-details.model';
import { UserDataService } from '../shared/user-data.service';
import { InputDetailsComponent } from './input-details.component';


describe('Input Details component', () => {
  let userDataService: UserDataService;
  let component: InputDetailsComponent;
  let fixture: ComponentFixture<InputDetailsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule,SkyPagesModule,ReactiveFormsModule],
      declarations: [InputDetailsComponent],
      providers: [userDataService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(InputDetailsComponent);
        component = fixture.componentInstance;
        userDataService = TestBed.inject(UserDataService);
      });
  });

  afterEach(() => {
    userDataService = undefined;
    component = undefined;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('check form group elements', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements).toBe(5);
  });

  it('check form first name input', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElement = formElement.querySelectorAll('input')[0];
    inputElement.value = 'qwert';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstNameFromFormGroup = component.userForm.get('firstName');
      expect(firstNameFromFormGroup.value).toBe(inputElement.value);
    });
  });

  it('ngOnInit called', () => {
    component.ngOnInit();
    const userFormValues = new UserDetailsModel();
    expect(component.userForm.value).toBe(userFormValues);
  });

  it('phoneNumber getter called', () => {
    component.ngOnInit();
    expect(component.phoneControl.value).toBe(undefined);
  });
  it('email getter called', () => {
    component.ngOnInit();
    expect(component.emailControl.value).toBe(undefined);
  });

  it('onSubmit called without filling the form', () => {
    component.ngOnInit();
    component.onSubmit();
    expect(component.userForm.valid).toBe(false);
    expect(component.showSubmitErrorMessage).toBe(true);
    expect(component.userForm.reset).toHaveBeenCalledTimes(0);
  });

  it('onSubmit called with valid form', () => {
    component.ngOnInit();
    const addUserSpy = spyOn(userDataService, 'addUser');
    component.onSubmit();
    expect(addUserSpy).toHaveBeenCalled();
    expect(component.userForm.valid).toBeTrue();
    expect(component.userForm.reset).toHaveBeenCalled();
  });
});
