import { Component, EventEmitter, Input, Output, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
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
export class UserDropdownComponent implements AfterViewInit {
  faUser = faUser
  activeIndex = 0;

  // Setup element refs on the dropdown menu
  @ViewChildren("listItems") listItems: QueryList<ElementRef> | undefined;

  @Input() users: IUserList[] = [];

  @Output()
  selectUser: EventEmitter<IUserList>;

  ngAfterViewInit() {
    // After the render set the focus on the first item in the list
    if (this.listItems) {
      this.listItems.forEach((item, index) => {
        if(index === this.activeIndex) {
          item.nativeElement.focus()
        }
      });
    }
  }
  
  constructor() {
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

    // Stop any key propagation
    event.stopPropagation();
    return false;
  }
}
