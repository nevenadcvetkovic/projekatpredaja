import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestingGeographyComponent } from './interesting-geography.component';

describe('InterestingGeographyComponent', () => {
  let component: InterestingGeographyComponent;
  let fixture: ComponentFixture<InterestingGeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestingGeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestingGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
