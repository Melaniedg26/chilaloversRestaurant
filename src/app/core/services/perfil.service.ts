import { Injectable, signal, WritableSignal } from '@angular/core';
import { isBrowser } from '../utils/enviroment';
import { Perfil } from '../interfaces/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() {
    if (isBrowser()) {
    const perfilLS= localStorage.getItem('perfil');
    if (perfilLS) this.perfil.set(JSON.parse(perfilLS));
    }
  }

  perfil:WritableSignal<Perfil|undefined>=signal(undefined);

  guardarDatos(perfil:Perfil){
     if (isBrowser()) {
          localStorage.setItem('perfil', JSON.stringify(perfil));
          this.perfil.set(perfil);
        }
      }
     
     
  
    }



