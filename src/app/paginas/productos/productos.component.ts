import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../servicios/product.service';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritoService } from '../../servicios/favorito.service';
import { Producto } from '../../modelos/producto.model';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

 // Lista de productos obtenidos desde el backend.
  productos: Producto[] = [];

  // Estado de carga
  cargando = true;

  // Error
  error = '';

  constructor(
    private productService: ProductService,
    private carritoService: CarritoService,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.obtenerProductos().subscribe({
      next: (res: any) => {
        this.productos = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto).subscribe({
      next: () => console.log('Producto agregado'),
      error: err => console.error(err)
    });
  }

  agregarAFavoritos(producto: Producto): void {
    this.favoritoService.agregarFavorito(producto).subscribe({
      next: () => console.log('Agregado'),
      error: err => console.error(err)
    });
  }
  //Filtros

  searchTerm: string = '';
  selectedGenre: string = '';
  minPrecio: number | null = null;
  maxPrecio: number | null = null;

  OnSearch(event: Event): void {
    event.preventDefault();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedGenre = '';
    this.minPrecio = null;
    this.maxPrecio = null;
  }

  // Productos filtrados según los criterios
  get filteredProducts(): Producto[] {
    return this.productos.filter(p =>
      (this.searchTerm === '' ||
        p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) &&
      (this.minPrecio === null || p.precio >= this.minPrecio) &&
      (this.maxPrecio === null || p.precio <= this.maxPrecio)
    );
  }
}

