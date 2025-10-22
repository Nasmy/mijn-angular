import {  Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthServiceHelper {  

    constructor(
        private authService: AuthService,
   
    ) {
          }

    public get userValue(): User {
        return this.authService.userValue;
    }

    
    public checkMode(sMode:string) {
        return this.authService.checkMode(sMode);
    }
    
}


