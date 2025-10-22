import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProspectionType, TypeParcel } from '@shared/enums';
import { File_Objects, ResponseApi, Requests, Combo, File_Managment } from '@shared/models';
import { AuthService, ComboService, EncryptionService, FileManagmentService, MapService, ProspectionGewestPlanService, RequestsService } from '@shared/services';
import { LocalizationService } from '@shared/services/localization.service';
import Polygon from '@arcgis/core/geometry/Polygon';
import { BehaviorSubject, Observable } from 'rxjs';
import * as projection from "@arcgis/core/geometry/projection";
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NzCardModule } from 'ng-zorro-antd/card';
//import { FileObjectsModalComponent } from '../file-objects-modal/file-objects-modal.component';
import { ObjectsActionsComponent } from '../objects-actions/objects-actions.component';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams, RowSelectionMode, RowSelectionOptions, colorSchemeDarkBlue, colorSchemeLight, themeQuartz } from 'ag-grid-enterprise';

@Component({
  selector: 'app-file-objects-modal',
  standalone: true,
  imports: [MatTableModule, 
            AgGridModule, 
            MatListModule, 
            MatPaginatorModule, 
            NzCardModule,
            MatSortModule, 
            NgbTooltipModule, 
            CommonModule, 
            TranslateModule, 
            ReactiveFormsModule, 
            MatInputModule, 
            MatSelectModule, 
            MatAutocompleteModule, 
            MatIconModule],
  templateUrl: './file-objects-modal.component.html',
  styleUrl: './file-objects-modal.component.scss'
})
  
export class FileObjectsModalComponent implements OnInit {
  

    nzData: { value: number, reference: string } = inject(NZ_MODAL_DATA);

    @ViewChild( MatSort ) sort: MatSort;
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild("displayenviroment", { static: false }) displayEnviroment: TemplateRef<any>
    @ViewChild("addObjectManual", { static: false }) addObjectManual: TemplateRef<any>
  
    private _lstFileObjects$: BehaviorSubject<Array<File_Objects>> = new BehaviorSubject<Array<File_Objects>>(null);
    public  lstFileObjects$$: Observable<Array<File_Objects>> = this._lstFileObjects$.asObservable();
  
    private _loadingEnviroment: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
    public loadingEnviroment: Observable<boolean>=this._loadingEnviroment.asObservable();  
    
    private _loadingnewObject: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
    public loadingnewObject: Observable<boolean>=this._loadingnewObject.asObservable();
    columnChooserMode=false;

    private _fileManagment:File_Managment=<File_Managment>{};
  
    public autoFilter: Observable<Combo[]> | undefined;
    public ItemsCapakey: Combo[] | undefined;
    private _capaKey="";
    items:any=[];
    selectedRowIndex:any;
    //dataSource = new MatTableDataSource<any>([]);
    //displayedColumns: string[] = ['region', 'municipality', 'department','section','type_prospection','type_parcel','area_from','area_to','object_id','capakey','area','type_area','type','status','address','request','environment','remove'];
    columns = [
      { name: 'preview', show: true, disabled:true },
      { name: 'region', show: true, disabled:true },
      { name: 'municipality', show: true, disabled:true },
      { name: 'department', show: true, disabled:true },
      { name: 'section', show: true, disabled:true },
      { name: 'type_prospection', show: true, disabled:false },
      { name: 'type_parcel', show: true, disabled:false },
      { name: 'area_from', show: true, disabled:false },
      { name: 'area_to', show: true, disabled:false },
      { name: 'object_id', show: false, disabled:false },
      { name: 'capakey', show: true, disabled:false },
      { name: 'area', show: true, disabled:false },
      { name: 'type_area', show: false, disabled:false },
      { name: 'type', show: false, disabled:false },
      { name: 'status', show: false, disabled:false },
      { name: 'address', show: true, disabled:false },
      { name: 'gewestplan', show: true , disabled:false},
      { name: 'request', show: true , disabled:true},    
      { name: 'environment', show: true, disabled:true },
      { name: 'remove', show: true, disabled:true },
    ];
  
    get displayedColumns(){return  this.columns.filter((c) => c.show).map((c) => c.name)};  
    get displayed(){return  this.columns.filter((c) => c.disabled==false)};
    selectedOptions = [];
  
    private _file_managmentId:number;
    private _reference:string;

    
    rowData;
    public paginationPageSize = 50;
    public paginationPageSizeSelector: number[] | boolean = [50, 100, 200];
    
    public defaultColDef: ColDef = {
      filter: "agTextColumnFilter",
      floatingFilter: false,
      flex: 1,
    };
    public defaultColDefContacts: ColDef = {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    };
  
    @Input()
    set file_managmentId(id: number) {
      this._file_managmentId = id;
    }  
    //get file_managmentId(): number {
    get file_managmentId(): number {
      return this._file_managmentId;
    }
  
