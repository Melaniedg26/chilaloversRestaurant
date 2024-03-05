import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {

  headerService=inject(HeaderService);
ngOnInit(): void {
this.headerService.titulo.set("Home");
this.headerService.extendido.set(true);
}

ngOnDestroy(): void {
  this.headerService.extendido.set(false);
}

}
