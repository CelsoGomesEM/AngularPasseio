import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/lugar-service';
import { CategoriaService } from '../../categorias/categoria-service';
import { Categoria } from '../../categorias/categoria';
import { Lugar } from '../../lugares/lugar';

@Component({
  selector: 'app-galeria-component',
  standalone: false,
  templateUrl: './galeria-component.html',
  styleUrl: './galeria-component.scss'
})
export class GaleriaComponent implements OnInit {
  
  public lugares: Lugar[] = [];
  public categoriasFiltro: Categoria[] = [];
  public nomeFiltro: string = "";
  public categoriaFiltro: string = "";

  constructor(private serviceLugares: LugarService,
              private serviceCategoria: CategoriaService
  ){}

  ngOnInit(): void {
    this.serviceCategoria.listarTodos().subscribe(categorias => this.categoriasFiltro = categorias);
    this.serviceLugares.listarTodos().subscribe(lugaresResposta => this.lugares = lugaresResposta);
  }

  public getTotalEstrelas(lugar: Lugar) : string {
    return '&#9733'.repeat(lugar.avaliacao || 0) + '&#9734;'.repeat(5 - (lugar.avaliacao || 0));
  }

  public filtrarLugares(){
    this.serviceLugares.filtrarPorNomeOuCategoria(this.nomeFiltro, this.categoriaFiltro)
          .subscribe(resultado => this.lugares = resultado);
  }
}
