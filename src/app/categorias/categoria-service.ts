import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  salvar(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl + '/api/Categorias', categoria);
  }

  listarTodos() : Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl + '/api/Categorias');
  }
}
