import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MessageHistoryService } from './services/message-history.service';
import { NotificationService } from './services/notification.service';

import { MessageTableModule } from './message-table/message-table.module';
import { AddCommentModule } from './add-comment/add-comment.module';
import { IUserMessage } from './shared/interfaces';
import { IMessageContent } from './shared/interfaces';

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
    const user = message.userName;
    let incomingMessage = message.message;
    // if @user is set, remove the user ID and format it seprately
    if(user) {
      incomingMessage = incomingMessage.replace(`@${user}`, '');
      // call the user callback to simulate a message to the @user
      this.notificationService.notifyUser({name:  message.userName, userID: message.userID }, incomingMessage)
    }
    // push the new message to the list of messages
    this.messages.push({
      body: incomingMessage,
      date: `System - ${new Date().toLocaleString()}`,
      userName: user ? `@${user}` : ''
    })
  }
}
