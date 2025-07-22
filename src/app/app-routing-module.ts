import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage-component/landingpage-component';
import { authGuard } from './auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'paginas',
    loadChildren: () => import('./template/template-module').then(m => m.TemplateModule),
    canActivate: [ authGuard ]
  }
  //Passando para meu roteador principal as rotas do template modulo que sera usado na minha aplicação para gerenciar o Header e o Footer
    //Carregando os filhos deste path, todas as rotas e é carregado dinamicamente só quando precisar é lazy load so carrega quando cliente acessar a aplicação
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
