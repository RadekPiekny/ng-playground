import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathtestComponent } from './pathtest.component';

describe('PathtestComponent', () => {
  let component: PathtestComponent;
  let fixture: ComponentFixture<PathtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
