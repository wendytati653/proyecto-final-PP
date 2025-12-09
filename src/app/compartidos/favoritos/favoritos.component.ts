import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  favoritos: any[] = [];
  cargando = false;
  error = '';

  constructor() {}

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  // Obtener favoritos (conectalo a tu API si querés)
  obtenerFavoritos() {
    this.cargando = true;

    // Simulación mientras conectás API
    setTimeout(() => {
      this.favoritos = [
        {
          id_favorito: 1,
          nombre: 'Producto ejemplo',
          descripcion: 'Descripción del producto',
          precio: 2500,
          imagen: 'producto.jpg'
        }
      ];
      this.cargando = false;
    }, 800);
  }

  // Agregar al carrito
  agregarAlCarrito(producto: any) {
    console.log("Agregado al carrito:", producto);
    // Aquí conectar a tu API real
  }

  // Eliminar favorito
  eliminarFavorito(id: number) {
    console.log("Eliminando favorito con ID:", id);

    // Quitarlo de la lista visual
    this.favoritos = this.favoritos.filter(f => f.id_favorito !== id);

    // Aquí conectar a la API:
    // this.miServicio.eliminarFavorito(id).subscribe(...)
  }

}
