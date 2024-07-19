import { Injectable } from '@angular/core';
import { IMessageContent } from '../shared/interfaces';

/**
   * MessageHistoryService
   *
   * @export
   * @class MessageHistoryService
   */
@Injectable()
export class MessageHistoryService {
  constructor() {}

  /**
   * getHistory returns the default test message history
   *
   * @return {*}  {IMessageContent[]}
   * @memberof MessageHistoryService
   */
  getHistory(): IMessageContent[] {
    return [
      {
          "body": "This Task was assigned to Daryl Babb",
          "date": "System - 7/18/2024, 9:00:00 AM"
      },
      {
          "body": "Waiting on parts",
          "date": "System - 7/18/2024, 9:30:00 AM"
      }
  ]
  }
} 