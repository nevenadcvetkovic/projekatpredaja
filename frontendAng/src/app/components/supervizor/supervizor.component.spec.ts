import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervizorComponent } from './supervizor.component';

describe('SupervizorComponent', () => {
  let component: SupervizorComponent;
  let fixture: ComponentFixture<SupervizorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervizorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervizorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
