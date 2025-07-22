import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layout-props';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs'
import { AuthGoogleService } from '../../auth-google-service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit{

  public props: LayoutProps = {titulo: '', subtitulo: '' };

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private loginService: AuthGoogleService
  ){

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter (() => this.activateRoute.firstChild != null),
      map(() => this.extrairPropriedadesLayout())
    ).subscribe((props: LayoutProps) => this.props = props);
  }

  public extrairPropriedadesLayout() : LayoutProps {

    let rotaFilha = this.activateRoute.firstChild;

    return rotaFilha?.snapshot?.data as LayoutProps;
  }

  public logout(){
    this.loginService.logout();
  }

}
