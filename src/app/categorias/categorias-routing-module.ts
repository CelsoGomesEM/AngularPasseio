import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Categoria } from './categoria/categoria';

const routes: Routes = [
  {
    path: '',
    component: Categoria // Quando ele acessar o modulo de categoria ele vai ir direto para o caminho raiz que é Categoria Componente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
