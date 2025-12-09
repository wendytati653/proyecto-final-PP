import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  // URL base para todas las rutas relacionadas con "favoritos".
  // En el backend deberías tener rutas como:
  // GET    /favoritos
  // POST   /favoritos/agregar
  // DELETE /favoritos/eliminar/:id
  private apiUrl = 'http://localhost/api_proyecto/public/favoritos';

  constructor(private http: HttpClient) {}

  // -------------------------------------------------------------------
  // Genera los headers con el token del usuario para llamadas protegidas.
  // Se valida que localStorage exista (útil si Angular renderiza en servidor).
  // -------------------------------------------------------------------
  private getAuthHeaders(): HttpHeaders {
    const token = (typeof localStorage !== 'undefined')
      ? localStorage.getItem('token') || ''
      : '';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // =======================================================
  // OBTENER TODOS LOS FAVORITOS DEL USUARIO
  // GET /favoritos
  // =======================================================
  obtenerFavoritos(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // =======================================================
  // AGREGAR UN PRODUCTO A FAVORITOS
  // POST /favoritos/agregar
  // Body: { id_producto: number }
  // =======================================================
  agregarFavorito(producto: any): Observable<any> {
    const body = { id_producto: producto.id };

    return this.http.post(
      `${this.apiUrl}/agregar`,
      body,
      { headers: this.getAuthHeaders() }
    );
  }

  // =======================================================
  // ELIMINAR UN PRODUCTO DE FAVORITOS
  // DELETE /favoritos/eliminar/:idProducto
  // =======================================================
  eliminarFavorito(idProducto: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/eliminar/${idProducto}`,
      { headers: this.getAuthHeaders() }
    );
  }

}
