import { inject, Injectable } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ResponseApi, User, AuthResponseDto } from '@models/index';

//import {  AES, enc, mode, pad, format,algo } from 'crypto-js';
import { EncryptionService } from './encryption.service';
import { AlertService } from './alert.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>=new BehaviorSubject<User>(null);
    public user: Observable<User>=this.userSubject.asObservable();
    public security = new BehaviorSubject<Object>(environment);
    private _jsonURL = "";
    private _jsonModeURL = "";



    constructor(
        private router: Router,
        private http: HttpClient,
        private route: ActivatedRoute,
        private encriptionService: EncryptionService,
        private alertService:AlertService,
        private translate:TranslateService
    ) {
             
        //this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        //this.user = this.userSubject.asObservable();

        const oLogedUserENC=localStorage.getItem('user');
        if (oLogedUserENC!=""&& oLogedUserENC!=null&& oLogedUserENC!=undefined){
          const oLogedUserDecr=encriptionService.decrypt(oLogedUserENC);
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


        this._jsonURL =this.getAbsoluteDomainUrl()+"/assets/modules.json";
        this._jsonModeURL =this.getAbsoluteDomainUrl()+"/assets/mode.json";


    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post(`${environment.apiBaseUrl}/authenticate/login`, { email, password })
            .pipe(
              map((loginData: any) => {         
                if(loginData.data!=undefined){
                  const user: User=loginData.data
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('user',this.encriptionService.encrypt(JSON.stringify(user)));
                  localStorage.setItem('language', user.language.slice(0, -3));
                  environment.currentUser=loginData.data
                  this.userSubject.next(user);
                  this.translate.setDefaultLang(user.language.split("-")[0]);
                  return user;
                }else{
                  const autRespon:AuthResponseDto=loginData;
                  return autRespon;
                }

                },
            //  catchError(this.alertService.handleError)
            ))         
    }


    logout() {
        // remove user from local storage and set current user to null
        if(this.userValue!=null && this.userValue!=undefined){
          const tmpAccesToken=this.userValue.access_token;
          this.http.post(`${environment.apiBaseUrl}/authenticate/revoke`,{})
          .pipe(
            map((dataLogout:ResponseApi<any>)=>{                      
              return new ResponseApi(null);
            }),
           // catchError(this.alertService.handleError)
          ).toPromise();
  
         /* .subscribe((dataLogout:ResponseApi<any>)=>{
            console.log(dataLogout?.data?.message);
          })*/
          this.userSubject.next(null);
          environment.currentUser=null;
          localStorage.removeItem('user');
          this.router.navigate(['/account/login']);
        }else{
          localStorage.removeItem('user');
          this.router.navigate(['/account/login']);
        }

    }

    twostepVerification(email, provider,token) {
      return this.http.post(`${environment.apiBaseUrl}/authenticate/twoStepVerification`, { email, provider, token })
          .pipe(
            map((loginData: any) => {         
              if(loginData.data!=undefined){
                const user: User=loginData.data     
                localStorage.setItem('language', user.language);          
                localStorage.setItem('user',this.encriptionService.encrypt(JSON.stringify(user)));
                environment.currentUser=loginData.data
                this.userSubject.next(user);
                this.translate.setDefaultLang(user.language.split("-")[0]);
                return user;
              }else{
                const autRespon:AuthResponseDto=loginData;
                return autRespon;
              }

           },
           // catchError(this.alertService.handleError)
          ))         
  }   
  
  loginWithRecoveryCode(email, provider, recoveryCode) {
      return this.http.post(`${environment.apiBaseUrl}/authenticate/loginwithrecoverycode`, { email, provider, recoveryCode })
          .pipe(
            map((loginData: any) => {         
              if(loginData.data!=undefined){
                const user: User=loginData.data
                localStorage.setItem('language', user.language);      
                localStorage.setItem('user',this.encriptionService.encrypt(JSON.stringify(user)));
                environment.currentUser=loginData.data
                this.userSubject.next(user);
                this.translate.setDefaultLang(user.language.split("-")[0]);
                return user;
              }else{
                const autRespon:AuthResponseDto=loginData;
                return autRespon;
              }

           },
           // catchError(this.alertService.handleError)
          ))         
  }

  disable2FaAuthenticator(){
    return this.http.post(`${environment.apiBaseUrl}/manage/disable2fa`, {})
  }  
  
  resetRecoveryCodes(){
    return this.http.get(`${environment.apiBaseUrl}/manage/resetRecoveryCodes`)
  }  
  
  enableAuthenticator(){
    return this.http.get(`${environment.apiBaseUrl}/manage/enableAuthenticator`)
  }

  verifyAuthenticator(code:string, sharedKey:string, authenticatorUri:string){
    return this.http.post(`${environment.apiBaseUrl}/manage/verifyAuthenticator`,{code, sharedKey, authenticatorUri})
  }

  resetAuthenticatorKey(){
    return this.http.post(`${environment.apiBaseUrl}/manage/resetAuthenticator`,{})
  }

  checkToken(){
      const AccessToken=this.userValue.access_token;
      return this.http.post(`${environment.apiBaseUrl}/authenticate/checkactive/`,{AccessToken}).subscribe((dataAuthorized: ResponseApi<any>)=>{
        if (dataAuthorized.data==false){
          this.userSubject.next(null);
          environment.currentUser=null
          localStorage.removeItem('user');
          this.router.navigate(['/account/login']);

        }
      });
    }

    refreshToken() {
      const oRefreshToken=new Object({
        accessToken: environment.currentUser.access_token,
        refreshToken: environment.currentUser.refresh_token,
      })
      return this.http.post(`${environment.apiBaseUrl}/authenticate/refresh-token`, oRefreshToken);
   }

    register(user: User) {
        return this.http.post(`${environment.apiBaseUrl}/users/register`, user);
    }

    resetPasswoord(email) {
      //return this.user;
      const domain=this.getAbsoluteDomainUrl();
      return this.http.post(`${environment.apiBaseUrl}/users/reset`, { email,domain });
  }

  changePasswoord(passchange) {
    return this.http.post(`${environment.apiBaseUrl}/users/pwdchange`, passchange);
}

    getAll() {
        return this.http.get<User[]>(`${environment.apiBaseUrl}/users`);
    }

    getAllCompanyUsers(nCompanyId: number) {
        return this.http.get<ResponseApi<User[]>>(`${environment.apiBaseUrl}/companies/users/${nCompanyId}`);
    }

    getById(id: string) {
        return this.http.get<ResponseApi<User>>(`${environment.apiBaseUrl}/users/${id}`);
    }

    getProfile() {
      return this.http.get<ResponseApi<User>>(`${environment.apiBaseUrl}/users/profile`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiBaseUrl}/users/${id}`, params)
            .pipe(map((userResponse:ResponseApi<User>)=> {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...userResponse.data };
                    localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(user)));
                    localStorage.setItem('language', user.language);
                    this.translate.setDefaultLang(user.language.split("-")[0]);
                    if(user.company_admin==false){
                      this.loadSecurityByUserID(user.id);
                    }else{
                      this.loadSecurityByCompanyId(user.client_id);
                    }
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return new ResponseApi(userResponse).data;
            }));
    }

    updateProfile(params) {
      return this.http.put(`${environment.apiBaseUrl}/users/profile`, params)
          .pipe(map((userResponse:ResponseApi<User>) => {
                 // update stored user if the logged in user updated their own record             
                 // update local storage
                  const user = { ...this.userValue, ...userResponse.data };
                  localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(user)));
                  localStorage.setItem('language', user.language);
                  this.translate.setDefaultLang(user.language.split("-")[0]);
                  if(user.company_admin==false){
                    this.loadSecurityByUserID(user.id);
                  }else{
                    this.loadSecurityByCompanyId(user.client_id);
                  }
                  // publish updated user to subscribers
                  this.userSubject.next(user);              
              return new ResponseApi(userResponse).data;
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

   async loadSecurityByUserID(nUserId: number){
      const path = this.route.snapshot.url.join('/');

        //return  await  this.http.get(this._jsonURL)
        //https://crm.exon-ict-group.be/api/access/2
        
          return await  this.http.get(`${environment.apiBaseUrl}/access/user/${nUserId}`)
            .pipe(
              map(data=>{
                if (data!=undefined){
                  if (this.userValue.id==nUserId && this.userValue.company_admin==false){
                    environment.security= new ResponseApi(data).data;
                    //console.log("Acces tot "+ this.checkSecurity("request","advanced"))
                    this.security.next(environment)
                  }
                  return new ResponseApi(data).data;
                }
                return new ResponseApi(null);
              }),
             // catchError(this.alertService.handleError)
            ).toPromise();
          
      }

      async loadSecurityByCompanyId(nCompanyId: number){   
        let bomp=await this._loadSecurityByCompanyId(nCompanyId);
        return bomp;
          /*return await this.http.get(`${environment.apiUrl}/access/company/${nCompanyId}`)
                .pipe(
                  map(data=>{
                    if (data!=undefined){
                      environment.security= new ResponseApi(data).data;
                      this.security.next(environment)
                      Object.assign(environment,environment)
                      return new ResponseApi(data).data;
                    }
                    return new ResponseApi(null);
                  }),
                  catchError(this.alertService.handleError)
                ).toPromise(); */               
      }

      private async _loadSecurityByCompanyId(nCompanyId: number){        
        return await this.http.get(`${environment.apiBaseUrl}/access/company/${nCompanyId}`)
              .pipe(
                map(data=>{
                  if (data!=undefined){
                    environment.security= new ResponseApi(data).data;
                    this.security.next(environment)
                    Object.assign(environment,environment)
                    return new ResponseApi(data).data;
                  }
                  return new ResponseApi(null);
                }),
               // catchError(this.alertService.handleError)
              ).toPromise();                
    }

       public  updateSecurityByUser(id, params) {
        const  myData: any=new Object();
        myData.modules=new Object();
        myData.modules=params;

          return this.http.put(`${environment.apiBaseUrl}/access/user/${id}`, myData )
              .pipe(map(data => {
                  // update stored user if the logged in user updated their own record
                  if (id == this.userValue.id) {
                    this.loadSecurityByUserID(this.userValue.id);
                    //environment.security= new ResponseApi(data).data;
                  }
                  return data;
              }));
      }

     public  getSecurityModules() {
        return this.http.get<ResponseApi<User>>(`${environment.apiBaseUrl}/access/modules`);
      }

      public checkSecurity(sComponentName: string,sModuleName =""){
        if (environment.security != null) {

          const compIndex = environment.security.components.findIndex(elem => elem.name == sComponentName)
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

  public   checkRoute(sComponentName:string){
        if (this.checkSecurity(sComponentName)==false){
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
          }
      }

    async  loadMode(){
        const path = this.route.snapshot.url.join('/');

          return  await this.http.get(this._jsonModeURL)
            .pipe(
              map(data=>{
                environment.modes=data;
                //console.log("Acces tot "+ this.checkSecurity("request","advanced"))
              }),
             // catchError(this.alertService.handleError)
            ).toPromise()
        }


        public checkMode(smode: string){
          if (environment.modes != null) {
           return environment.modes.mode[smode]
          }
        }



     public  getAbsoluteDomainUrl(): string {
      if (window
          && "location" in window
          && "protocol" in window.location
          && "host" in window.location) {
          return window.location.protocol + "//" + window.location.host;
      }
      return null;
  }

/*
  public enc_data( dataToEncrypt:string) {
    try{
        return AES.encrypt(dataToEncrypt, environment.enc_key,{
          keySize: 16,
          mode: mode.CBC,
          padding: pad.Pkcs7
        }).toString();
    }catch(err){
      return "";

    }
  }



 private  decrypt(encryptedBase64) {
  const decrypted = AES.decrypt(encryptedBase64, environment.enc_key,{
    keySize: 16,
    mode: mode.CBC,
    padding: pad.Pkcs7

  });
  if (decrypted) {
    try {     
      const str = decrypted.toString(enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return '';
      }
    } catch (e) {
      return '';
    }
  }
  return '';
}*/

GetToken() {
  return environment.currentUser?.access_token || '';
}

SaveToken(userdata:User){ 
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('user', this.encriptionService.encrypt(JSON.stringify(userdata)));
  localStorage.setItem('language', userdata.language);
  this.translate.setDefaultLang(userdata.language.split("-")[0]);
  environment.currentUser=userdata     
  this.userSubject.next(userdata);

}

hasPermission(component):boolean {
  if(component.data.component!=null && component.data.component!=undefined){
    return this.checkSecurity(component.data.component,component.data.permission);  
  }else{
    return this.checkSecurity(component.data.permission,component.data?.module);  
  }
       
}

}


