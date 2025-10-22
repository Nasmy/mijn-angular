import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertService, AuthService, ConfirmationDialogService, EncryptionService, KlimConfigService, MapService, NearestparcellService } from '@shared/services';
import { Alert, Company, KlimCombo, Parcel, RequestCompanyAccess, Requests, RequestsArray, ResponseApi, User, klimConfigs } from '@shared/models';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { RequestsService } from '@shared/services/requests.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import { DatePipe } from '@angular/common';

import * as jsonEN from './en.json';
import * as jsonNL from './nl.json';
import * as jsonFR from './fr.json';
import { CompanyService } from '@shared/services/company.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-add-request-klim',
  standalone: true,
  imports: [
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,  
    ReactiveFormsModule ,
    MatInputModule,
    MatSelectModule,
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
    NzDividerModule,
    MatDatepickerModule,
    NzAlertModule,
    MatMomentDateModule,
    MatNativeDateModule
  ],
  templateUrl: './add-request-klim.component.html',
  styleUrls: ['./add-request-klim.component.scss'],
  providers:[ 
    provideNativeDateAdapter(),
    /*
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}*/
  ]
})
export class AddRequestKlimComponent {
  @Output() onDrawerCanClose= new EventEmitter<boolean>();
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"
  @Input() valueChangeForceClose: Subject<boolean>;
  @ViewChild('nzModalFooter', {read: TemplateRef}) nzModalFooter: TemplateRef<unknown> | undefined;

  private _reqObject: Requests= <Requests>{};
  private _hashReq: string ="";
  private _hashReqDefault: string ="";
  public oRequestsAcces: RequestCompanyAccess;
  private user: User=<User>{};
  public totalCreditUsed:boolean=false;
  public requestSubmitedSuccessfull:boolean=false;
  public arrCapakeys: { [key: string]: boolean } = {};
  public bPreviewCapakey: BehaviorSubject<string>=new BehaviorSubject<string>('');
  public bDetailsExpanded:boolean |false;
  public extraCapakeys=[];
  public capakeyReq:string = '';
  public addressReq:string = '';
  public form: FormGroup | undefined;
  submitted
  private basicApiUrl:string="";
  public searchType:number=1;
  private companies:Company=<Company>{};
  arrCombos: { [key: string]: Array<KlimCombo> } = {};
  arrCombosFiltered: { [key: string]: Array<KlimCombo> } = {};
  public allertMessage:Alert;
  private myDefaultConfiguration:klimConfigs=<klimConfigs>{};
  public bKlim:boolean=true;
  public tableRowData:any;
  
  nzData: { value: string, outside: boolean } = inject(NZ_DRAWER_DATA);


  constructor(
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
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private klimConfigService: KlimConfigService,
    private datePipe: DatePipe,

  ){
    
        if (this.nzData) {
          this.capakeyReq=this.nzData['tableRow']['capakey']
          this.addressReq=this.nzData['tableRow']['address'];
          this.tableRowData=this.nzData['tableRow'];
        }
    
        this.user = this.accountService.userValue;
        this.oRequestsAcces = new  RequestCompanyAccess();
        this.oRequestsAcces.totalRequests = '0';
        this.oRequestsAcces.totalRequestsAccess = '0';

        if (this.accountService.checkMode('Test') === false){
          this.basicApiUrl="https://klim-cicc.be/api/v1/";
        }else{
         // acceptatie not working more  this.basicApiUrl="https://klim-acc.geosolutions.be/api/v1/"
          this.basicApiUrl="https://klim-cicc.be/api/v1/";
        }

  }

  get mainCapakey(){
    return this._reqObject.capakey??"";
  }

