import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from './add-comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserDropdownModule } from '../user-dropdown/user-dropdown.module'

/**
 * This create the AddCommentModule
 *
 * @export
 * @class AddCommentModule
 */
@NgModule({
  imports: [CommonModule, FontAwesomeModule, UserDropdownModule],
  exports: [AddCommentComponent],
  declarations: [AddCommentComponent]
})
export class AddCommentModule { }
