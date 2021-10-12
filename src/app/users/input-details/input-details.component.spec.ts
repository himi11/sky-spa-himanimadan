import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser/test-module';
import { expect } from '@skyux-sdk/testing';
import { UserDataService } from '../shared/user-data.service';
import { InputDetailsComponent } from './input-details.component';

describe('Input Details component', () => {
  let userDataService: UserDataService;
  let component: InputDetailsComponent;
  let fixture: ComponentFixture<InputDetailsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
    fixture = TestBed.createComponent(InputDetailsComponent);
    component = fixture.componentInstance;
    userDataService = TestBed.inject(UserDataService);
    fixture.detectChanges();
  });

  afterEach(() => {
    userDataService = undefined;
    component = undefined;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('check form group elements', () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#userForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toBe(6);
  });

  it('check form first name input', fakeAsync(() => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('#userForm');
    const inputElement = formElement.querySelectorAll('input')[0];
    inputElement.value = 'qwert';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const firstNameFromFormGroup = component.userForm.get('firstName');
    expect(firstNameFromFormGroup.value).toBe(inputElement.value);
  }));

  it('ngOnInit called', () => {
    component.ngOnInit();
    const userFormValues: FormGroup = new FormGroup({
      firstName: new FormControl(undefined),
      lastName: new FormControl(undefined),
      address: new FormControl(undefined),
      dateOfBirth: new FormControl(undefined),
      phoneNumber: new FormControl(undefined),
      emailId: new FormControl(undefined)
    });
    expect(component.userForm.value).toEqual(userFormValues.value);
  });

  it('phoneNumber getter called', fakeAsync(() => {
    component.ngOnInit();
    component.userForm = new FormGroup({
      firstName: new FormControl(undefined),
      lastName: new FormControl(undefined),
      address: new FormControl(undefined),
      dateOfBirth: new FormControl(undefined),
      phoneNumber: new FormControl('78787878'),
      emailId: new FormControl('abcwe@gh.com')
    });
    expect(component.phoneControl.value).toBe('78787878');
  }));

  it('email getter called', () => {
    component.ngOnInit();
    component.userForm = new FormGroup({
      firstName: new FormControl(undefined),
      lastName: new FormControl(undefined),
      address: new FormControl(undefined),
      dateOfBirth: new FormControl(undefined),
      phoneNumber: new FormControl(undefined),
      emailId: new FormControl('abcwe@gh.com')
    });
    expect(component.emailControl.value).toBe('abcwe@gh.com');
  });

  it('onSubmit called without filling the form', () => {
    component.ngOnInit();
    component.onSubmit();
    expect(component.userForm.valid).toBe(false);
    expect(component.showSubmitErrorMessage).toBe(true);
  });

  it('onSubmit called with valid form', fakeAsync(() => {
    component.userForm = new FormGroup({
      firstName: new FormControl('afga'),
      lastName: new FormControl('ahjahj'),
      address: new FormControl(undefined),
      dateOfBirth: new FormControl(undefined),
      phoneNumber: new FormControl('78787878'),
      emailId: new FormControl('abcwe@gh.com')
    });
    const addUserSpy = spyOn(userDataService, 'addUser');
    component.onSubmit();
    expect(addUserSpy).toHaveBeenCalled();
    expect(component.userForm.valid).toBeTrue();
  }));
});
