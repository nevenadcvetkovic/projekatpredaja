import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GobletComponent } from './goblet.component';

describe('GobletComponent', () => {
  let component: GobletComponent;
  let fixture: ComponentFixture<GobletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GobletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GobletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
