import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categorias';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  async getAll(): Promise<Categoria[]> {
    const res = await firstValueFrom(this.http.get<Categoria[]>('/assets/data/database.json'));
    return res;
  }

  async getById(id: number): Promise<Categoria | undefined> {
    const res = await this.getAll();
    return res.find(c => c.id === id);
  }
}