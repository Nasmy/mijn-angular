import { inject, Injectable, Injector, PlatformRef, runInInjectionContext } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService, AlertService } from '@services/index';

import { TranslateService } from '@ngx-translate/core';
import { platform } from 'os';
import { AuthGuard } from './auth.guard';
var isRefreshingToken = false;
var tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


//export function ErrorInterceptor(request: HttpRequest<unknown>,  next: HttpHandlerFn): Observable<HttpEvent<any>> {
  export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {

    const authservice = inject(AuthService);
    let authreq = request;
    authreq = AddTokenheader(request, getToken);
    return next(request).pipe(catchError(err => {
      const isApiURl = request.url.startsWith(environment.apiBaseUrl);
      if ([401].includes(err.status) && environment.currentUser && isApiURl) {
        // auto logout if 401 or 403 response returned from api
        // this.accountService.logout();
        return handleRefrehToken(request, next,authservice);
      }
      if ([403].includes(err.status) && environment.currentUser && isApiURl) {
        setError('You don\'t have a access to perform this action!');
        return next(err.error);
      }
      if ([401].includes(err.status) && environment.currentUser==null && isApiURl) {
        authservice.logout();
      }

      if ([422].includes(err.status) && isApiURl) {
        if (err?.error?.redirect != undefined) {
          setError(`You don't have a access to log in with this domain! You will be redirected to`+ ` ${err?.error?.redirect}`);
          setTimeout(() => {
            window.location.href = err?.error?.redirect;
          }, 4000);
          return next(err.error);;
        }      
      }

      let error;
      if (Array.isArray(err.error)) {
        error = err.error?.toString() || err.statusText;
      } else if (Array.isArray(err?.error?.errors)) {
        const errorMesages = [];
        err?.error.errors.forEach(errmessage => {
          if (errmessage.message != undefined) {
            errorMesages.push(errmessage.message);
          } else {
            errorMesages.push(errmessage);
          }
        })
        error = errorMesages.toString();
        setError(error);
      } else {

        if (err.statusText == "Unknown Error") {
          error = err.statusText;
        } else if (err.status == 403) {
          error = "You dont have access for this action!";
        } else {
          try {
            const keys = Object.keys(err.error);
            const array = keys.map(key => ({ key: key, value: err.error[key] }));
            const errorMesages = [];
            array.forEach(message => {
              if (message.key == "data") {
                errorMesages.push(message.value.error);
              } else {
                errorMesages.push(message.value);
              }

            })
            error = errorMesages.toString() || err.statusText;
          } catch (err) {
          }
        }

        // error = err.error?.message || err.statusText;
      }      
      // console.error(err);
      return throwError(error);     
    }))
  }




/*: Observable<HttpEvent<any>> {

   // const authservice = inject(AuthService);
   // const toaster = inject(AlertService);
    
    let authreq = request;
    authreq = AddTokenheader(request, getToken);
    return next(request).pipe(catchError(err => {
      const isApiURl = request.url.startsWith(environment.apiBaseUrl);
      if ([401].includes(err.status) && environment.currentUser && isApiURl) {
        // auto logout if 401 or 403 response returned from api
        // this.accountService.logout();
        return handleRefrehToken(request, next);
      }
      if ([403].includes(err.status) && environment.currentUser && isApiURl) {
        setError('You don\'t have a access to perform this action!');
        return next(err.error);
      }

      if ([422].includes(err.status) && isApiURl) {
        if (err?.error?.redirect != undefined) {
          setError(`You don't have a access to log in with this domain! You will be redirected to`+ ` ${err?.error?.redirect}`);
          setTimeout(() => {
            window.location.href = err?.error?.redirect;
          }, 4000);
          return next(err.error);;
        }      
      }

      let error;
      if (Array.isArray(err.error)) {
        error = err.error?.toString() || err.statusText;
      } else if (Array.isArray(err?.error?.errors)) {
        const errorMesages = [];
        err?.error.errors.forEach(errmessage => {
          if (errmessage.message != undefined) {
            errorMesages.push(errmessage.message);
          } else {
            errorMesages.push(errmessage);
          }
        })
        error = errorMesages.toString();
        setError(error);
      } else {

        if (err.statusText == "Unknown Error") {
          error = err.statusText;
        } else if (err.status == 403) {
          error = "You dont have access for this action!";
        } else {
          try {
            const keys = Object.keys(err.error);
            const array = keys.map(key => ({ key: key, value: err.error[key] }));
            const errorMesages = [];
            array.forEach(message => {
              if (message.key == "data") {
                errorMesages.push(message.value.error);
              } else {
                errorMesages.push(message.value);
              }

            })
            error = errorMesages.toString() || err.statusText;
          } catch (err) {
          }
        }

        // error = err.error?.message || err.statusText;
      }      
      // console.error(err);
      return throwError(error);     
    }))
}*/

