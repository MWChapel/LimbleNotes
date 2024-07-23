import { Component, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';
import { UserLookupService } from '../services/user-lookup.service';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { IUserList } from '../shared/interfaces';
import { IUserMessage } from '../shared/interfaces';

/**
 * AddCommentComponent
 *
 * @export
 * @class PolicySubmitterComponent
 */
@Component({
  providers: [UserLookupService],
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: [ './add-comment.component.css' ]
})
export class AddCommentComponent {

  // Create a elecment reference to the input for focusing
  @ViewChild('userInput') inputElement: ElementRef | undefined;

  // Create the output emitter
  @Output()
  addMessage: EventEmitter<IUserMessage>;

  constructor(
    private userLookupService: UserLookupService
  ) { 
    this.addMessage = new EventEmitter();
  }

  faComment = faComment;
  faCamera = faCamera;
  showInput = false;
  submitDisabled = false;

  userValues: IUserList[] = [];
  atUsers: IUserList[] = [];
  
  inputValue = '';

  /**
   * openEditer open the input field and the submit and cancel buttons
   *
   * @memberof AddCommentComponent
   */
  openEditer(): void {
    this.showInput = true;
    this.inputValue = '';
    // Focus on the message input
    setTimeout(()=>{
      this.inputElement?.nativeElement.focus();
    },0);
  }

  /**
   * submitMessage submit the message to add to the messge list, and clears out the values
   *
   * @memberof AddCommentComponent
   */
  submitMessage(): void {
    //ignore return submit on an empty message
    if(!this.inputValue) return;
    
    // Callback emitter to set the new message
    this.addMessage.emit(
      {
        users: this.atUsers,
        message: this.inputValue
      }
    )
    this.inputValue = '';
    this.atUsers = [];
    // Focus on the message input
    setTimeout(()=>{
      this.inputElement?.nativeElement.focus();
    },0);
  }

  /**
   * cancel close the editor
   *
   * @memberof AddCommentComponent
   */
  cancel(): void {
    this.showInput = false;
    this.submitDisabled = false;
  }

  /**
   * addUser is called from the drop down menu
   *
   * @param {IUserList} user
   * @memberof AddCommentComponent
   */
  addUser(user: IUserList): void {
    if(user && user.name) {
      this.inputValue = `${this.inputValue}${user.name}`
      this.atUsers.push({
        name: user.name,
        userID: user.userID
      })
    } else {
      //Remove the @ from th input if close the dropdown
      this.inputValue = this.inputValue.slice(0, -1);
    }

    this.submitDisabled = false;
    // Focus on the message input
    setTimeout(()=>{
      this.inputElement?.nativeElement.focus();
    },0);
  }

  /**
   * updateMessage updates the message and trigger dropdown if includes @ symbol
   *
   * @param {*} event
   * @memberof AddCommentComponent
   */
  updateMessage(event: Event ): void {  
    this.inputValue = (event.target as HTMLInputElement).value;

    // check to see if the last character is a @ trigger
    if(this.inputValue === '@' || this.inputValue.endsWith(' @')) {
      this.submitDisabled = true;
      this.userValues = this.userLookupService.getUsers();
    }
  }
}
