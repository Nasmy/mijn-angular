import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from '@services/auth.service';
import { inject } from '@angular/core';

/*
@Injectable({
    providedIn: 'root'
  })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {       
    }    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authservice = inject(AuthService);
        // const authservice = inject(AuthService);
        // add auth header with jwt if user is logged in and request is to the api url
        // const user = authservice.userValue;
        // const isLoggedIn = user && user.access_token;
        const isLoggedIn = environment.currentUser && environment.currentUser.access_token;
        const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    //Authorization: `Bearer ${user.access_token}`                             
                    Authorization: `Bearer ${environment.currentUser.access_token}`                             
                }
            });
        }
        return next.handle(request);
    }
}
*/

/*export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
    const user = inject(AuthService).userValue;
    const isLoggedIn = user && user.access_token;
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.access_token}`                             
            }
        });
    }
    return next(request);
  }*/


export function JwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    //const user = inject(AuthService).userValue;
    const user = environment.currentUser;
    // add auth header with jwt if user is logged in and request is to the api url
    //const user = authservice.userValue;
    const isLoggedIn = user && user.access_token;
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.access_token}`                             
            }
        });
    }
    return next(request).pipe(timeout(600000));
}
