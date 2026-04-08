import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserIcon } from './add-user-icon';

describe('AddUserIcon', () => {
  let component: AddUserIcon;
  let fixture: ComponentFixture<AddUserIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
