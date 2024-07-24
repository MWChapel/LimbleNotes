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
  viewDrop = false;

  userValues: IUserList[] = [];
  atUsers: IUserList[] = [];

  inputValue = '';
  tokenValue: string[] = [];
  query = '';

  /**
   * checkValue takes the input value an checks if there is a new @ symbol
   *
   * @memberof AddCommentComponent
   */
  _checkValue(): void {
    // Tokenize current value
    let found = false;
    this.tokenValue = this.inputValue.split(' ');
    this.userValues = this.userLookupService.getUsers();
    this.tokenValue.forEach((token) => {
      const newUser = this.userValues.find(testUser => testUser.name ===  token.substring(1));
      if(token.startsWith("@") && !newUser && this.userValues.find(testUser => testUser.name.startsWith(token.substring(1)))) {
        found = true;
        this.query = token.substring(1)
      } else if(token.startsWith("@") && newUser && !this.atUsers.find(testUser => testUser.name === newUser.name)) {
        this.atUsers.push({
          name: newUser.name,
          userID: newUser.userID
        })
        found = false;
      }
    })
    // Open the drop down query
    if(found) {
      this.viewDrop = true;
    } else {
      this.viewDrop = false;
      this.query = ''
    }
  }

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
    this.tokenValue = this.inputValue.split(' ');
    this.userValues = this.userLookupService.getUsers();
    // Check for each user and add to the list
    this.tokenValue.forEach((token, index) => {
      // Replace
      if(token.startsWith("@") && !this.userValues.find(testUser => testUser.name ===  token.substring(1))) {
        this.tokenValue[index] = `@${user.name}`;
        if(!this.atUsers.find(testUser => testUser.name === user.name)) {
          this.atUsers.push({
            name: user.name,
            userID: user.userID
          })
        };
        this.inputValue = this.tokenValue.join(' ');
      }
    })
    this.viewDrop = false;
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
    this._checkValue();
  }
}
