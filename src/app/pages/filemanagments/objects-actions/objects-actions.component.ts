import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject,CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
//import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { FilemanagmentAddEditComponent } from '../filemanagment-add-edit/filemanagment-add-edit.component';
//import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { File_Objects, ResponseApi, Requests, Combo } from '@shared/models';
//import { ContactsService, FormsService, EncryptionService } from '@shared/services';
import { EncryptionService, ConfirmationDialogService, FileManagmentService, RequestsService, AuthService, MapService, AlertService } from '@shared/services';
import { Subject, first } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import Polygon from '@arcgis/core/geometry/Polygon';
import { BehaviorSubject, Observable } from 'rxjs';
import * as projection from "@arcgis/core/geometry/projection";
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { DashEnvironmentalcheckComponent } from '../dash-environmentalcheck/dash-environmentalcheck.component';
import { AddRequestKlimComponent } from '../../geographical-searches/add-request-klim/add-request-klim.component';
import { AddRequestMainComponent } from '../../geographical-searches/add-request-main/add-request-main.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objects-actions',
  standalone: true,
  imports: [
    CommonModule, 
    NzGridModule, 
    NzToolTipModule, 
    NzIconModule, 
    TranslateModule,  
    FormsModule,
    NzDrawerModule,
    DashEnvironmentalcheckComponent,
    AddRequestKlimComponent,
    AddRequestMainComponent,
  ],
  providers: [NzModalService],
  templateUrl: './objects-actions.component.html',
  styleUrl: './objects-actions.component.scss'
})
export class ObjectsActionsComponent {

  rowData;
  items:any=[];
  public valueFormatted: string = '';
  valueCanCloseBasicRequest:string = "undefined";

  @Input() params: any;
  //@Output() onDrawerCanClose= new EventEmitter<boolean>();
  //@Output() refreshTable = new EventEmitter<void>();

  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"
  
  private _loadingEnviroment: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public loadingEnviroment: Observable<boolean>=this._loadingEnviroment.asObservable();  
  
