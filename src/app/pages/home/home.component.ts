import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/interfaces/categorias';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TarjetaCategoriaComponent,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {

  headerService=inject(HeaderService);
  categoriasService=inject(CategoriasService);
  categorias:WritableSignal<Categoria[]>=signal([]);

ngOnInit(): void {
this.headerService.titulo.set("Chilalovers");
this.headerService.extendido.set(true);
this.categoriasService.getAll().then(res=>this.categorias.set(res))
}

ngOnDestroy(): void {
  this.headerService.extendido.set(false);
}

}
