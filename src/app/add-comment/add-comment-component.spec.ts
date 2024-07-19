
import { TestBed } from '@angular/core/testing';
import { AddCommentComponent } from './add-comment.component';
import { AddCommentModule } from './add-comment.module'


describe('AddCommentComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the input buttons and input', () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.add-comment-input')).toBeDefined();
    expect(compiled.querySelector('.submit-comment-btn')).toBeDefined();
    expect(compiled.querySelector('.cancel-comment-btn')).toBeDefined();
  });
});
