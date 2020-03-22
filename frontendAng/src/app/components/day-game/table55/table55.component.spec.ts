import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Table55Component } from './table55.component';

describe('Table55Component', () => {
  let component: Table55Component;
  let fixture: ComponentFixture<Table55Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Table55Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Table55Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
