import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MessageHistoryService } from './services/message-history.service';
import { NotificationService } from './services/notification.service';

import { MessageTableModule } from './message-table/message-table.module';
import { AddCommentModule } from './add-comment/add-comment.module';
import { IUserMessage } from './shared/interfaces';
import { IMessageContent } from './shared/interfaces';
import { IUserList } from './shared/interfaces';

/**
 * AppComponent
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MessageTableModule, AddCommentModule],
  providers: [MessageHistoryService, NotificationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private messageHistoryService: MessageHistoryService,
    private notificationService: NotificationService
  ) {}

  //Set the title
  title = 'Limble Test';
  // Fetch the existing messages
  messages: IMessageContent[] = this.messageHistoryService.getHistory() || [];

  /**
   * addMessage adds a message to the message list
   *
   * @param {IUserMessage} message
   * @memberof AppComponent
   */
  addMessage(message: IUserMessage): void {
    // check for a @user here, to format the message
    const users: IUserList[] = message.users || [];
    let incomingMessage = message.message;
    // Send a notification to each user
    users.forEach((user) => {
      if(incomingMessage.includes(`@${user.name}`)) {
        this.notificationService.notifyUser({name:  user.name, userID:  user.userID }, incomingMessage);
      }
    })
    // Update the message to show metadata
    users.forEach((user) => {
      incomingMessage = incomingMessage.replace(`@${user.name}`, `<strong>@${user.name}</strong>`);
    })
    // push the new message to the list of messages
    this.messages.push({
      body: incomingMessage,
      date: `System - ${new Date().toLocaleString()}`,
    })
  }
}
