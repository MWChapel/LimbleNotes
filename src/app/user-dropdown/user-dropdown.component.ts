import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { IUserList } from '../shared/interfaces';

/**
 * UserDropdownComponent
 *
 * @export
 * @class UserDropdownComponent
 */
@Component({
  selector: 'user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: [ './user-dropdown.component.css' ]
})
export class UserDropdownComponent {
  faUser = faUser
  @Input() users: IUserList[] = [];

  @Output()
  selectUser: EventEmitter<IUserList>;

  constructor() {
    this.selectUser = new EventEmitter();
  }

  /**
   * selectItem is used to select a user clicked in the dropdown menu
   *
   * @param {IUserList} user
   * @memberof UserDropdownComponent
   */
  selectItem(user: IUserList) {
    this.selectUser.emit(user);
  }
}
