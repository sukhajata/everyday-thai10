import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsPage } from './totals.page';

describe('TotalsPage', () => {
  let component: TotalsPage;
  let fixture: ComponentFixture<TotalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
