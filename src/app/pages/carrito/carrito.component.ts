import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  headerService=inject(HeaderService);
  cartService=inject(CartService);
  
ngOnInit(): void {
this.headerService.titulo.set("Carrito");
}

eliminarProducto(idProducto:number){
  this.cartService.eliminarProducto(idProducto);
}
}
