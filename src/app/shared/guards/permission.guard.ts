import { inject, Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/index';

@Injectable({
    providedIn: 'root'
})

export class PermissionGuard implements CanActivate {
    
    constructor( 
        private inject: Injector,
        private router: Router
    ) { }

       canActivate(next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            const authService=   this.inject.get(AuthService);          
            let haveAccess= authService.hasPermission(next);
            if(haveAccess==false){
                switch(next.data['permission']){
                    case "requests":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                    case "company":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                    case "datascrapping":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                    case "prospection":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                    case "filemanagment":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                    case "probinganddrilling":{
                        this.router.navigate(['/error/401']);                    
                        break;
                    }                     
                    case "environmentalpermits":{
                        this.router.navigate(['/error/401']);                    
                        break;
                    }  
                    case "brownfield":{
                        this.router.navigate(['/error/401']);                    
                        break;
                    }     
                    case "modeldocuments":{
                        this.router.navigate(['/error/401']);                    
                        break;
                    }              
                    case "contacts":{
                        this.router.navigate(['/error/401']);                    
                        break;
                    }                    
                    case "forms":{
                        this.router.navigate(['/error/401']);                  
                        break;
                    }      
                    case "beheerdersmenu":{
                        this.router.navigate(['/error/401']);
                        break;
                    }
                }              

            }         

            return haveAccess;
    }   
}
