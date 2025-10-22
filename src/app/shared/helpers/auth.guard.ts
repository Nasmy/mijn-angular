import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import { AuthService } from '@services/index';
import { resolve } from 'path';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private inject: Injector,
    ) {}

    async  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
      const authService=this.inject.get(AuthService);
        const user = authService.userValue;
        if (user) {
            // authorised so return true
            //this.accountService.checkToken();
          authService.loadMode();                   
           if (user.company_admin==true){
            return authService.loadSecurityByCompanyId(user.client_id).then(data=>{
              if (data!=null){                          
                return true;
              }else{
                return false;
              }
             })
          }else{
            return authService.loadSecurityByUserID(user.id).then(data=>{
              if (data!=null){
                return true;
              }
              else{
                return false;
              }
            });
           }
           //return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;   
      }

      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
      }
      canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
      }
      canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
      }
}
