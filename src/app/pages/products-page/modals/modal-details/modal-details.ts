import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDB } from '@app/models/productDB.model';

@Component({
  selector: 'app-modal-details',
  imports: [CommonModule],
  templateUrl: './modal-details.html',
  styleUrl: './modal-details.css',
})
export class ModalDetails {
  // Input para recibir si el modal debe mostrarse
  @Input() isVisible: boolean = false;
  // Output para notificar al componente padre que se debe cerrar
  @Output() close = new EventEmitter<void>();
  @Input() detailProduct: ProductDB | undefined;

  /**
   * Cierra el modal y emite el evento 'close'.
   */
  closeModal(): void {
    this.close.emit();
  }
}
