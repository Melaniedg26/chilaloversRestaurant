import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { RouterModule } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, HttpClientModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosServide = inject(ProductosService);
  perfilService=inject(PerfilService);

  productosCarrito: Producto[] = [];

subtotal=0;
delivery=30;
total=0;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosServide.getById(itemCarrito.idProducto)
      if (res) this.productosCarrito.push(res);
      this.calcularInformacion();
    })
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion(){
    this.subtotal=0;
  for (let i = 0; i < this.cartService.carrito.length; i++) {
    this.subtotal+=this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
  }
  this.total=this.subtotal+this.delivery;
  }

  cambiarCantidadProducto(id:number, cantidad:number){
    this.cartService.cambiarCantidadProducto(id,cantidad);
    this.calcularInformacion();
  }
}
