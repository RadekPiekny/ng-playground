import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscissaLineConvertorComponent } from './abscissa-line-convertor.component';

describe('AbscissaLineConvertorComponent', () => {
  let component: AbscissaLineConvertorComponent;
  let fixture: ComponentFixture<AbscissaLineConvertorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbscissaLineConvertorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbscissaLineConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
