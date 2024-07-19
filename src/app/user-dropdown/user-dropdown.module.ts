import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDropdownComponent } from './user-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * This create the UserDropdownModule
 *
 * @export
 * @class UserDropdownModule
 */
@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [UserDropdownComponent],
  declarations: [UserDropdownComponent]
})
export class UserDropdownModule {}
