import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseIcon } from './house-icon';

describe('HouseIcon', () => {
  let component: HouseIcon;
  let fixture: ComponentFixture<HouseIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