  ngOnInit(): void {
   this.allertMessage=<Alert>{};
   this.extraCapakeys=[];
   this.bDetailsExpanded=false;
   this.requestSubmitedSuccessfull=false;
   this._hashReq = this.encryptionService.encrypt(JSON.stringify(this._reqObject));    
   this._hashReqDefault = this._hashReq ; 
   this.getPlanrequestorType();
   this.getExecutionMethode();
   this.getActorType();
   this.getWorkType();

   this.form = this.formBuilder.group({
    typeMelding_id:['',Validators.required],
    work_description:['',Validators.required],
    execMethode_id:['',Validators.required],
    actorType_id:['',Validators.required],
    workType_id:['',Validators.required],
    startDate:[''],
    endDate:[''],
  });


    if(this.accountService.userValue!=null && this.accountService.userValue!=undefined){
      this.user=this.accountService.userValue;
      this.companyService.getMyCompany(this.accountService.userValue.client_id);
    }
    this.companyService.company$$.subscribe((dataCompany:Company)=>{
      if(dataCompany!=null && dataCompany!=undefined){
        this.companies=dataCompany;
       /* if(dataCompany.type_id!=undefined){
          this.klimConfigService.getByClientTypeId(dataCompany.type_id);  
        } */
      }     
    });

    this.klimConfigService.MyConfigs$$.subscribe((element)=>{    
      if (this.accountService.userValue?.client?.type_id == element?.clientTypeId) {
        this.myDefaultConfiguration.actorType_id=element?.actorType_id;
        this.myDefaultConfiguration.typeMelding_id=element?.typeMelding_id;
        this.myDefaultConfiguration.workType_id=element?.workType_id;        
        this.myDefaultConfiguration.execMethode_id=element?.execMethode_id;

        setTimeout(() => {
          this.form.get("actorType_id").setValue(element?.actorType_id);
          this.form.get("typeMelding_id").setValue(element?.typeMelding_id);
          this.form.get("workType_id").setValue(element?.workType_id);
          this.form.get("execMethode_id").setValue(element?.execMethode_id);
          this.form.get("startDate").setValue(new Date());          
          this.form.get("endDate").setValue(new Date(new Date().addDays(element?.amountDays)));

          if(element?.defaultSearchMethod!=undefined && element?.defaultSearchMethod!=null){
            if(element.defaultSearchMethod=='CAPAKEY'){
              this.searchType=0;

            }else if(element?.defaultSearchMethod=='ADDRESS'){
               this.searchType=1;
            }
          }
          this.onMeldingChange(element?.typeMelding_id);
          this.changeValidators();          
        }, 1000);      
      }
     });  
   (document.querySelector('.ant-drawer-close') as HTMLElement).addEventListener("click",  (event) => {
        //event.stopPropagation();
        if(this._hashReq!=this._hashReqDefault){
          this.valueChange.next("false");
          this.createModal();
        }else{
          this.valueChange.next("true");
        }
    });
    
    this.loadLicenceRequests();
    this.nearestparcellService.resetNearestArray();

    this.alertService.onAlert().subscribe(allertData=>{
      this.allertMessage=allertData;
     });

      /* this.nearestparcellService.arrNearest.subscribe((data : Array<Parcel>)=>{
          data.forEach((oParcel:Parcel)=>{
              this.extraCapakeys.push(oParcel.capakey);
              this.changeDetect.detectChanges();
            })  
          })
      */
    
 
  }

get f() {
    return this.form.controls;
}

createModal(){
  this.confirmationService.confirm(this.translate.instant('Unsaved Changes Detected.'),this.translate.instant('You have unsaved changes. If you leave this page, your changes will be lost. Do you want to continue without saving?'),this.translate.instant('Save changes'),this.translate.instant("Close"),"lg").then((result) => {
    if(result==false){
      this.onDrawerCanClose.emit(true)
      this.valueChange.next("false");
      this.valueChangeForceClose.next(true);
    }else if(result==true){      
        this.createRequest();     
    }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}


onSubmit(event=false){
  this.submitted = true;
 // this.form.markAsTouched();
  this.form.markAllAsTouched();
  (this.form as any).submitted = true;

  this.changeValidators();

  // reset alerts on submit
  this.alertService.clear();
  // stop here if form is invalid
  if (this.form.invalid) {
    this.changeDetect.detectChanges();
    return;
  }

}

 public async createRequest(){
   this.submitted = true;  
   this.form.markAllAsTouched();
   (this.form as any).submitted = true; 
   this.changeValidators();    
   this.alertService.clear();
   // stop here if form is invalid
   if (this.form.invalid 
    || this._reqObject.capakey==""
    || this._reqObject.capakey==undefined
    || this._reqObject.reference==""
    || this._reqObject.reference==undefined
  ) {
     this.changeDetect.detectChanges();
     return;
   }
   if (this.nzData  && this.nzData['tableRow']!=undefined) {    
    this._reqObject.file_objectId=this.nzData['tableRow']['id'];
    this._reqObject.reference=this.nzData['tableRow']['region']+" "+this.nzData['tableRow']['name'];
    this._reqObject.filenumber=this.nzData['tableRow']['fileNumber'];    
  }

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
  await this.addKlimRequest(this._reqObject); 
}


private async addKlimRequest(oRequest: Requests){
  this.alertService.clear();
  const polygons: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  const polygons$$: Observable<Array<any>> = polygons.asObservable();
  polygons.next([])
  this.mapService.getParcelFromCapakey(oRequest.capakey).subscribe((data: any) => {   
    const polygon = { type: "Polygon", coordinates: data.features[0].geometry.rings };
    const currentValue = polygons.value;
    const updatedValue = [...currentValue, polygon];
    if (updatedValue.length) {
      polygons.next(updatedValue);
    }
  })

  const location = await this.mapService.LoadPostalCodeAndMunicipalityByCapakey(oRequest.capakey);
  polygons.subscribe(dataPolygon => {
    if (dataPolygon != undefined && dataPolygon.length > 0 && location!="") {
      const oGeoJson: any = this.prepareGeoJson(dataPolygon);
      const oKlimObject: any = new Object();
      oKlimObject.planRequestType = this.form.get('typeMelding_id').value;
      oKlimObject.announcerIdentification = oRequest.reference;
      oKlimObject.workDescription = this.form.get('work_description').value;
      oKlimObject.location = location;

      if (this.form.get('typeMelding_id').value == 7 || this.form.get('typeMelding_id').value == 8) {
        oKlimObject.workType = 0;
        oKlimObject.executionMethod = 0;
        if (this.form.get('typeMelding_id').value == 7) {
          oKlimObject.startDate = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd').toString();
          oKlimObject.endDate = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd').toString();
        }
      } else {
        oKlimObject.workType = this.form.get('workType_id').value;
        oKlimObject.executionMethod = this.form.get('execMethode_id').value;
        oKlimObject.startDate = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd').toString();
        oKlimObject.endDate = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd').toString();
      }

      if (this.form.get('typeMelding_id').value == 10) {
        //Powalco request
        oKlimObject.mainAdminIds = ["3AA8C6B0-01F0-4B4C-8224-573319870643"];
      }

      //User Data
      oKlimObject.planRequestor = new Object();
      oKlimObject.planRequestor.id = "";
      oKlimObject.planRequestor.email = this.user.email;
      oKlimObject.planRequestor.firstName = this.user.firstname;
      oKlimObject.planRequestor.lastName = this.user.lastname;
      oKlimObject.planRequestor.type = this.form.get('actorType_id').value;

      const language = localStorage.getItem("language")

      switch (language) {
        case "en-US":
          oKlimObject.planRequestor.language = "En";
          break;
        case "nl-NL":
          oKlimObject.planRequestor.language = "Nl";
          break;
        case "fr-FR":
          oKlimObject.planRequestor.language = "Fr";
          break;
        case "de-DE":
          oKlimObject.planRequestor.language = "De";
          break;
      }

      // Company Data
      oKlimObject.planRequestor.company = this.companies.name;
      oKlimObject.planRequestor.street = this.companies.street;
      oKlimObject.planRequestor.houseNumber = this.companies.number;
      oKlimObject.planRequestor.postalCode = this.companies.zip;
      oKlimObject.planRequestor.municipality = this.companies.city;
      oKlimObject.planRequestor.country = "BELGIE";
      oKlimObject.planRequestor.phoneNumber = this.companies.phone;
      oKlimObject.zone = oGeoJson;

      const oKlimRequest: any = new Object();
      oKlimRequest.links = new Object();
      oKlimRequest.links.Self = "string";
      oKlimRequest.data = new Object();
      oKlimRequest.data.type = "string";
      oKlimRequest.data.attributes = oKlimObject
      console.log("=================== KLIM =============================");
      console.log(oKlimRequest)
      console.log("=================== END KLIM =============================");
      
     this.requestsService.addRequestWithKlim(oKlimRequest, oRequest).then((dataResponse: any) => {
        this.alertService.clear();
        this.requestSubmitedSuccessfull=true;
        if(this.bDetailsExpanded==true){
          let elemWrapper=document.querySelector(".ant-drawer-content-wrapper") as HTMLElement;
          elemWrapper.setAttribute("class" ,"ant-drawer-content-wrapper");
          this.bDetailsExpanded=false;
        }     
       
        this.alertService.success(this.translate.instant('Request added successfully'),this.translate.instant("Save"));
        this.requestService.getByCompanyId(this.accountService.userValue.client_id).subscribe((data: RequestsArray)=>{
    
        })
        this.changeDetect.detectChanges();
        this._hashReq=this._hashReqDefault;  
      })
        .catch(
          function Err(error) {
            this.displayError(error)
          }.bind(this)
        )
    }

  })

}

selectionChange(objRequest: any) {
  this.requestSubmitedSuccessfull=false;
  this._reqObject=objRequest;
  this._hashReq = this.encryptionService.encrypt(JSON.stringify(this._reqObject));   
  this.extraCapakeys=[];
  this.extraCapakeys.push(this._reqObject.capakey);
  this.loadParcelFromCapakey();
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
  this.form.reset();
  this._reqObject=<Requests>{};
  this.loadLicenceRequests();
  this.requestSubmitedSuccessfull=false; 
  this.form.get("actorType_id").setValue(this.myDefaultConfiguration?.actorType_id);
  this.form.get("typeMelding_id").setValue(this.myDefaultConfiguration?.typeMelding_id);
  this.form.get("workType_id").setValue(this.myDefaultConfiguration?.workType_id);
  this.form.get("execMethode_id").setValue(this.myDefaultConfiguration?.execMethode_id);
  this.form.get("startDate").setValue(new Date());          
  this.form.get("endDate").setValue(new Date(new Date().addDays(this.myDefaultConfiguration?.amountDays)));
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

private loadParcelFromCapakey(){
  this.mapService.getParcelFromCapakey(this._reqObject.capakey).subscribe((data: any)=>{

    const rings=data.features[0].geometry;
    if (rings!=""){
      //this.loadNearestPercelFromPolygon(rings);
    }

  })
}
private loadNearestPercelFromPolygon(sPolygon){
  this.nearestparcellService.getNearestPercell(sPolygon,this._reqObject.capakey);
}



onMeldingChange(event){
  if (event?.value==8 || event==8){
    this.f['execMethode_id'].disable();
    this.f['workType_id'].disable();
    this.f['startDate'].disable();
    this.f['endDate'].disable();

  }else if (event?.value==7 ||  event==7){

    this.f['execMethode_id'].disable();
    this.f['workType_id'].disable();

  }else{
    this.f['execMethode_id'].enable();
    this.f['workType_id'].enable();
    this.f['startDate'].enable();
    this.f['endDate'].enable();
  }


}

onMethodeChange(event){
  console.log("methode changed");
}

datumChanged(event) {
  this.alertService.clear();
  if (this.f['startDate'].valid && this.f['endDate'].valid) {
    if (this.f['startDate'].value > this.f['endDate'].value && this.f['startDate'].value != "" && this.f['endDate'].value != "") {
      this.alertService.error( this.translate.instant("End date can not be lower than start date!"));
    }
  } else {    
    this.alertService.error( this.translate.instant("Please enter a valid date!"));
  }
}

getPlanrequestorType(){
  this.arrCombos["REQTYPE"]=[];
  const workUrl : string=this.basicApiUrl+ "code/planrequesttype";
  this.mapService.SendGetProxy(workUrl).subscribe((dataType: ResponseApi<Array<KlimCombo>>)=>{
    const  arrDataResponse: Array<KlimCombo>=new ResponseApi<Array<KlimCombo>>(dataType).Data;
    arrDataResponse.forEach(element => {
      element.SystemCode=this.getBasicTranslateValueFromJson(element,element.Description);
      element.languageValue=this.getLanguageValue(element.SystemCode);
    });
    this.arrCombos["REQTYPE"]=arrDataResponse
  })
}

getExecutionMethode(){
  this.arrCombos["EXEMETHOD"]=[];
  const workUrl : string=this.basicApiUrl+ "code/executionmethod";
  this.mapService.SendGetProxy(workUrl).subscribe((dataType: ResponseApi<Array<KlimCombo>>)=>{
    const  arrDataResponse: Array<KlimCombo>=new ResponseApi<Array<KlimCombo>>(dataType).Data;
    arrDataResponse.forEach(element => {
      element.SystemCode=this.getBasicTranslateValueFromJson(element,element.Description);
      element.languageValue=this.getLanguageValue(element.SystemCode);
    });
   // console.log(arrDataResponse)

    this.arrCombos["EXEMETHOD"]=arrDataResponse;
  })
}

getActorType(){
  this.arrCombos["ACTORTYPE"]=[];
  const workUrl : string=this.basicApiUrl+ "code/actortype";
  this.mapService.SendGetProxy(workUrl).subscribe((dataType: ResponseApi<Array<KlimCombo>>)=>{
    const  arrDataResponse: Array<KlimCombo>=new ResponseApi<Array<KlimCombo>>(dataType).Data;
    arrDataResponse.forEach(element => {
      element.SystemCode=this.getBasicTranslateValueFromJson(element,element.Description);
      element.languageValue=this.getLanguageValue(element.SystemCode);
    });
    this.arrCombos["ACTORTYPE"]=arrDataResponse;
  })
}

getWorkType(){
  this.arrCombos["WORKTYPE"]=[];
  const workUrl : string=this.basicApiUrl+ "code/worktype";

  this.mapService.SendGetProxy(workUrl).subscribe((dataType: ResponseApi<Array<KlimCombo>>)=>{
    const  arrDataResponse: Array<KlimCombo>=new ResponseApi<Array<KlimCombo>>(dataType).Data;
    arrDataResponse.forEach(element => {
      element.SystemCode=this.getBasicTranslateValueFromJson(element,element.Description);
      element.languageValue=this.getLanguageValue(element.SystemCode);
    });
    this.arrCombos["WORKTYPE"]=arrDataResponse;
  })
}



private getBasicTranslateValueFromJson(object, value){
  const key = Object.keys(jsonEN).find(key => jsonEN[key] === value);
  return key;
}

private getLanguageValue(key){
  const language=localStorage.getItem("language");
  let langValue="";
    switch(language){
      case "en-US":
        langValue=jsonEN[key];
      break;
      case "nl-NL":
        langValue=jsonNL[key];
      break;
      case "fr-FR":
        langValue=jsonFR[key];
      break;
      case "de-DE":
        langValue=jsonFR[key];
      break;
      default:{
        langValue=jsonEN[key]
        break;
      }
    }

    if(langValue!=undefined){
      return langValue;
    }else{
      return key;
    }
}

private changeValidators(){

   this.form.controls["typeMelding_id"].setValidators([Validators.required,Validators.min(1)]);
   this.form.get("typeMelding_id").updateValueAndValidity();
   this.form.controls["work_description"].setValidators([Validators.required]);
   this.form.get("work_description").updateValueAndValidity();
   this.form.controls["actorType_id"].setValidators([Validators.required,Validators.min(1)]);
   this.form.get("actorType_id").updateValueAndValidity();


  if (this.form.get('typeMelding_id').value == 7 || this.form.get('typeMelding_id').value == 8) {
    this.form.controls["execMethode_id"].clearValidators();
    this.form.get("execMethode_id").updateValueAndValidity();
    this.form.controls["workType_id"].clearValidators();
    this.form.get("workType_id").updateValueAndValidity();


    if (this.form.get('typeMelding_id').value == 7) {
      this.form.controls["startDate"].setValidators([Validators.required]);
      this.form.get("startDate").updateValueAndValidity();
      this.form.controls["endDate"].setValidators([Validators.required]);
      this.form.get("endDate").updateValueAndValidity();

    }else{
      this.form.controls["startDate"].clearValidators();
      this.form.get("startDate").updateValueAndValidity();
      this.form.controls["endDate"].clearValidators();
      this.form.get("endDate").updateValueAndValidity();
    }

  } else {
    this.form.controls["execMethode_id"].setValidators([Validators.required,Validators.min(1)]);
    this.form.get("execMethode_id").updateValueAndValidity();
    this.form.controls["workType_id"].setValidators([Validators.required,Validators.min(1)]);
    this.form.get("workType_id").updateValueAndValidity();

    this.form.controls["startDate"].setValidators([Validators.required]);
    this.form.get("startDate").updateValueAndValidity();
    this.form.controls["endDate"].setValidators([Validators.required]);
    this.form.get("endDate").updateValueAndValidity();
  }
}


private prepareGeoJson(polygon:any){
  if (polygon.length>0){
      const  oGeoJSon: any=new Object();
      oGeoJSon.type="FeatureCollection";
      oGeoJSon.name="string";
      oGeoJSon.crs=new Object();
      oGeoJSon.crs.type="name";
      oGeoJSon.crs.properties=new Object();
      oGeoJSon.crs.properties.name="urn:ogc:def:crs:EPSG::31370";
      const VarFeatures : any=new Object();
      VarFeatures.type="Feature";
      VarFeatures.properties=new Object();
      VarFeatures.properties.id="1";
      VarFeatures.geometry=new Object();
      VarFeatures.geometry.type="Polygon";      
      VarFeatures.geometry=polygon[0];
      VarFeatures.geometry.type="Polygon";
      oGeoJSon.features=[];
      oGeoJSon.features.push(VarFeatures);
      return oGeoJSon;
    }
    return ""
}




}
