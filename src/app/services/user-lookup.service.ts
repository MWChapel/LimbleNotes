import { Injectable } from '@angular/core';
import { IUserList } from '../shared/interfaces';

/**
   * UserLookupService
   *
   * @export
   * @class UserLookupService
   */
@Injectable()
export class UserLookupService {
  /**
   * getUsers returns a static test list of users
   *
   * @return {*}  IUserList[]
   * @memberof UserLookupService
   */
  getUsers(): IUserList[] {
    return [
      {'userID' : 1, 'name' : 'Kevin'},
      {'userID' : 2, 'name' : 'Jeff'},
      {'userID' : 3, 'name' : 'Bryan'},
      {'userID' : 4, 'name' : 'Gabbey'},
      {'userID' : 5, 'name' : 'Mike'},
      {'userID' : 6, 'name' : 'Bob'},
      {'userID' : 7, 'name' : 'Joe'},
      {'userID' : 8, 'name' : 'Mark'},
    ]
  }
} 