function getToken():string{
  const authservice = inject(AuthService);
    return authservice.GetToken();
}

function setError(error: string):void{
  const toaster = inject(AlertService);
  const translateService = inject(TranslateService);
  toaster.error(translateService.instant(error), translateService.instant("Info"));
}

 function AddTokenheader(request: HttpRequest<any>, token: any) {
  return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });  
}

function handleRefrehToken(request: HttpRequest<any>, next: HttpHandlerFn,authService:AuthService): Observable<HttpEvent<any>> {
  //const authService = inject(AuthService);
  if (!isRefreshingToken) {
    isRefreshingToken = true;
    tokenSubject.next(null);
    return authService.refreshToken()
      .pipe(
        switchMap((dataResponse: any) => {
          authService.SaveToken(dataResponse.data);
          isRefreshingToken = false;
          tokenSubject.next(authService.GetToken());
          return next(AddTokenheader(request, authService.GetToken()));
        }),
        catchError((error: HttpErrorResponse) => {
          authService.logout();
          isRefreshingToken = false;
          let errorMessage = '';
          if (error?.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error?.status}\nMessage: ${error?.message}`;
          }
          return throwError(errorMessage);
        }),
        finalize(() => {
          isRefreshingToken = false;
        })
      );
  } else {
    return tokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token) => {
        return next(AddTokenheader(request, token));
      })
    );
  }



 

 

}


/*

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor( private inject: Injector ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authservice = this.inject.get(AuthService);
    const toaster = this.inject.get(AlertService);
    const translateService = this.inject.get(TranslateService);
    let authreq = request;
    authreq = this.AddTokenheader(request, authservice.GetToken());

    return next.handle(request).pipe(catchError(err => {
      const isApiURl = request.url.startsWith(environment.apiBaseUrl);
      if ([401].includes(err.status) && authservice.userValue && isApiURl) {
        // auto logout if 401 or 403 response returned from api
        // this.accountService.logout();
        return this.handleRefrehToken(request, next);
      }
      if ([403].includes(err.status) && authservice.userValue && isApiURl) {
        toaster.error(translateService.instant('You don\'t have a access to perform this action!'), translateService.instant("Info"));
        return next.handle(err.error);
      }

      if ([422].includes(err.status) && isApiURl) {
        if (err?.error?.redirect != undefined) {
          toaster.error(translateService.instant(`You don't have a access to log in with this domain! You will be redirected to`) + ` ${err?.error?.redirect}`, translateService.instant("Info"));
          setTimeout(() => {
            window.location.href = err?.error?.redirect;
          }, 4000);
          return next.handle(err.error);;
        }
      
      }

      let error;
      if (Array.isArray(err.error)) {
        error = err.error?.toString() || err.statusText;
      } else if (Array.isArray(err?.error?.errors)) {
        const errorMesages = [];
        err?.error.errors.forEach(errmessage => {
          if (errmessage.message != undefined) {
            errorMesages.push(translateService.instant(errmessage.message));
          } else {
            errorMesages.push(translateService.instant(errmessage));
          }
        })
        error = errorMesages.toString();
        toaster.error(error);
      } else {

        if (err.statusText == "Unknown Error") {
          error = err.statusText;
        } else if (err.status == 403) {
          error = "You dont have access for this action!";
        } else {
          try {
            const keys = Object.keys(err.error);
            const array = keys.map(key => ({ key: key, value: err.error[key] }));
            const errorMesages = [];
            array.forEach(message => {
              if (message.key == "data") {
                errorMesages.push(message.value.error);
              } else {
                errorMesages.push(message.value);
              }

            })
            error = errorMesages.toString() || err.statusText;
          } catch (err) {
          }
        }

        // error = err.error?.message || err.statusText;
      }
      // console.error(err);
      return throwError(error);
    }))
  }


  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
    //return request.clone({setHeaders: { Authorization: 'bearer ' + token}});
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authservice = this.inject.get(AuthService);
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return authservice.refreshToken()
        .pipe(
          switchMap((dataResponse: any) => {
            authservice.SaveToken(dataResponse.data);
            this.isRefreshingToken = false;
            this.tokenSubject.next(authservice.GetToken());
            return next.handle(this.AddTokenheader(request, authservice.GetToken()));
          }),
          catchError((error: HttpErrorResponse) => {
            authservice.logout();
            this.isRefreshingToken = false;

            let errorMessage = '';
            if (error?.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error?.status}\nMessage: ${error?.message}`;
            }
            return throwError(errorMessage);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.AddTokenheader(request, token));
        })
      );
    }
  }
}*/
