
import { TestBed } from '@angular/core/testing';
import { UserDropdownComponent } from './user-dropdown.component';
import { UserDropdownModule } from './user-dropdown.module'


describe('UserDropdownComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDropdownModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserDropdownComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the table with default values', () => {
    const fixture = TestBed.createComponent(UserDropdownComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.users = [
      {'userID' : 1, 'name' : 'Kevin'}
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-item')?.textContent).toContain('Kevin');
  });

  it('should test if emiiter is called', () => {
    const fixture = TestBed.createComponent(UserDropdownComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(app.selectUser, 'emit');
    app.users = [
      {'userID' : 1, 'name' : 'Kevin'}
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-item')?.textContent).toContain('Kevin');
    const item = compiled.querySelector('.user-item');
    item?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(app.selectUser.emit).toHaveBeenCalledWith({userID: 1, name: 'Kevin'});
  });
});
