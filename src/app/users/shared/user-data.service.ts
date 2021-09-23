import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserDetailsModel } from '../user-details.model';
import { DataConstants } from './data-constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public usersList: UserDetailsModel[];
  private data = new Subject();
  public currentUsersList = this.data.asObservable();

  constructor() {
    this.usersList = [];
    DataConstants.users.forEach((user) => {
      this.usersList.push(JSON.parse(user));
    });
  }

  public addUser(user: FormGroup) {
    this.usersList.push(user.value);
    this.data.next(this.usersList);
  }

  public getUsersList() {
    return this.usersList;
  }
}
