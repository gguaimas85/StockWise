import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIcon } from './profile-icon';

describe('ProfileIcon', () => {
  let component: ProfileIcon;
  let fixture: ComponentFixture<ProfileIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
