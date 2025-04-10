import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carrito';
import { isBrowser } from '../utils/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carrito: Cart[] = [];

  constructor() {
    if (isBrowser()) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.carrito = JSON.parse(cart);
      }
    }
  }

  agregarProducto(idProducto: number, cantidad: number, notas: string) {
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto);
    if (i === -1) {
      const nuevoProducto: Cart = { idProducto, cantidad, notas };
      this.carrito.push(nuevoProducto);
    } else {
      this.carrito[i].cantidad += cantidad;
    }
    this.actualizarAlmacenamiento();
  }

  eliminarProducto(idProducto: number) {
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    if (isBrowser()) {
      if (this.carrito.length === 0) {
        localStorage.removeItem("cart");
      } else {
        this.actualizarAlmacenamiento();
      }
    }
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number) {
    this.carrito = this.carrito.map(producto => {
      if (producto.idProducto === idProducto) producto.cantidad = cantidad;
      return producto;
    });
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento() {
    if (isBrowser()) {
      localStorage.setItem("cart", JSON.stringify(this.carrito));
    }
  }
}