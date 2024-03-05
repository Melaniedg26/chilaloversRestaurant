import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }
  titulo=signal("Titulo");
  extendido=signal(false);
}
