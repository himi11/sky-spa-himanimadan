import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { SkyValidators } from '@skyux/validation';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html'
})
export class InputDetailsComponent implements OnInit {
  public userForm: FormGroup;
  public showSubmitErrorMessage: boolean;
  public maxDateInDob: Date;

  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) {}

  public ngOnInit(): void {
    this.maxDateInDob = new Date(new Date().getDate() + 1);
    this.showSubmitErrorMessage = false;
    this.initUserForm();
  }

  public get emailControl(): AbstractControl {
    return this.userForm.get('emailId');
  }
  public get phoneControl(): AbstractControl {
    return this.userForm.get('phoneNumber');
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.userDataService.addUser(this.userForm);
      this.userForm.reset();
      this.showSubmitErrorMessage = false;
    } else {
      this.showSubmitErrorMessage = true;
    }
  }

  private initUserForm(): void {
    this.userForm = this.formbuilder.group({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      dateOfBirth: new FormControl(undefined),
      emailId: new FormControl(undefined, [
        Validators.required,
        SkyValidators.email
      ]),
      phoneNumber: new FormControl(undefined),
      address: new FormControl(undefined)
    });
  }
}