    @Input()
    set reference(sReference: string) {
      this._reference = sReference;
    }  
    get reference(): string {
      return this._reference;
    }
  
    public form: FormGroup | undefined;
  
    constructor(
      private translateService : TranslateService ,
      private encryptionService : EncryptionService ,
      private filemanagmentService:FileManagmentService,
      private changeDetect:ChangeDetectorRef,
      private modalService: NgbModal,
      private mapService: MapService,
      private requestService: RequestsService,
      private accountService : AuthService,
      private modalZService: NzModalService,
      //private toastService:ToastrService,
      private route:ActivatedRoute,
      private router:Router,
      private formBuilder: FormBuilder,
      private comboService:ComboService,
      private prospectionGewestplanService:ProspectionGewestPlanService,
    
     
  
    ) {
      this.loadFileObjects();

      this._fileManagment = this.nzData['fileManagement'];
      console.log(this._fileManagment);

      this._file_managmentId = this.nzData['value'];
      console.log(this._file_managmentId);
    }

    public colDefs: ColDef<any>[] = [
          //{ field: "user", cellRenderer: TableAvatarComponent,},
            { field: "capakey", headerName: this.translateService.instant("Capakey")},
            { field: "address", headerName: this.translateService.instant("Address")},
            { field: "region", headerName: this.translateService.instant("Region")},
            { field: "type_prospection", headerName: this.translateService.instant("Type Prospection")},
            { field: "type_parcel", headerName: this.translateService.instant("Type Parcel")},
            { field: "area_from", headerName: this.translateService.instant("Area from")},
            { field: "area_to", headerName: this.translateService.instant("Area to")},
            { field: "area", headerName: this.translateService.instant("Area")},
            { field: "gewest_plan", headerName: this.translateService.instant("Gewestplan")},
            /*{ field: "municipality"},
            { field: "department"},
            { field: "gewest_plan"},
            { field: "section"},*/
            /*{ field: "role", headerName:"Role", cellRenderer: RoleActionComponent, floatingFilter: false, filter: false, width: 50, 
              valueGetter: params => {
                return params.data.name;
              },
              valueSetter: params => {
              params.data = params.newValue;
              return true;
              },
              onCellValueChanged:(ev)=>{
                console.log(ev);
                //this.onFileRoleChange(ev.data);
              }
            },    */
            
            /*{ field: "actions", headerName:"Role", cellRenderer: ObjectsActionsComponent, floatingFilter: false, filter: false, width: 50 }*/
            { field: "actions", headerName: this.translateService.instant("Acties"), cellRenderer: ObjectsActionsComponent, floatingFilter: false, filter: false, width: 50 }
          ];

