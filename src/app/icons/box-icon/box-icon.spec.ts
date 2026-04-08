import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxIcon } from './box-icon';

describe('BoxIcon', () => {
  let component: BoxIcon;
  let fixture: ComponentFixture<BoxIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
