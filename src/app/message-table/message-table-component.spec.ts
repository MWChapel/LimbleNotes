
import { TestBed } from '@angular/core/testing';
import { MessageTableComponent } from './message-table.component';
import { MessageTableModule } from './message-table.module'


describe('MessageTableComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTableModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MessageTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the table with default values', () => {
    const fixture = TestBed.createComponent(MessageTableComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.messageContent = [
      {
          "body": "This Task was assigned to Daryl Babb",
          "date": "System - 7/18/2024, 9:00:00 AM"
      }
  ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.message-body-class')?.textContent).toContain('This Task was assigned to Daryl Babb');
    expect(compiled.querySelector('.date-class')?.textContent).toContain('System - 7/18/2024, 9:00:00 AM');
  });

  it('should render the table with user values', () => {
    const fixture = TestBed.createComponent(MessageTableComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.messageContent = [
      {
          "body": "This Task was assigned to Daryl Babb",
          "userName": "@Kevin",
          "date": "System - 7/18/2024, 9:00:00 AM"
      }
  ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.message-body-class')?.textContent).toContain('This Task was assigned to Daryl Babb');
    expect(compiled.querySelector('.name-class')?.textContent).toContain('@Kevin');
    expect(compiled.querySelector('.date-class')?.textContent).toContain('System - 7/18/2024, 9:00:00 AM');
  });
  
});
