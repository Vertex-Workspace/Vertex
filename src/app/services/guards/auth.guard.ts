import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const user = this.accountService.userValue;
//     if (user) {
//         // authorised so return true
//         return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
//     return false;
// }
  
}
