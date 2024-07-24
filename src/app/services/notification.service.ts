import { Injectable } from '@angular/core';

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
  notifyUser(users: string[], message: string) {
    setTimeout(function(){
      alert(`Calling User: User Name: ${users} Message:${message}`);
    }, 1000);
  }
} 