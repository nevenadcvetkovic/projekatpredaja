import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecretQuestionComponent } from './user-secret-question.component';

describe('UserSecretQuestionComponent', () => {
  let component: UserSecretQuestionComponent;
  let fixture: ComponentFixture<UserSecretQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSecretQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSecretQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
