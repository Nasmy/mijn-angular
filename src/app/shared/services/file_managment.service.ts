import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from, of } from 'rxjs';
import { first, map } from 'rxjs/operators';


import { File_Folder, File_Geometries, File_Managment, File_Objects, ResponseApi, User } from '@shared/models';
import { environment } from '@env/environment';
import { AlertService} from '@shared/services/alert.service';
import { AuthService } from '@shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
// import { ConfirmationDialogService } from '@shared/services/general';
// import { ToastrService } from 'ngx-toastr';
// import { ToasterPosition } from '@shared/enums';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagmentService {

  private _lstFileManagments$: BehaviorSubject<Array<File_Managment>> = new BehaviorSubject<Array<File_Managment>>(null);
  public  lstFileManagments$$: Observable<Array<File_Managment>> = this._lstFileManagments$.asObservable();

  private _lstFileGeometries$: BehaviorSubject<Array<File_Geometries>> = new BehaviorSubject<Array<File_Geometries>>(null);
  public  lstFileGeometries$$: Observable<Array<File_Geometries>> = this._lstFileGeometries$.asObservable();

  private _FileFolders$: BehaviorSubject<Array<File_Folder>> = new BehaviorSubject<Array<File_Folder>>([]);
  public  FileFolders$$: Observable<Array<File_Folder>> = this._FileFolders$.asObservable();  

  private _reloadFileFolders$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public  reloadFileFolders$$: Observable<boolean> = this._reloadFileFolders$.asObservable();  

  get user(): User{
    return this.accountService.userValue;
  }

  public get file_ManagmentValue(): Array<File_Managment> {
    return this._lstFileManagments$.value;
  }

  Mydata: any;

  constructor(
    private router: Router,
    private http: HttpClient,   
    private translate:TranslateService,
    private accountService: AuthService ,   
    private confirmationDialogService: ConfirmationDialogService,
    private  alertService:AlertService,  
      
  ) {}

  set setFileFoldersArray(fileFolders: Array<File_Folder>){
      this._FileFolders$.next(fileFolders);
  }


  public  getByClient(): Observable<Array<File_Managment>>{
      return this._getByClient(this.user.client_id);
  }

  private _getByClient(nClientId:number): Observable<Array<File_Managment>> {
    return this.http.get(`${environment.apiBaseUrl}/${nClientId}/fileManagment`)
    .pipe(
      map( (dataResponse:ResponseApi<Array<File_Managment>>)=> {
        if(dataResponse.success==true){
          this.Mydata = dataResponse.data
           this._lstFileManagments$.next(this.Mydata);
           return this.Mydata;             
        }
      })
    )
    }

  public  getByUser(): Observable<Array<File_Managment>>{
      return this._getByUser(this.user.client_id,this.user.id);
  }

  private _getByUser(nClientId:number, nuserId:number): Observable<Array<File_Managment>> {
    return this.http.get(`${environment.apiBaseUrl}/${nClientId}/fileManagment/user`)
    .pipe(
      map( (dataResponse:ResponseApi<Array<File_Managment>>)=> {
        if(dataResponse.success==true){
          this.Mydata = dataResponse.data
           this._lstFileManagments$.next(this.Mydata);
           return this.Mydata;             
        }
      })
    )
    }

    load(id: number){
      return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${id}`);
    }

    create(oFile_Managment: File_Managment) {
      return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment`, oFile_Managment);
    }

    update(id: number,oFile_Managment: File_Managment) {
      return this.http.put(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${id}`, oFile_Managment);
    }

    private delete(id: number) {
      return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${id}`);
    }

  async deleteFileManagment(id: number){
    return new Promise((resolve, reject) => {
    this.confirmationDialogService.confirm(this.translate.instant('Please confirm'), this.translate.instant("Do you want to remove this item?") +" "+ this.translate.instant("This action cannot be undone!"), this.translate.instant('Yes'),this.translate.instant('No'),"sm",true)
    .then((confirmed) => {
      if (confirmed === true){
        this.delete(id).subscribe(
          (data: ResponseApi<boolean>)=>{
            if(data.success==true){
              //this.toaster.success(this.translate.instant("Delete successful."),this.translate.instant("Delete"),{positionClass:ToasterPosition.bottomRight});            
              resolve(true);
            }else{
              resolve(false);
            }          
          });
      }else{
        reject(false);
      }
    })
    .catch(() => {
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      resolve(false);
    }) 
  })
  }





  loadFileObjectsManagmentId(file_managmentId:number) {
    return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/fileobjects`);
  }

  createFileObjects(file_managmentId:number, oFile_Managment: File_Objects) {
    return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/fileobjects`, oFile_Managment);
  }

  LinkFileObjects(file_managmentId:number, lstFile_Managment: Array<File_Objects>) {
    return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/fileobjects/link`, lstFile_Managment);
  }

  private _deleteFileObjects(id: number,file_managmentId:number) {
    return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/fileobjects/${id}`);
  }

  async deleteFileObjects(id: number,file_managmentId:number){
    return new Promise((resolve, reject) => {
    this.confirmationDialogService.confirm('Please confirm', this.translate.instant("Do you want to remove this item?") +" "+ this.translate.instant("This action cannot be undone!"), 'Yes','No',"lg",true)
    .then((confirmed) => {
      if (confirmed === true){
        this._deleteFileObjects(id,file_managmentId).subscribe(
          (data: ResponseApi<boolean>)=>{
            if(data.success==true){
              // this.toaster.success(this.translate.instant("Delete successful."),this.translate.instant("Delete"),{positionClass:ToasterPosition.bottomRight});            
              resolve(true);
            }else{
              resolve(false);
            }          
          });
      }else{
        reject(false);
      }
    })
    .catch(() => {
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      resolve(false);
    }) 
  })
}

