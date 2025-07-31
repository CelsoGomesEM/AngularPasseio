import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { environment } from '../environments/environment';


import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const jwtToken = localStorage.getItem('jwtToken');
  console.log('Token do Storage: ' + jwtToken);
  const isApiRequest = req.url.startsWith(environment.apiURL); // ou seu domínio da API
  console.log('Interceptor: Url API' + environment.apiURL);
  console.log('Interceptor: Is ApiRequest: ' + isApiRequest);
  if (jwtToken && isApiRequest) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
