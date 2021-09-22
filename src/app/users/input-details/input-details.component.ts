import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkyValidators } from '@skyux/validation';
import { UserDataService } from '../shared/user-data.service';


@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html'
})
export class InputDetailsComponent {

  protected userForm :FormGroup;

  constructor(private formbuilder:FormBuilder, private userDataService: UserDataService ) {
  }

  ngOnInit(): void {
    this.initUserForm();
  }

  public onSubmit() {
    this.userDataService.addUser(this.userForm)
    this.userForm.reset();

  }

  public get emailControl(): AbstractControl {
    return this.userForm.get('emailId');
  }
  public get phoneControl(): AbstractControl {
    return this.userForm.get('phoneNumber');
  }

  private initUserForm() {
    this.userForm = this.formbuilder.group({
      firstName : new FormControl(null, Validators.required),
      lastName : new FormControl(null, Validators.required),
      dateOfBirth : new FormControl(),
      emailId : new FormControl(null, [
        Validators.required,
        SkyValidators.email
      ]),
      phoneNumber: new FormControl(null),
      address: new FormControl()
    });
  }
}
