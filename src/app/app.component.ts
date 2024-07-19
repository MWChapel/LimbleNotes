import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MessageHistoryService } from './services/message-history.service';

import { MessageTableModule } from './message-table/message-table.module';
import { AddCommentModule } from './add-comment/add-comment.module';
import { IUserList } from './shared/interfaces';
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
  providers: [MessageHistoryService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private messageHistoryService: MessageHistoryService
  ) {}

  //Set the title
  title = 'Limble Test';
  // Fetch the existing messages
  messages: IMessageContent[] = this.messageHistoryService.getHistory() || [];

  /**
   * userCallback is used to contact the @user when it's called
   *
   * @param {IUserList} user
   * @param {string} message
   * @memberof AppComponent
   */
  userCallback(user: IUserList, message: string) {
    setTimeout(function(){
      alert(`Calling User: ID:${user.userID} Name:${user.name} Message:${message}`);
    }, 1000);
  }

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
      this.userCallback({name:  message.userName, userID: message.userID }, incomingMessage)
    }
    // push the new message to the list of messages
    this.messages.push({
      body: incomingMessage,
      date: `System - ${new Date().toLocaleString()}`,
      userName: user ? `@${user}` : ''
    })
  }
}
