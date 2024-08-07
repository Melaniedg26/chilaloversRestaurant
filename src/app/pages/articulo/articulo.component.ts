import { Component, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss'
})
export class ArticuloComponent {
  headerService=inject(HeaderService);
  productosService=inject(ProductosService);

  producto?: Producto;
  cantidad=signal(1);

ngOnInit(): void {
this.headerService.titulo.set("Articulo");
}

constructor(private ac:ActivatedRoute){
  ac.params.subscribe(param=>{
    if(param['id']){
this.productosService.getById(param['id']).then(producto=>{
this.producto=producto;
this.headerService.titulo.set(producto!.nombre);
})
    }
  })
}
}
