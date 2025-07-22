import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';

const routes: Routes = [
  {
    path: '', component: Layout,
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias-module').then(m => m.CategoriasModule),
        pathMatch: 'full',
        data: {
          titulo: 'Categorias',
          subtitulo: 'Realize o cadastro de novas categorias'
        }
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares-module').then(l => l.LugaresModule),
        pathMatch: 'full',
        data: {
          titulo: 'Lugares',
          subtitulo: 'Realize o cadastro de novos lugares'
        }
      },
      {
        path: 'galerias',
        loadChildren: () => import('../galerias/galerias-module').then(g => g.GaleriasModule),
        pathMatch: 'full',
        data: {
          titulo: 'Lista de lugares para conhecer',
          subtitulo: 'Descubra os melhores lugar para lazer e exploração e se divertir'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
