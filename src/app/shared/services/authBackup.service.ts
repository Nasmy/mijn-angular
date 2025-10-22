import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';

//import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, ResponseApi} from '../models';
import { EncryptionService } from './encryption.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private _jsonURL = 'http://localhost:4200/assets/modules.json';
  public security = new BehaviorSubject<Object>(environment);
  private userSubject: BehaviorSubject<User>=new BehaviorSubject<User>(null);
  public user: Observable<User>=this.userSubject.asObservable();
  public userData: any;
  //public user: firebase.User;
  public showLoader: boolean = false; 

  constructor(
    private http: HttpClient,
    //public afAuth: AngularFireAuth,
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone,
    //public toster: ToastrService,
    //private cookieService: CookieService,
    private encriptionService: EncryptionService,
    
    ) {
   
    let oLogedUserENC=localStorage.getItem('user');
    if (oLogedUserENC!=""&& oLogedUserENC!=null&& oLogedUserENC!=undefined){
      let oLogedUserDecr=this.encriptionService.getIdDecrypted(oLogedUserENC);
      let tmpUsr;
      try{
        tmpUsr=JSON.parse(oLogedUserDecr);
      }catch(error){
        tmpUsr=null;
      }
      this.userSubject.next(tmpUsr);
      environment.currentUser=this.userValue;
    }else{
      this.userSubject.next(null);
      environment.currentUser=null;
    }
  }

  ngOnInit(): void { }

  public get userValue(): User 
  {
    return this.userSubject.value;
  }

  logout(bForce:boolean=false) {
        // remove user from local storage and set current user to null
      this.http.post(`${environment.apiBaseUrl}/authenticate/revoke`,{})
      .subscribe(res => {
        console.log("Revoke successful");       
        },
        err => {
            console.log("Revoke failed: " + err);            
           // console.error("Revoke failed: " + err);            
        });    


      this.userSubject.next(null);       
      environment.currentUser=null;
      localStorage.clear();
      //this.cookieService.deleteAll('user', '/auth/login');
      if(bForce){         
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url }});
      }else{
        this.router.navigate(['/auth/login']);
      }

      
    }

    register(user: User) {
        return this.http.post(`${environment.apiBaseUrl}/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiBaseUrl}/user`);
    }

    getAllCompanyUsers(nCompanyId: string) {
        return this.http.get<ResponseApi<User[]>>(`${environment.apiBaseUrl}/companyuser/${nCompanyId}`);
    }

    getById(id: string) {
        return this.http.get<ResponseApi<User>>(`${environment.apiBaseUrl}/user/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiBaseUrl}/user/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(user)));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiBaseUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

   async loadSecurity(nUserId: number){    
       //return   this.http.get(this._jsonURL)
       return  await  lastValueFrom(this.http.get(`${environment.apiBaseUrl}/access/user/${nUserId}`)
          .pipe(    
            map((dataResponse: ResponseApi<any>)=>{            
              environment.security=dataResponse.data;
              this.security.next(environment)             
              return dataResponse.data;
            }),        
            catchError(this.processError)
          ))
      }
    
      public checkSecurity(sComponentName: string,sModuleName : string=""){
        if (environment.security != null) {
    
          let compIndex = environment.security.components.findIndex(elem => elem.name == sComponentName)
          if (compIndex >= 0) {
            if (sModuleName != "") {
              return environment.security.components[compIndex].modules[sModuleName];
    
            } else {
              return environment.security.components[compIndex].access;
            }
    
          } else {
            return false;
          }
        } else {
          return false;
        }    
      }

      checkRoute(sComponentName:string){
        if (this.checkSecurity(sComponentName)==false){
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);   
          }
      }
    
    
      processError(err) {
        let message = '';
        if(err.error instanceof ErrorEvent) {
         message = err.error.message;
        } else {
         message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return  throwError(() => message); 
     }
  // sign in function
  SignIn(email, password) {
      //return this.http.post<ResponseApi<User>>(`${environment.apiUrl}/users/authenticate`, { email, password })
      return this.http.post<ResponseApi<User>>(`${environment.apiBaseUrl}/authenticate/login`, { email, password })
      .pipe(
        map(
          (userdata: ResponseApi<User>) =>
              {
                let user: User=userdata.data
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(user)));
                environment.currentUser=userdata.data     
                this.userSubject.next(user);         
                return user;
              }
         )
   
      );
  }

  refreshToken() {
    let oRefreshToken=new Object({
      accessToken: environment.currentUser.access_token,
      refreshToken: environment.currentUser.refresh_token,
    })
    return this.http.post(`${environment.apiBaseUrl}/authenticate/refresh-token`, oRefreshToken);
 }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null) ? true : false;
    //return (user != null && user.emailVerified != false) ? true : false;
  }

  public SetUserSubject(oUSer: User){
    this.userSubject.next(oUSer);
    environment.currentUser=this.userValue;
  }

  GetToken() {
    return environment.currentUser?.access_token || '';
  }

  SaveToken(userdata:User){ 
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(userdata)));
    environment.currentUser=userdata     
    this.userSubject.next(userdata);

  }


  public  getSecurityModules() {
    return this.http.get<ResponseApi<any>>(`${environment.apiBaseUrl}/access/modules`);
  }


  hasPermission(component):boolean {
        if(component.data.component!=null && component.data.component!=undefined){
          return this.checkSecurity(component.data.component,component.data.permission);  
        }else{
          return this.checkSecurity(component.data.permission,component.data?.module);  
        }
             
   }
  
  
}
