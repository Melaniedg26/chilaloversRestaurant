import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  headerService=inject(HeaderService);
  
ngOnInit(): void {
this.headerService.titulo.set("Buscar");
}

}