createFileFolder(file_managmentId:number, oFile_Folder: File_Folder) {
  return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/filefolders`, oFile_Folder);
}

private _deleteFileFolder(id: number,file_managmentId:number) {
  return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/filefolders/${id}`);
}

deleteFileFolder(id: number,file_managmentId:number){
  this.confirmationDialogService.confirm('Please confirm', this.translate.instant("Do you want to remove this item?") +" "+ this.translate.instant("This action cannot be undone!"), 'Yes','No',"sm",true)
  .then((confirmed) => {
    if (confirmed === true){
      this._deleteFileFolder(id,file_managmentId);
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));  
}





loadFileFolderbyManagmentId(file_managmentId:number) {
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/filefolders`);
}

deleteAllFilesByFolderId(id: number,file_managmentId:number){
  this.confirmationDialogService.confirm('Please confirm', this.translate.instant("Do you want to remove this item?") +" "+ this.translate.instant("This action cannot be undone!"), 'Yes','No',"lg",true)
  .then((confirmed) => {
    if (confirmed === true){
      this._deleteAllFilesByFolderId(id,file_managmentId).subscribe(data=>{
        this._reloadFileFolders$.next(true);
      });
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));  
}

private _deleteAllFilesByFolderId(folder_id:number,file_managmentId:number) {
  return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/folder/${folder_id}/attachments`);
}


loadAttachmentsByFolderId(folder_id:number,file_managmentId:number) {
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/folder/${folder_id}/attachments`);
}

createSingleFileAttachment(file: File,file_managmentId:number, file_folderId:number) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("FileManagmentId", file_managmentId.toString());
  if(file_folderId!=null){
    formData.append("FileFolderId", file_folderId.toString());
  }
  formData.append("name", file.name.toString());
  console.log(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/attachments/single`)
  return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/attachments/single`, formData)
  .pipe(map((addData: any) => { 
       this._reloadFileFolders$.next(true);
  }));  
}

private _deleteFileAttachment(id: number,file_managmentId:number) {
     
  return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/FileManagment/${file_managmentId}/attachments/${id}`);
}

async deleteFileAttachment(id: number,file_managmentId:number){
  return new Promise((resolve, reject) => {
   this.confirmationDialogService.confirm('Please confirm', this.translate.instant("Do you want to remove this item?") +" "+ this.translate.instant("This action cannot be undone!"), 'Yes','No',"lg",true)
  .then((confirmed) => {
    if (confirmed === true){
       this._deleteFileAttachment(id,file_managmentId).subscribe(
        (data: ResponseApi<boolean>)=>{
          if(data.success==true){
            this._reloadFileFolders$.next(true);
           // this.toaster.success(this.translate.instant("Delete successful."),this.translate.instant("Delete"),{positionClass:ToasterPosition.bottomRight});            
            resolve(true);
          }else{
            resolve(false);
          }          
        });
    }else{
      reject(false);
    }
  })
  .catch(() => {
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      resolve(false);
    }) 
  });
}

loadAttachmentsByManagmentId(file_managmentId:number) {
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/${file_managmentId}/attachments`);
}

previewImg(fileUrl:string,filename: string = null) {
  return this.http.get(`${fileUrl}`,{ responseType: 'blob'}).subscribe(
    (response: any) =>{        
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let blob = new Blob(binaryData, {type: dataType});
        window.open(window.URL.createObjectURL(new Blob(binaryData, {type: dataType})), '_blank');
      })
}

previewFile(fileUrl:string,filename: string = null) {
  //return this.http.get(`${environment.apiUrl}/file/private/${fileUrl}`);
  return this.http.get(`${fileUrl}`,{ responseType: 'blob'}).subscribe(
    (response: any) =>{        
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click(); 
      })
}

dowloadFile(fileUrl:string,filename: string = null) {
  //return this.http.get(`${environment.apiUrl}/file/private/${fileUrl}`);
  return this.http.get(`${environment.apiBaseUrl}/file/private/${fileUrl}`,{ responseType: 'blob'}).subscribe(
    (response: any) =>{        
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
            downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click(); 
      })
}

dowloadPublicFile(fileUrl:string,filename: string = null) {
  //return this.http.get(`${environment.apiUrl}/file/private/${fileUrl}`);
  return this.http.get(`${environment.apiBaseUrl}/file/public/${fileUrl}`,{ responseType: 'blob'}).subscribe(
    (response: any) =>{        
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
            downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click(); 
      })
}


public  getGeometriesByClient(): Observable<Array<File_Geometries>>{
  return this._getGeometriesByClient(this.user.client_id);
}

private _getGeometriesByClient(nClientId:number): Observable<Array<File_Geometries>> {
return this.http.get(`${environment.apiBaseUrl}/${nClientId}/fileManagment/geometries`)
  .pipe(
    map((dataResponse:ResponseApi<Array<File_Geometries>>)=> {
      if(dataResponse.success==true){
        
        this._lstFileGeometries$.next(dataResponse.data);
        return dataResponse.data;             
      }
      return [];
    })
  )
}

/* File Contacts */

public LinkContactToFile(file_managmentId: number,fileContact:any){
  return this.http.post(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/contact/${file_managmentId}`, fileContact);
}

public LoadAllContactsFilemanagment(file_managmentId: number){
  return this.http.get(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/contact/${file_managmentId}`);
}

public ChangeRoleFileContact(file_managmentId: number,fileContact:any){
  return this.http.put(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/contact/${file_managmentId}/changerole`, fileContact);
}


public DeleteFileContact(file_managmentId: number,fileContactid:any){
  return this.http.delete(`${environment.apiBaseUrl}/${this.user.client_id}/fileManagment/contact/${file_managmentId}/contact/${fileContactid}`);
}


}
