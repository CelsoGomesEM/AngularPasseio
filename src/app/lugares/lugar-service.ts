import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  public apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  salvar(lugar: Lugar) : Observable<Lugar>{
    return this.http.post<Lugar>(this.apiUrl + '/lugares', lugar);
  }

  listarTodos() : Observable<Lugar[]>{
    return this.http.get<Lugar[]>(this.apiUrl + '/lugares');
  }

  filtrarPorNomeOuCategoria(nome: string, categoria: string) : Observable<Lugar[]>{
    let parametros = new HttpParams();

    if(nome) {
      parametros = parametros.set('nome_like', nome)
    }

    if(categoria && categoria !== '-1'){
      parametros = parametros.set('categoria', categoria)
    }
    
    console.log('Parametros: ', parametros);

    return this.http.get<Lugar[]>(this.apiUrl + '/lugares', {
      params: parametros
    });

  }
}
