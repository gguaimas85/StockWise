import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewProduct } from './modal-new-product';

describe('ModalNewProduct', () => {
  let component: ModalNewProduct;
  let fixture: ComponentFixture<ModalNewProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
