import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIcon } from './table-icon';

describe('TableIcon', () => {
  let component: TableIcon;
  let fixture: ComponentFixture<TableIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
