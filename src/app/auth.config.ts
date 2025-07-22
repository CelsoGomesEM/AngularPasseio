import { AuthConfig } from 'angular-oauth2-oidc'

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',  // QUEM FEZ A AUTENTICAÇÃO QUAL É AURL DE AUTH
    redirectUri: window.location.origin, // PARA ONDE SERA REDIRECIONADO QUANDO SE AUTENTICAR localhost:42000
    clientId: '737386676035-ka3tq299h6bcm33g276vs9sqnb5fr1tb.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
}