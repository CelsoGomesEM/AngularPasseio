import { Component } from '@angular/core';
import { Profile } from './profile-model';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google-service';

@Component({
  selector: 'app-landingpage-component',
  standalone: false,
  templateUrl: './landingpage-component.html',
  styleUrl: './landingpage-component.scss'
})
export class LandingpageComponent {

    public profile: Profile | undefined;

    constructor(private router: Router,
                private loginService: AuthGoogleService
    ){} // tenho um método navegar para abrir para outra página

    public navegar(){
      this.router.navigate(['/paginas/galerias'])
    }

    public logarComGoogle()
    {
      this.loginService.login();
    }

    public isLoggedIn() : boolean {
      const dadosGoogle = this.loginService.getLoggedProfile();
      console.log(dadosGoogle);
      this.profile = dadosGoogle;
      return !!this.profile; //está logada ou não
    } 
}
