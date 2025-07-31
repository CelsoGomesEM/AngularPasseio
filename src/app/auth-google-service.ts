import { Injectable, inject, signal } from '@angular/core'; // signal uma variavel que muda de valor a aplicação é atualizada quando ela mudar de estado
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'
import { auth } from './auth.config'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LoginResponseViewModel } from './login-response.model'; // caminho para model


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  private oauthservice: OAuthService = inject(OAuthService);
  private http = inject(HttpClient);
  private router: Router = inject(Router);
  public profile = signal<any>(null); 
  public apiUrl: string = environment.apiURL;
  public onLoginSuccess = signal(false); // novo sinal

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
         this.onLoginSuccess.set(true);
         this.getApiJwtToken();
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
    this.onLoginSuccess.set(false);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  getLoggedProfile(){
    return this.profile();
  }

  public getGoogleIdToken(): string | null {
    return this.oauthservice.getIdToken();
  }

  protected extractData(response: any) {
    return response?.Value?.data || {};
  }

  private getApiJwtToken(): void {

    const idToken = this.getGoogleIdToken();

    if (!idToken) {
      console.error('ID Token do Google não está disponível.');
      return;
    }

    console.log('Id Token: ' + idToken);

    this.http.post<any>(
          `${this.apiUrl}/api/external/google`,
          { idToken }
        ).subscribe({
          next: (response) => {
            console.log(response);
            const token = response.data?.accessToken;
            const user = response.data?.userToken;

            if (token) {
              localStorage.setItem('jwtToken', token);
              localStorage.setItem('userToken', JSON.stringify(user));
              console.log('Token JWT armazenado:', token);
            } else {
              console.warn('Token não retornado pela API.');
            }
          },
          error: (err) => {
            console.error('Erro ao obter token da API:', err);
          }
        });

  }

}
