import { Component, EventEmitter, Input, Output, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { IUserList } from '../shared/interfaces';

/**
 * UserDropdownComponent
 *
 * @export
 * @class UserDropdownComponent
 */
@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: [ './user-dropdown.component.css' ]
})
export class UserDropdownComponent {
  faUser = faUser
  activeIndex = 0;
  filteredUsers: IUserList[] = [];

  // Setup element refs on the dropdown menu
  @ViewChildren("listItems") listItems: QueryList<ElementRef> | undefined;

  @Input() users: IUserList[] = [];

  @Input() query = '';

  @Output()
  selectUser: EventEmitter<IUserList>;
  
  constructor(private menuRef: ElementRef) {
    this.selectUser = new EventEmitter();
  }

  

  /**
   * onClick is used to select a user clicked in the dropdown menu
   *
   * @param {IUserList} user
   * @memberof UserDropdownComponent
   */
  onClick(user: IUserList) {
    this.selectUser.emit(user);
  }

  // Create a dropdown menu keyboard navigation that include traversing the menu to make active
  // and focus
  onKeydown(event: KeyboardEvent) {

    // Traverse down the list and set the active selection
    if(event.key === 'ArrowDown' && this.activeIndex < this.users.length) {
      ++this.activeIndex;
      const item = this.listItems?.get(this.activeIndex);
      item?.nativeElement.focus()
    }

    // Traverse up the list and set the active selection
    if(event.key === 'ArrowUp' && this.activeIndex > 0) {
      --this.activeIndex;
      const item = this.listItems?.get(this.activeIndex);
      item?.nativeElement.focus()
    }

    // Submit the active selection
    if(event.key === 'Enter') {
      this.onClick(this.users[this.activeIndex])
    }

    // Escape to cancel
    if(event.key === 'Escape') {
      this.selectUser.emit();
    }

    // Stop any key propagation
    event.stopPropagation();
    return false;
  }
}
