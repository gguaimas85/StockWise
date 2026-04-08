import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClosingsPage } from './register-closings-page';

describe('RegisterClosingsPage', () => {
  let component: RegisterClosingsPage;
  let fixture: ComponentFixture<RegisterClosingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterClosingsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClosingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
