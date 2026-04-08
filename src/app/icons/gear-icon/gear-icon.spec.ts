import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearIcon } from './gear-icon';

describe('GearIcon', () => {
  let component: GearIcon;
  let fixture: ComponentFixture<GearIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
