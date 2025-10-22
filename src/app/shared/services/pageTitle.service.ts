import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class PageTittleService {
  private pageTitle = new Subject<string>();

  private defaultId = 'Welcome';
  
  constructor(
    private translateService:TranslateService
  ) {}


  onTitleChange(id = this.defaultId): Observable<string> {
    return this.pageTitle.asObservable().pipe(filter(x => x!=""));
  }
  settitle(tittle: string) {   
    this.setMessage(tittle);
  }
 
  // main alert method
  private setMessage(title: string) {    
    this.pageTitle.next(title);
  }
  // clear alerts
  clear(id = this.defaultId) {
    this.pageTitle.next("");
  }  
}
