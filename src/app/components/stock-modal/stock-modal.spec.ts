import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModal } from './stock-modal';

describe('StockModal', () => {
  let component: StockModal;
  let fixture: ComponentFixture<StockModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