  @ViewChild("displayenviroment", { static: false }) displayEnviroment: TemplateRef<any>
  @ViewChild("addObjectManual", { static: false }) addObjectManual: TemplateRef<any>

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private filemanagmentService: FileManagmentService,
      private requestService: RequestsService,
      private encryptionService : EncryptionService,
      private mapService: MapService,
      private modalService: NgbModal,
      private accountService : AuthService,
      private drawerService: NzDrawerService,
      private changeDetect:ChangeDetectorRef,
    ) {}

    agInit(params: ICellRendererParams): void {
      //console.log(params.data);
      this.value = params.data;
      this.valueFormatted = params.data.actions!;
    }
  
    refresh(params: ICellRendererParams): boolean {
      this.value = params.data;
      this.valueFormatted = params.data.actions!;
      return true;
    }

   async  onRemove(id){
    let deleteData=await this.filemanagmentService.deleteFileObjects(id,this.value['file_managment_id']);
    if(deleteData){
      this.requestService.notifyReqChanged();
      //this.loadFileObjects();     
    }
  }

  public downloadFile(sFileName:string){
    this.requestService.downloadDocuments(sFileName).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });

    // const url = window.URL.createObjectURL(blob);
    // window.open(url);

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = sFileName;
      // start download
      a.click();

  })
  }

  onPreviewClick(geometry?){
    //console.log(this.value);
    localStorage.setItem('geometry_preview',JSON.stringify(this.value['geometry']));
    //this.router.navigate(['/general/prospection/'], { relativeTo: this.route.parent });
  }

     //async  addRequest(row:File_Objects){
  async  addRequest(){
        if(this.value['capakey']=="" || this.value['capakey']==null ){
         let oCapaKey=await this.mapService.LoadCapakeyByGeometry(this.value['geometry']);
    
         if(oCapaKey!=null && oCapaKey.CaPaKey!=""){
          let oRequest: Requests=<Requests>{};
          oRequest.capakey=oCapaKey.CaPaKey;
          oRequest.file_objectId=Number(this.value['id']);
          oRequest.user_id=String(this.accountService.userValue.id);
          oRequest.reference=this.value['region'] +" "+this.value['name'];
          oRequest.filenumber=this.value['fileNumber'];
            this.requestService.AddRequest(oRequest).subscribe(dataResponse=>{
              //this.toastService.success(this.translateService.instant('Request added successfully'),this.translateService.instant("Save"));
              //this.loadFileObjects();
              this.requestService.notifyReqChanged();
            })
         }
        }else{
          let oRequest: Requests=<Requests>{};
          oRequest.capakey=this.value['capakey'];
          oRequest.file_objectId=Number(this.value['id']);
          oRequest.user_id=String(this.accountService.userValue.id);
          oRequest.reference=this.value['region'] +" "+this.value['name'];
          oRequest.filenumber=this.value['fileNumber'];;
            this.requestService.AddRequest(oRequest).subscribe(dataResponse=>{
              //this.toastService.success(this.translateService.instant('Request added successfully'),this.translateService.instant("Save"));         
              //this.loadFileObjects();
              this.requestService.notifyReqChanged();
            })
        }
  }

          /*loadFileObjects(){
            if(this._file_managmentId!=undefined){
              this.filemanagmentService.loadFileObjectsManagmentId(this._file_managmentId).subscribe((dataObjects:ResponseApi<Array<File_Objects>>)=>{
                this._lstFileObjects$.next(dataObjects.data);
                this.rowData = dataObjects.data;
              })
            }
        
          }*/
  
  public onEnviromentClick(geometry){
        console.log(geometry);
        this.loadOmgevingsCheck(geometry);
  }

  private loadOmgevingsCheck(polygon: any){
        this.items=[];
        this._loadingEnviroment.next(true);
        this.modalService.open(this.displayEnviroment, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });  
        let sPolygon = '';
        const polygonGeometry = new Polygon({
            hasZ: true,
            hasM: true,
            rings:polygon.rings,
            spatialReference: {wkid: 102100}
          });
              
        projection.load().then(function() {
            let conver :any =  projection.project(polygonGeometry,{wkid: 31370} );
                 conver.rings[0].forEach(element => {
                 if (sPolygon !== ''){
                          sPolygon += ',';
                        }                     
                        sPolygon += element[0] + ' ' + element[1];
                  });
            const PostObject: any = new Object();
            PostObject.dossierUuid = null;
            PostObject.locatieUuid = null;
            PostObject.locatieGeometrie = `POLYGON ((${sPolygon}))`;
            PostObject.aanvraagType = 'ARC';
            PostObject.doNotPersist = false;
              this.mapService.SendPostProxy('https://omgevingsloket.omgeving.vlaanderen.be/rest/omgevingscheck', PostObject).subscribe(
                        (data:any) => {
                            if(data?.themaDtos){
                              this.items=data.themaDtos              
                              this.changeDetect.detectChanges();
                              setTimeout(() => {
                                this._loadingEnviroment.next(false);
                              })
                            }       
                          },
                        error => {
                          this.toastService.error(this.translateService.instant("The service is temporarily unavailable. Please try again!"));
                        }            
                        );            
                  }.bind(this))
  }

  openDrawer(tableRow?): void {

    const drawerRef = this.drawerService.create<
    AddRequestKlimComponent,
      { 
        tableRow: object,
        outside: boolean },
      string
    >({
      nzTitle: '',
      nzWidth: '565px',
      nzBodyStyle: { value: "overflow: 'hidden'" },
      nzContent: AddRequestKlimComponent,
      nzData: {
        tableRow: tableRow,
        outside: true
      },
    });
  
  }


  AddBasicRequestDrawer(tableRow?): void {
    this.valueCanCloseBasicRequest='true';
    const valueChangeForceClose = new Subject<boolean>();  
    const valueRequestId = new Subject<string>();        
    const valueChange = new Subject<string>();        
    const valueChangeSubscription = valueChange
    .asObservable()
    .subscribe(value => {
      this.valueCanCloseBasicRequest = value;
    });
    const valueChangeRequestId =valueRequestId.asObservable()
    .subscribe(value => {
      this.requestService.notifyReqChanged();
    });

    const drawerRef = this.drawerService.create<AddRequestMainComponent>({
      nzTitle: '',
      nzFooter: "",
      nzExtra: '',
      nzMaskClosable:true,
      nzClosable:true,
      nzKeyboard:true,   
      nzWidth:"515px", 
      nzOnCancel:() => this.canClose().then(data=>{ return data}),//Promise.resolve(this.valueCanClose=="true"?true:false),
      nzContent: AddRequestMainComponent,
      nzData: {       
        valueChange,
        value: this.valueCanCloseBasicRequest,
        valueChangeForceClose: valueChangeForceClose,
        valueRequestId:valueRequestId,
        tableRow: tableRow,
      }, 
     /* nzData:{
        tableRow: tableRow,
      }  */
    });

    const valueChangeCloseSubscription = valueChangeForceClose
    .asObservable()
    .subscribe(value => {
      drawerRef.close();      
    });
  
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.valueCanCloseBasicRequest = data;
      }
    });      
  }

  async canClose() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanCloseBasicRequest=="true"?true:false);
      }, 100);
    });

   /* const drawerRef = this.drawerService.create<
    AddRequestKlimComponent,
      { 
        tableRow: object,
        outside: boolean },
      string
    >({
      nzTitle: '',
      nzWidth: '565px',
      nzBodyStyle: { value: "overflow: 'hidden'" },
      nzContent: AddRequestKlimComponent,
      nzData: {
        tableRow: tableRow,
        outside: true
      },
    });*/
  
  }


}
