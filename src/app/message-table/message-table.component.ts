import { Component, Input } from '@angular/core';
import { IMessageContent } from '../shared/interfaces';
import { faComment } from '@fortawesome/free-regular-svg-icons';

/**
 *
 * @export
 * @class MessageTableComponent
 */
@Component({
  selector: 'message-table',
  templateUrl: './message-table.component.html',
  styleUrls: [ './message-table.component.css' ]
})
export class MessageTableComponent {

  // This takes the Message Content as an input
  @Input() messageContent: IMessageContent[] = [];
  faComment = faComment;
}
