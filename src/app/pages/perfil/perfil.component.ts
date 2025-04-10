import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  headerService=inject(HeaderService);
  
ngOnInit(): void {
this.headerService.titulo.set("Perfil");
}

}
