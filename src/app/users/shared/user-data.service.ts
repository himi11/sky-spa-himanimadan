import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserDetailsModel } from '../models/user-details.model';
import { DataConstants } from './data-constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public usersList: UserDetailsModel[] = [];
  private data = new Subject();
  public currentUsersList = this.data.asObservable();

  constructor() {}

  public addUser(user: FormGroup): void {
    this.usersList.push(user.value);
    this.data.next(this.usersList);
  }

  public getUsersList(): UserDetailsModel[] {
    DataConstants.users.forEach((user) => {
      this.usersList.push(JSON.parse(user));
    });
    this.data.next(this.usersList);
    return this.usersList;
  }
}
