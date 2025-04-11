import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carrito';
import { isBrowser } from '../utils/enviroment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carrito: Cart[] = [];

  constructor(private config:ConfigService) {
    if (isBrowser()) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const carritoGuardado=JSON.parse(cart);
        if(carritoGuardado){
          const fechaGuardado=new Date(carritoGuardado.fecha);
          const fecha=new Date();
          if(fecha.getTime()- fechaGuardado.getTime()>1000*60*60*24*this.config.configuracion().diasVencimientoCarrito){
            this.vaciar();
          }else{
            this.carrito=carritoGuardado.productos;
          }
        }
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
    const fecha=new Date();
    const elementoAGuardar={
      fecha,
      productos:this.carrito
    }
    if (isBrowser()) {
      localStorage.setItem("cart", JSON.stringify(elementoAGuardar));
    }
  }

  vaciar(){
    this.carrito=[];
    localStorage.removeItem("cart");
  }
}