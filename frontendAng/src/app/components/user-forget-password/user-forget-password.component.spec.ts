import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgetPasswordComponent } from './user-forget-password.component';

describe('UserForgetPasswordComponent', () => {
  let component: UserForgetPasswordComponent;
  let fixture: ComponentFixture<UserForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
