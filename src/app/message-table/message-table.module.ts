import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageTableComponent } from './message-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/**
 * Creates the MessageTableModule
 *
 * @export
 * @class MessageTableModule
 */
@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [MessageTableComponent],
  declarations: [MessageTableComponent]
})
export class MessageTableModule { 
}
