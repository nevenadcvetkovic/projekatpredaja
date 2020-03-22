import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayGameComponent } from './day-game.component';

describe('DayGameComponent', () => {
  let component: DayGameComponent;
  let fixture: ComponentFixture<DayGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
