import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, HttpClientModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosServide = inject(ProductosService);

  productosCarrito: Producto[] = [];

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosServide.getById(itemCarrito.idProducto)
      if (res) this.productosCarrito.push(res);
    })
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
  }
}
