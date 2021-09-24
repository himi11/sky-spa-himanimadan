import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DataConstants } from './data-constants';
import { UserDataService } from './user-data.service';

describe('DataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });

    service = TestBed.inject(UserDataService);
  });

  it('addUser called', () => {
    service.usersList = [];
    const mockUserFormGroup = new FormGroup({
      phoneNumber: new FormControl('1233'),
      firstName: new FormControl('aqqw'),
      lastName: new FormControl('tyio'),
      emailId: new FormControl('qww@jk.com'),
      dateOfBirth: new FormControl('12/12/2011')
    });
    service.addUser(mockUserFormGroup);
    expect(service.usersList.length).toBe(1);
  });

  it('getUserList called', () => {
    const usersList = service.getUsersList();
    expect(usersList.length).toBe(DataConstants.users.length);
  });
});
