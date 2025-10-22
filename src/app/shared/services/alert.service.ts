import { inject,Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '@models/index';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();

  private defaultId = 'default-alert';
  
  constructor(
    private translateService:TranslateService
  ) {

    //this.translateService=inject(TranslateService)
   }

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    const errMEssage = this.translateErrorMessage(message)
    this.alert(new Alert({ ...options, type: AlertType.Success, message: errMEssage }));
  }

  error(message: string, options?: any) {
    const errMEssage = this.translateErrorMessage(message)
    //  let errMEssage= message
    this.alert(new Alert({ ...options, type: AlertType.Error, message: errMEssage }));
  }

  info(message: string, options?: any) {
    const errMEssage = this.translateErrorMessage(message)
    this.alert(new Alert({ ...options, type: AlertType.Info, message: errMEssage }));
  }

  warn(message: string, options?: any) {
    const errMEssage = this.translateErrorMessage(message)
    this.alert(new Alert({ ...options, type: AlertType.Warning, message: errMEssage }));
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }


  private translateErrorMessage(sStringMessage) {

    const arrNerMesages: Array<string> = [];
    if (sStringMessage != undefined) {
      try {
        const arrayString = sStringMessage.split(",").map(String);
        const index = arrayString.length - 1;
        arrayString.reverse().forEach(elem => {
          if (elem == "false") {
            arrayString.slice(index, 1);
          } else {
            arrNerMesages.push(this.translateService.instant("" + elem))
          }
        })
      } catch (err) {

      }
    }
    return arrNerMesages.toString();
  }

  handleError(httpError: HttpErrorResponse | any) {
    if (httpError == undefined) {
      //this.error(`Backend returned error`);
      console.error(`Backend returned error`);
    } else if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error.message);
      // this.error( httpError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${httpError?.status} | ${httpError?.stack}, ` + `body was: ${httpError?.error} | ${httpError?.message}`);
      //this.error(  `Backend returned code ${httpError.status}, ` +`body was: ${httpError.error}`);

    }
    // Return an observable with a user-facing error message.
    return throwError(() => 'Something bad happened; please try again later.');

  }
}
