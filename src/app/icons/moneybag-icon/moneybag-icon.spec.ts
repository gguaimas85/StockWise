import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneybagIcon } from './moneybag-icon';

describe('MoneybagIcon', () => {
  let component: MoneybagIcon;
  let fixture: ComponentFixture<MoneybagIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneybagIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneybagIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
