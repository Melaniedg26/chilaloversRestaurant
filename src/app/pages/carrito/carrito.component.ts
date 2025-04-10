import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
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
  productosService = inject(ProductosService);
  perfilService=inject(PerfilService);
  router=inject(Router);

  productosCarrito: Producto[] = [];

subtotal=0;
delivery=30;
total=0;

@ViewChild("dialog") dialog!:ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosService.getById(itemCarrito.idProducto)
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

  async enviarMensaje(){
    let pedido=""
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto=await this.productosService.getById(this.cartService.carrito[i].idProducto)
pedido += `*${this.cartService.carrito[i].cantidad} X ${producto?.nombre} `

      
    }
    const mensaje=
`Hola buen dia!, soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
${pedido}
Cualquier modificacion este es mi numero ${this.perfilService.perfil()?.telefono},
La direccion de envio es: ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega},
Muchas gracias!`

const link= `https://wa.me/+526441965460?text=${encodeURI(mensaje)}`
window.open(link, "_blank");
this.dialog.nativeElement.showModal();
}

finalizarPedido(){
  this.cartService.vaciar();
  this.dialog.nativeElement.close();
  this.router.navigate(['/']);
}

editarPedido(){
this.dialog.nativeElement.close();
}

  
}
