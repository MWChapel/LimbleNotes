import { Injectable } from '@angular/core';

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
   * @return {*}  {{ userID: number, name: string }[]}
   * @memberof UserLookupService
   */
  getUsers(): { userID: number, name: string }[] {
    return [
      {'userID' : 1, 'name' : 'Kevin'},
      {'userID' : 2, 'name' : 'Jeff'},
      {'userID' : 3, 'name' : 'Bryan'},
      {'userID' : 4, 'name' : 'Gabbey'},
    ]
  }
} 