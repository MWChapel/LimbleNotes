import { Injectable } from '@angular/core';
import { IUserList } from '../shared/interfaces';

/**
   * NotificationService
   *
   * @export
   * @class NotificationService
   */
@Injectable()
export class NotificationService {
  /**
   * notifyUser is used to contact the @user when it's called
   *
   * @param {IUserList} user
   * @param {string} message
   * @memberof AppComponent
   */
  notifyUser(user: IUserList, message: string) {
    setTimeout(function(){
      alert(`Calling User: ID:${user.userID} Name:${user.name} Message:${message}`);
    }, 1000);
  }
} 