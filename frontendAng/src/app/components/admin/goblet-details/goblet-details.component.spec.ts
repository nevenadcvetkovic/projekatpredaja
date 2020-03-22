import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GobletDetailsComponent } from './goblet-details.component';

describe('GobletDetailsComponent', () => {
  let component: GobletDetailsComponent;
  let fixture: ComponentFixture<GobletDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GobletDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GobletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
