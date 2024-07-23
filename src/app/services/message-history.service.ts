import { Injectable } from '@angular/core';
import { IMessageContent } from '../shared/interfaces';
import { IUserList } from '../shared/interfaces';
import { IUserMessage } from '../shared/interfaces';

/**
   * MessageHistoryService
   *
   * @export
   * @class MessageHistoryService
   */
@Injectable()
export class MessageHistoryService {

  // Static history of messages
  messages: IMessageContent[] = [
    {
        "body": "This Task was assigned to Daryl Babb",
        "date": "System - 7/18/2024, 9:00:00 AM"
    },
    {
        "body": "Waiting on parts",
        "date": "System - 7/18/2024, 9:30:00 AM"
    }
  ];

  /**
   * getHistory returns the default test message history
   *
   * @return {*}  {IMessageContent[]}
   * @memberof MessageHistoryService
   */
  getHistory(): IMessageContent[] {
    return this.messages
  }

  /**
    * addMessage Add a message and return a the message list
    *
    * @param {IUserMessage} message
    * @return {*}  {IMessageContent[]}
    * @memberof MessageHistoryService
    */
  addMessage(message: IUserMessage): IMessageContent[] {
    // check for a @user here, to format the message
    const users: IUserList[] = message.users || [];
    let incomingMessage = message.message;
    // Update the message to show metadata
    users.forEach((user) => {
      incomingMessage = incomingMessage.replaceAll(`@${user.name}`, `<strong>@${user.name}</strong>`);
    })
    // push the new message to the list of messages
    this.messages.push({
      body: incomingMessage,
      date: `System - ${new Date().toLocaleString()}`,
    })

    return this.messages
  }
} 