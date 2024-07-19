import { Component, EventEmitter, Input, Output, ViewChildren, ElementRef, QueryList, HostListener } from '@angular/core';
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
  activeIndex = 0;

  @ViewChildren("listItems") listItems: QueryList<ElementRef> | undefined;

  @Input() users: IUserList[] = [];

  @Output()
  selectUser: EventEmitter<IUserList>;

  // Create a dorpdown menu keyboard navigation that include traversing the menu to make active
  // and focus
  @HostListener('keydown', ['$event'])
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
      this.selectItem(this.users[this.activeIndex])
    }

    // Stop any key propagation
    event.stopPropagation();
    return false;
  }


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
   * selectItem is used to select a user clicked in the dropdown menu
   *
   * @param {IUserList} user
   * @memberof UserDropdownComponent
   */
  selectItem(user: IUserList) {
    this.selectUser.emit(user);
  }
}
