import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { CapakeyBasicComponent } from "../capakey-basic/capakey-basic.component";
import { CapaAdressComponent } from "../capa-adress/capa-adress.component";
import { DisplayparcelMapComponent } from "../displayparcel-map/displayparcel-map.component";
import { MobiscoreComponent } from "../mobiscore/mobiscore.component";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AlertService, AuthService, ConfirmationDialogService, EncryptionService, KlimConfigService, MapService, NearestparcellService } from '@shared/services';
import { Parcel, RequestCompanyAccess, Requests, ResponseApi, User } from '@shared/models';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { RequestsService } from '@shared/services/requests.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@Component({
  selector: 'app-add-request-main',
  standalone: true,
  imports: [
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    TranslateModule,
    NzSegmentedModule,
    FormsModule,
    CapakeyBasicComponent,
    CapaAdressComponent,
    NzTabsModule,
    NzModalModule,
    NzImageModule,
    DisplayparcelMapComponent,
    MobiscoreComponent,
    NzDividerModule
],
  templateUrl: './add-request-main.component.html',
  styleUrls: ['./add-request-main.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddRequestMainComponent implements OnInit {
  @Output() onDrawerCanClose= new EventEmitter<boolean>();
  @Input() valueRequestId: Subject<string>=new Subject<string>();
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"
  @Input() valueChangeForceClose: Subject<boolean>;
  @ViewChild('nzModalFooter', {read: TemplateRef}) nzModalFooter: TemplateRef<unknown> | undefined;

  private _reqObject: Requests= <Requests>{};
  private _hashReq: string ="";
  private _hashReqDefault: string ="";
  public oRequestsAcces: RequestCompanyAccess;
  private user: User;
  public totalCreditUsed:boolean=false;
  public requestSubmitedSuccessfull:boolean=false;
  public arrCapakeys: { [key: string]: boolean } = {};
  public bPreviewCapakey: BehaviorSubject<string>=new BehaviorSubject<string>('');
  public bDetailsExpanded:boolean |false;

  public extraCapakeys=[];
  public searchType:number=0;
  public capakeyReq:string = '';
  public addressReq:string = '';
  public tableRowData:any;
  nzData: { value: string,tableRow:any, outside: boolean } = inject(NZ_DRAWER_DATA);


  constructor(
    //private modal: NzModalService,
    private drawerRef: NzDrawerRef<AddRequestMainComponent, string>,
    private encryptionService:EncryptionService,
    private confirmationService: ConfirmationDialogService,
    private requestService: RequestsService,
    private alertService: AlertService,
    private translate: TranslateService,
    private accountService: AuthService,
    private requestsService: RequestsService,
    private mapService: MapService,
    private nearestparcellService: NearestparcellService,
    private changeDetect: ChangeDetectorRef,
    private klimConfigService: KlimConfigService,
  ){
        this.user = this.accountService.userValue;
        this.oRequestsAcces = new  RequestCompanyAccess();
        this.oRequestsAcces.totalRequests = '0';
        this.oRequestsAcces.totalRequestsAccess = '0';
        if (this.nzData) {
          this.capakeyReq=this.nzData['tableRow']['capakey']
          this.addressReq=this.nzData['tableRow']['address'];
          this.tableRowData=this.nzData['tableRow'];
        }

  }

  get mainCapakey(){
    return this._reqObject.capakey??"";
  }



  ngOnInit(): void {
    this.extraCapakeys=[];
   this.bDetailsExpanded=false;
   this.requestSubmitedSuccessfull=false;
   this._hashReq = this.encryptionService.encrypt(JSON.stringify(this._reqObject));    
   this._hashReqDefault = this._hashReq ; 
   //(document.querySelector('.ant-drawer-close') as HTMLElement).onclick = (event) => {

    this.loadLicenceRequests();
    this.nearestparcellService.resetNearestArray();
    this.nearestparcellService.arrNearest.subscribe((data : Array<Parcel>)=>{
      data.forEach((oParcel:Parcel)=>{
        if(this.extraCapakeys.findIndex(capa=>capa==oParcel.capakey)<0){
          this.extraCapakeys.push(oParcel.capakey);
          this.changeDetect.detectChanges();
        }
      })  
    })

    this.klimConfigService.MyConfigs$$.subscribe((element)=>{    
      if (this.accountService.userValue?.client?.type_id == element?.clientTypeId) {       
        setTimeout(() => {
          if(element?.defaultSearchMethod!=undefined && element?.defaultSearchMethod!=null){
            if(element.defaultSearchMethod=='CAPAKEY'){
              this.searchType=0;
            }else if(element?.defaultSearchMethod=='ADDRESS'){
               this.searchType=1;
            }
            this.changeDetect.detectChanges();
          }      
                 
        }, 1000);      
      }
     }); 
    
  }

  ngAfterViewInit(){
  (document.querySelector('.ant-drawer-close') as HTMLElement).addEventListener("click",  (event) => {
    //event.stopPropagation();
    if(this._hashReq!=this._hashReqDefault){
      this.valueChange.next("false");
      this.createModal();
    }else{
      this.valueChange.next("true");
    }
});
  }
createModal(){
  this.confirmationService.confirm('Unsaved Changes Detected.','You have unsaved changes. If you leave this page, your changes will be lost. Do you want to continue without saving?','Save changes',"Close","lg").then((result) => {
    if(result==false){
      this.onDrawerCanClose.emit(true)
      this.valueChange.next("false");
      this.valueChangeForceClose.next(true);
    }else if(result==true){      
        this.createRequest();     
    }

    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

}


createRequest(){
  this._reqObject.user_id=this.accountService.userValue.id.toString();

  let indexMainCapakey=this.extraCapakeys.findIndex(capa=>capa==this._reqObject.capakey);
  if(indexMainCapakey>=0){
    this.extraCapakeys.slice(indexMainCapakey,0);
  }
  let arrCapakeyToRequest=[];
  Object.keys(this.arrCapakeys).filter(capa=>capa!=this._reqObject.capakey).forEach(capa=>{
    arrCapakeyToRequest.push(capa);
  })

  if(arrCapakeyToRequest.length>0){
    this._reqObject.percelen=arrCapakeyToRequest.toString();
    this._reqObject.type="MULTI";
  }

  if (this.nzData && this.nzData['tableRow']!=undefined) {    
    this._reqObject.file_objectId=this.nzData['tableRow']['id'];
    this._reqObject.reference=this.nzData['tableRow']['region']+" "+this.nzData['tableRow']['name'];
    this._reqObject.filenumber=this.nzData['tableRow']['fileNumber'];    
  }
  this.requestService.AddRequest(this._reqObject) .pipe(first())
  .subscribe({
    next: (dataResponse:ResponseApi<Requests>)=> {
      if(dataResponse.success==true){
        this.alertService.clear();
        this.requestSubmitedSuccessfull=true;
        this.valueRequestId.next(dataResponse.data.id)

        if(this.bDetailsExpanded==true){
          let elemWrapper=document.querySelector(".ant-drawer-content-wrapper") as HTMLElement;
          elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper");
          this.bDetailsExpanded=false;
        }        
        //this.alertService.success('Request added successfully', { keepAfterRouteChange: true, autoClose: true});
        this.alertService.success(this.translate.instant('Request added successfully'),this.translate.instant("Save"));
        this.requestService.getByCompanyId(this.accountService.userValue.client_id);
        this.changeDetect.detectChanges();
        this._hashReq=this._hashReqDefault;
        
        //this.onDrawerCanClose.emit(true)
        //this.drawerRef.close(this.value);
        //this.valueChange.next("true");  
        //this.onSubmitButton.emit(false);
      }else{
        this.valueChange.next("false");
        this.alertService.error(this.translate.instant(dataResponse.message),this.translate.instant("Save"));
      }
    },
    error: error => {
      //this.alertService.error(error);
      this.valueChange.next("false");
      this.alertService.error(this.translate.instant(error),this.translate.instant("Save"));
      //window.scrollTo(0,0);
    }
  });
}

selectionChange(objRequest: any) {
  this.requestSubmitedSuccessfull=false;
  this._reqObject=objRequest;
  this._hashReq = this.encryptionService.encrypt(JSON.stringify(this._reqObject));   
  this.extraCapakeys=[];
  this.extraCapakeys.push(this._reqObject.capakey);
  this.loadParcelFromCapakey();
  this.ShowDetails();
}

private loadLicenceRequests(){
  if (Number(this.user.client_id) > 0){
    this.requestsService.getRequestAccesByCompanyId(this.user.client_id);
    this.requestsService.oRequestCompanyAccess$$.subscribe(data => {
      if (data !== undefined){        
        this.oRequestsAcces = data;
        if(this.oRequestsAcces?.totalRequests>=this.oRequestsAcces?.totalRequestsAccess){
          this.totalCreditUsed=true;
        }
      }

    });
  }
}

getBlurTabset(){
  if(this.totalCreditUsed==true){
    return 'filter: blur(4px)';
  }else{
    return "";
  }
}

closeDrawer(){
  (document.querySelector('.ant-drawer-close') as HTMLElement).click();
}

restRequest(){
  this.bDetailsExpanded=false;
  this.extraCapakeys=[];
  this.loadLicenceRequests();
  this.requestSubmitedSuccessfull=false;
 
}

AddToRequest(capakey){
  this.arrCapakeys[capakey]=capakey;
}
RemoveFromRequest(capakey){
  delete this.arrCapakeys[capakey];
}
previewCapakey(capakey){
  this.bPreviewCapakey.next(capakey);
}

get PreviewCapakeyValue(){
  return this.bPreviewCapakey.value;
}

ShowhideDetails(){
  this.bDetailsExpanded=!this.bDetailsExpanded;
  let elemWrapper=document.querySelector(".ant-drawer-content-wrapper") as HTMLElement; 
  if(  this.bDetailsExpanded==true){
    elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper expanded");
  }else{
    elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper");
  }
  
}

ShowDetails(){
  this.bDetailsExpanded=true;
  let elemWrapper=document.querySelector(".ant-drawer-content-wrapper") as HTMLElement; 
  if(  this.bDetailsExpanded==true){
    elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper expanded");
  }else{
    elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper");
  }
  this.previewCapakey(this.mainCapakey);
  
}

private loadParcelFromCapakey(){
  if(this._reqObject.capakey!=""){
    this.mapService.getParcelFromCapakey(this._reqObject.capakey).subscribe((data: any)=>{

      const rings=data.features[0].geometry;
      if (rings!=""){
        this.loadNearestPercelFromPolygon(rings);
      }  
    })
  }

}
private loadNearestPercelFromPolygon(sPolygon){
  this.nearestparcellService.getNearestPercell(sPolygon,this._reqObject.capakey);
}


}
