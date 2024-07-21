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
  inputDisabled = false;
  userValues: IUserList[] = [];
  inputValue = '';
  atUserName = '';
  atUserID = 0;

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
        userName: this.atUserName,
        userID: this.atUserID,
        message: this.inputValue
      }
    )
    this.inputValue = '';
    this.atUserID = 0;
    this.atUserName = '';
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
    this.inputDisabled = false;
  }

  /**
   * addUser is called from the drop down menu
   *
   * @param {IUserList} user
   * @memberof AddCommentComponent
   */
  addUser(user: IUserList): void {
    this.inputValue = `@${user.name} `
    this.atUserName = user.name;
    this.atUserID = user.userID;
    this.inputDisabled = false;
    // Focus on the message input
    setTimeout(()=>{
      this.inputElement?.nativeElement.focus();
    },0);
  }

  /**
   * updateMessage updates the message as the user types
   *
   * @param {*} event
   * @memberof AddCommentComponent
   */
  updateMessage(event: Event ): void {  
    this.inputValue = (event.target as HTMLInputElement).value;

    // check to see if the first character is a @ trigger
    if(this.inputValue === '@') {
      this.inputDisabled = true;
      this.userValues = this.userLookupService.getUsers();
    }

    // Check to see if the user ID was cleared out and clean out the user metadata
    if(!this.inputValue.includes(`@${this.atUserName}`)) {
      this.atUserName = '';
      this.atUserID = 0;
    }
  }
}
