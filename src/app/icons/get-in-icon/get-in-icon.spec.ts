import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInIcon } from './get-in-icon';

describe('GetInIcon', () => {
  let component: GetInIcon;
  let fixture: ComponentFixture<GetInIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetInIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
