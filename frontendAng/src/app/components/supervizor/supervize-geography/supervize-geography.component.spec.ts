import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervizeGeographyComponent } from './supervize-geography.component';

describe('SupervizeGeographyComponent', () => {
  let component: SupervizeGeographyComponent;
  let fixture: ComponentFixture<SupervizeGeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervizeGeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervizeGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
