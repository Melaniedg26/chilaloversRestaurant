import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';
import { ConfigService } from '../../core/services/config.service';


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
  perfilService = inject(PerfilService);
  configService = inject(ConfigService);
  router = inject(Router);

  productosCarrito: WritableSignal<Producto[]> = signal([]);

  subtotal = 0;
  total = 0;

  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");

    if (!this.cartService.carrito || this.cartService.carrito.length === 0) {
      this.cartService.carrito = [];
      return;
    }

    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosService.getById(itemCarrito.idProducto)
      if (res) this.productosCarrito.set([...this.productosCarrito(), res]);
      this.calcularInformacion();
    })
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion() {
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto = this.productosCarrito()[i];
      if (producto) {
        this.subtotal += this.productosCarrito()[i].precio * this.cartService.carrito[i].cantidad;
      }
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
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
