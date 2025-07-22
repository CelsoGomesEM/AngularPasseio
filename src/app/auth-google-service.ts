import { Injectable, inject, signal } from '@angular/core'; // signal uma variavel que muda de valor a aplicação é atualizada quando ela mudar de estado
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'
import { auth } from './auth.config'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  private oauthservice: OAuthService = inject(OAuthService);
  private router: Router = inject(Router);
  public profile = signal<any>(null); 

  constructor()
  {
    this.initConfiguration();
  }

  initConfiguration(){
    this.oauthservice.configure(auth); // Configurando minhas credenciais 
    this.oauthservice.setupAutomaticSilentRefresh(); //Mantem o cliente logado caso ele já esteja logado no Google
    this.oauthservice.loadDiscoveryDocumentAndTryLogin().then(() => {
      if(this.oauthservice.hasValidIdToken()){
         this.profile.set(this.oauthservice.getIdentityClaims()); // Dados de autenticação da pessoa logada no oAuth
      }
    }) // Setar quem está autenticado

  }

  public login(){
    this.oauthservice.initImplicitFlow(); // FLuxo de autenticação do google
  }

  public logout(){
    this.oauthservice.revokeTokenAndLogout(); // Revogar todas as credenciais
    this.oauthservice.logOut();
    this.profile.set(null);
    this.router.navigate(['']);
  }

  getLoggedProfile(){
    return this.profile();
  }

}
