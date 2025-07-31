import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LandingpageComponent } from './landingpage-component/landingpage-component';

import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './auth-google-interceptor'; // ajuste o path conforme necessário

@NgModule({
  declarations: [
    App,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),

    // Aqui usamos withInterceptors (em vez de withFetch)
    provideHttpClient(
        withFetch(), // permite uso da Fetch API (mais moderna e eficiente)
        withInterceptors([AuthInterceptor]) // injeta o JWT nas requisições
    ),

    provideOAuthClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