    ngOnInit(): void {
      const CapakeyValidators = [ Validators.required,Validators.pattern("^[0-9]{5}[A-Z]{1}([0-9]{4})\/([0-9]{2})([A-Z\_]{1})([0-9]{3})$")];
      this.form = this.formBuilder.group({   
        capakey: ['',CapakeyValidators],
        capakeyAdress: [''],
      });
  
      this.form.get('capakey').valueChanges.subscribe(value => this.mat_filter(value));

      this.requestService.reqListChanged$.subscribe(() => {
        this.loadFileObjects(); // Reload data when notified
      });
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['file_managmentId'] !== undefined &&  changes['file_managmentId'].currentValue !== changes['file_managmentId'].previousValue) {
        this.loadFileObjects();
      }
    }  
    
    get f(){
      return this.form.controls;
    }
    onSort(sort: Sort) {
      // resetting other headers     
    }
  
    loadFileObjects(){
      //console.log(this.nzData);
      if(this.nzData['value']!=undefined){
        this.filemanagmentService.loadFileObjectsManagmentId(this.nzData['value']).subscribe((dataObjects:ResponseApi<Array<File_Objects>>)=>{
          this._lstFileObjects$.next(dataObjects.data);
          let arr: Array<File_Objects>=[];
          dataObjects.data.forEach(element => {
            let obj :File_Objects=<File_Objects>{}
            obj.id=element.id
            obj.address=element.address
            obj.area=element.area
            obj.area_from=element.area_from
            obj.area_to=element.area_to
            obj.capakey=element.capakey
            obj.created_at=element.created_at
            obj.region=element.region
            obj.type_prospection=this.translateService.instant(element.type_prospection)
            obj.type_parcel=this.translateService.instant(element.type_parcel)
            obj.gewest_plan=element.gewest_plan

            obj.fileManagment=element.fileManagment
            obj.file_managment_id=element.file_managment_id
            obj.geometry=element.geometry
            obj.object_id=element.object_id
            obj.request=element.request
            obj.request_id=element.request_id
            obj.updated_at=element.updated_at
            obj.municipality=element.municipality
            obj.section=element.section
            obj.status=element.status
            obj.type=element.type
            obj.type_area=element.type_area
            obj.name=this._fileManagment.name
            obj.fileNumber=this._fileManagment.file_number
           


            arr.push(obj)
          });
          this.rowData=arr;
          //this.rowData = dataObjects.data;
          /*this.dataSource.data = dataObjects.data;      
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;*/
        })
      }
  
    }
  
    highlight(rowindex){
      this.selectedRowIndex=rowindex;
    }  
  
   async  onRemove(id){
      let deleteData=await this.filemanagmentService.deleteFileObjects(id,this._file_managmentId);
      if(deleteData){
        this.loadFileObjects();     
      }
    }
  
    GetFileType(row:File_Objects){
  
      if(row.type_prospection==ProspectionType.Parcel || row.type_prospection==ProspectionType.NotLivingBuidings){
        return this.getType(row.type);
      }else{
        return this.getBuildType(row.type);
      }
    }
  
    public GetFileStatus(row){
      if(row.type_prospection==ProspectionType.Parcel || row.type_prospection==ProspectionType.NotLivingBuidings){
        return "";
      }else{
        return this.getBuildStatus(row.status);
      }
    }
  
  
    private  getType(value){
  
      switch(value){
  
        case "PR":
          {
            return "Privaat domein"
          }
         case "PP":
            {
              return "Publiek domein"
            }
      }

      return null;
      
    }
  
    private getBuildType(value){
  
      switch(value){
  
        case "CL":
          {
            return "gesloten"
          }
         case "ON":
          {
              return "open zonder bovenbouw"
          }
         case "OO":
          {
                return "open met bovenbouw"
          }
         case "UN":
          {
                  return "ondergronds"
          }       
          case "BUILDING":
          {
                  return "hoofdgebouw, bijgebouw"
          }        
          case "STRUCTURE":
          {
                  return "cabine, koeltoren"
          }
          case "UNDEFINED":
            {
                    return "carport"
            }
  
      }

      return null;
      
    }
  
    public getTypeArea(value){
  
      switch(value){
      case "GR":{ return "Grafisch"}
      case "VE":{ return "Geverifieerd"}
      case "ME":{ return "Gemeten"}
      case "TI":{ return "Titel"}
      default:{return value}
      }
    }
  
    getBuildStatus(value){
  
      switch(value){
  
           case "PLD":
           {
             return "Planned"
           }
           case "REA":
            {
              return "Realised"
            }       
            case "HIS":
            {
              return "Historic"
            }          
            case "NREA":
            {
              return "Not realised"
            }          
            case "UCON":
            {
              return "Under construction"
            }
      }    

      return null;

    }
  
   public onEnviromentClick(geometry){
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
  
  
   async  addRequest(row:File_Objects){
      if(row.capakey=="" || row.capakey==null ){
       let oCapaKey=await this.mapService.LoadCapakeyByGeometry(row.geometry);
  
       if(oCapaKey!=null && oCapaKey.CaPaKey!=""){
        let oRequest: Requests=<Requests>{};
        oRequest.capakey=oCapaKey.CaPaKey;
        oRequest.file_objectId=Number(row.id);
        oRequest.user_id=String(this.accountService.userValue.id);
        //oRequest.reference=row.region +" "+row.municipality+" "+row.department+" "+row.section;
        oRequest.reference=row.region +" "+oCapaKey.CaPaKey;
        oRequest.filenumber=this._reference;
          this.requestService.AddRequest(oRequest).subscribe(dataResponse=>{
            //this.toastService.success(this.translateService.instant('Request added successfully'),this.translateService.instant("Save"));
            this.loadFileObjects();
          })
       }
      }else{
        let oRequest: Requests=<Requests>{};
        oRequest.capakey=row.capakey;
        oRequest.file_objectId=Number(row.id);
        oRequest.user_id=String(this.accountService.userValue.id);
        //oRequest.reference=row.region +" "+row.municipality+" "+row.department+" "+row.section;
        oRequest.reference=row.region +" "+row.capakey;
        oRequest.filenumber=this._reference;
          this.requestService.AddRequest(oRequest).subscribe(dataResponse=>{
            //this.toastService.success(this.translateService.instant('Request added successfully'),this.translateService.instant("Save"));         
            this.loadFileObjects();
          })
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
  
  
    columnsSelected() {
      this.columns.map((col) => {
        col.show = (this.selectedOptions.indexOf(col.name) >= 0 || col.disabled) ;
        return col;
      });
    }
  
    public checkAccess(sComponentName: string,sModuleName="",sColumnName){
     let bAccess= this.accountService.checkSecurity(sComponentName,sModuleName)
     let columnDisplay= this.columns.find(col=>col.name==sColumnName)
     columnDisplay.show=bAccess;
     return true;
  
  }
  
  getDisplayedColumns():string[] {
    return this.columns.filter(cd=>!cd.show).map(cd=>cd.name);
  }
  onPreviewClick(geometry){
    localStorage.setItem('geometry_preview',JSON.stringify(geometry));
    this.router.navigate(['/general/prospection/'], { relativeTo: this.route.parent });
  }
  
  addNewCapakey(){
    this._loadingnewObject.next(true);
    this.form.reset();
    this.modalService.open(this.addObjectManual, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });  
    setTimeout(() => {
      this._loadingnewObject.next(false);
    }, 200);
  }
  
  changeCapakey(event){
    this.form.get('capakey').setValue(event);
    this._capaKey=event;
    //this.displayMap(this._capaKey);
    this.loadAddressByCapakey(this._capaKey);
  }
  
  private mat_filter(value: string) {
    if(value!=null){
      const filterValue = value?.toLowerCase();
      if (this.ItemsCapakey == undefined) {
        this.ItemsCapakey = []
      }
      if (filterValue.length > 4) {
        this.comboService.searchCapakey(filterValue, this.ItemsCapakey).subscribe((dataCapakeys: Array<Combo>) => {
          this.ItemsCapakey = dataCapakeys;
          this.autoFilter = new BehaviorSubject<Array<Combo>>(this.ItemsCapakey).asObservable();
          this.ItemsCapakey=Object.assign([],this.ItemsCapakey);
         this.changeDetect.detectChanges();
        })
      }
    }
  }
  
  private async loadAddressByCapakey(sCapa){
    let adress:string=await this.mapService.LoadAddressByCapakey(sCapa);
    if(adress==undefined|| adress==null){
     this.f['capakeyAdress'].setValue("");
    }else{
     this.f['capakeyAdress'].setValue(adress);
    }     
   }
  
   async addThisCapakey(){
    
    this.comboService.LoadDataFromCapakeyCadGis(this.f['capakey'].value,"102100").subscribe(async (data:any) =>{
      if(data.features.length > 0){
       
        let region=await this.mapService.LoadRegionByPoygon(data.features[0].geometry,"102100");
        let PropertyName="";
        let regionId="";
        let regionName="";
        switch(region.NameDUT){
          case "Vlaams Gewest":{     
            PropertyName="svnaam";
            regionId="1";
            regionName="Vlaanderen"
            break;
          }
          case "Waals Gewest":{
            PropertyName="DESCRIPTION";
            regionId="2";
            regionName="Wallonie";                
            break;
          }
          case "Brussels Hoofdstedelijk Gewest" :{
            PropertyName="CAT_DU";         
            regionId="3";
            regionName="Brussel";
            break;
          }
        }
        
  
  
        let FeatureGewest=await this.prospectionGewestplanService.getGewestPlanByPolygon(regionId,data.features[0].geometry);      
        let oNewObject: File_Objects= <File_Objects>{};
        oNewObject.file_managment_id=this._file_managmentId;
        oNewObject.address=this.f['capakeyAdress'].value;
        oNewObject.capakey=this.f['capakey'].value;
        oNewObject.area=data.features[0].attributes.SuVaCn;
        oNewObject.type_area=data.features[0].attributes.SuVaCnType;
        oNewObject.type_area=data.features[0].attributes.SuVaCnType;
        oNewObject.geometry=data.features[0].geometry;
        oNewObject.type_parcel=TypeParcel.NotDefined;
        oNewObject.type_prospection=ProspectionType.Parcel;
        oNewObject.object_id=data.features[0].attributes.OBJECTID;
        oNewObject.region=regionName;
        oNewObject.gewest_plan =[];     
    
        if(FeatureGewest.features!=undefined){         
            FeatureGewest.features.forEach(element => {  
            oNewObject.gewest_plan.push(element?.attributes[PropertyName]);                                  
          });
        }
        this.filemanagmentService.createFileObjects(this._file_managmentId,oNewObject).subscribe(data =>{
          //this.toastService.success(this.translateService.instant('Save successful'),this.translateService.instant("Save"));
          this.loadFileObjects();
          this.modalService.dismissAll();
        });
      }
  
  
    });
   }

   // [MD] New design additions

       showModal(id?): void {
             this.modalZService.create({
               nzTitle: "Objects",
               nzContent: FileObjectsModalComponent,
               nzWidth: '1032px',
               nzData: {
                 value: this._file_managmentId,
                 reference: this._reference,
               },
               nzFooter: []
             });
       }
   
       addDocument(id?): void {
         this.modalZService.create({
           nzTitle: "Add a model document",
           //nzContent: FileAddModeldocumentComponent,
           nzContent: '',
           nzWidth: '438px',
           nzMaskClosable: false,
           nzData: {
             value: id,
           },
           nzFooter: []
         });
   }
}
