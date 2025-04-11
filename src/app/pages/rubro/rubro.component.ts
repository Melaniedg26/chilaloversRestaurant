import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../core/interfaces/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [TarjetaProductoComponent,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent {
  headerService=inject(HeaderService);
  categoriasService=inject(CategoriasService);
  ac=inject(ActivatedRoute);
  productos:WritableSignal<Producto[]>=signal([]);

ngOnInit(): void {
this.ac.params.subscribe(res=>{
if(res['id']){
  this.categoriasService.getById(parseInt(res['id']))
  .then(categoria=>{
    if(categoria){
      this.productos.set(categoria.productos);
      this.headerService.titulo.set(categoria.nombre);
    }}) 
}
})

}

}