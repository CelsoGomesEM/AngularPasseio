import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core' // por que não estamos dentro de uma classe e sim de uma função
import { AuthGoogleService } from './auth-google-service';
import { Profile } from './landingpage-component/profile-model';


export const authGuard: CanActivateFn = (route, state) => {

  const loginService: AuthGoogleService = inject(AuthGoogleService);
  const router: Router = inject(Router);
  const loggedProfile: Profile = loginService.getLoggedProfile();

  if(loggedProfile){
    return true;
  }

  router.navigate(['']);

  return false;

};
