import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoVolumeComponent } from './crypto-volume.component';

describe('CryptoVolumeComponent', () => {
  let component: CryptoVolumeComponent;
  let fixture: ComponentFixture<CryptoVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
