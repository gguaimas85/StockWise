import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductApiService } from '../../services/products.service';
import { ModalDetails } from './modals/modal-details/modal-details';
import { ModalEdit } from './modals/modal-edit/modal-edit';
import { CommonModule } from '@angular/common';
import { ModalNewProduct } from './modals/modal-new-product/modal-new-product';
import { ProductDB } from '@app/models/productDB.model';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-products-page',
  imports: [ModalDetails, ModalEdit, CommonModule, ModalNewProduct],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  productsList: ProductDB[] = [];
  //Estados para mostrar/ocultar los diferentes modals
  showModalDetail: boolean = false;
  showModalConfirm: boolean = false;
  showModalEdit: boolean = false;
  showModalNewProduct: boolean = false;

  // Control para el input search
  searchControl = new FormControl('');

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  // Datos a mostrar en la página actual
  paginatedItems: ProductDB[] = [];
  // Array para generar los botones de la paginación en product-page
  pageNumbers: number[] = [];

  producDetail: ProductDB = {
    ID: 0,
    NOMBRE: '',
    DESCRIPCION: '',
    CATEGORIA: '',
    PRECIO: 0,
    ACTIVE: false,
  };

  //Lista que se mostrará y actualizará
  itemsFiltrados: ProductDB[] = [...this.productsList];

  constructor(private _apiProducts: ProductApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllProducts();

    // Escuchar los cambios del input de búsqueda
    this.searchControl.valueChanges
      .pipe(
        // Solo emite si el valor actual es diferente al último valor emitido
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        // Llamar a la función de filtrado cada vez que cambie el valor
        this.filterItems(searchTerm || ''); // Usa cadena vacía si es nulo
      });
  }

  getAllProducts() {
    this._apiProducts.getAllProductsAPI().subscribe({
      next: (data) => {
        this.productsList = data;
        this.itemsFiltrados = [...this.productsList];
        this.totalItems = data.length;

        this.calculateTotalPages();
        this.goToPage(this.currentPage);

        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModalDetail(product: ProductDB): void {
    this.showModalDetail = true;
    this.producDetail = product;
  }

  closeModalDetail(): void {
    this.showModalDetail = false;
  }

  updateStatusProduct(id: number): void {
    this._apiProducts.updateProductStatusAPI(id).subscribe({
      next: (data) => {
        this.getAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModalEdit(product: ProductDB): void {
    this.showModalEdit = true;
    this.producDetail = product;
  }

  closeModalEdit(): void {
    this.showModalEdit = false;
  }

  recargarDatosPadre(exito: boolean): void {
    this.showModalEdit = false; // Oculta el componente modal

    if (exito) {
      // Actualizacion de la tabla con los datos nuevos
      this.getAllProducts();
      this.paginatedItems = this.productsList
    }
  }

  openModalNewProduct(): void {
    this.showModalNewProduct = true;
  }

  closeModalNewProduct(): void {
    this.showModalNewProduct = false;
  }

  recargarDatosPadreNewProduct(exito: boolean): void {
    this.showModalNewProduct = false; // Oculta el componente modal

    if (exito) {
      // Actualizacion de la tabla con los datos nuevos
      this.getAllProducts();
    }
  }

  filterItems(termino: string): void {
    const termUpperCase = termino.toUpperCase();
    console.log(termUpperCase);

    if (!termUpperCase) {
      // Si el término está vacío, muestra la lista original completa
      this.itemsFiltrados = [...this.productsList];
      console.log(this.itemsFiltrados);
      return;
    }

    // Filtra la lista original
    this.itemsFiltrados = this.productsList.filter((item) =>
      item.NOMBRE.toLocaleUpperCase().includes(termUpperCase)
    );

    console.log(this.itemsFiltrados);
  }

  // Calcula el número total de páginas y genera el array de botones
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pageNumbers = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  // Lógica principal para cambiar de página
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Previene ir a páginas inválidas
    }
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Lógica para obtener el subconjunto de datos (slice)
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Asigna el subconjunto de MOCK_DATA al array de la vista
    this.paginatedItems = this.productsList.slice(startIndex, endIndex);
    console.log(this.productsList);
  }

  // Métodos de navegación (Siguiente/Anterior)
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
