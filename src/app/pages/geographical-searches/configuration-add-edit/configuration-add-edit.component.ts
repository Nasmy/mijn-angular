import { CommonModule } from '@angular/common';
import { Component,  Input, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AlertService, AuthService, ConfigurationService, LayerService } from '@shared/services';
import { Combo, Configuration, Layers } from '@shared/models';
import { Subject } from 'rxjs';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxColorsModule } from 'ngx-colors';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-configuration-add-edit',
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
    NzTabsModule,
    NzModalModule,
    NzImageModule,    
    NzDividerModule,
    NzSwitchModule,
    FormsModule,  
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxColorsModule,
    NgxDropzoneModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule 
    
  ],
  templateUrl: './configuration-add-edit.component.html',
  styleUrls: ['./configuration-add-edit.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class ConfigurationAddEditComponent  implements OnInit{
  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild('paginatorLinked', { read: MatPaginator }) paginatorLinked: MatPaginator;

  @Input() valueChange: Subject<string>;
  @Input() valueChangeForceClose: Subject<boolean>;
  @Input() value:string = "undefined"
  @Input() id:string = undefined;
  public form: FormGroup | undefined;
  public formSearch: FormGroup | undefined;
  public submitted;
  public submittedSuccesfull;
  public loading;
  public arrCombos: { [key: string]: Array<Combo> } = {};
  public arrMaps: Array<Layers>;
  public arrMapsLinked: Array<Layers>;
  public dataSource = new MatTableDataSource<Layers>([]);
  public dataSourceLinked = new MatTableDataSource<Layers>([]);
  public primaryColor:string;
  public files: File[] = [];
  public files1: File[] = [];
  //public displayedColumns: string[] = ['link','name'];
  public displayedColumns: string[] = ['name'];

  constructor(
    private formBuilder: FormBuilder,
    private layerService : LayerService, 
    private changeDetect: ChangeDetectorRef,  
    private configurationService: ConfigurationService,
    private accountService:AuthService,
    private alertService:AlertService,
  ){

  }
  ngOnInit(): void {
    this.submittedSuccesfull=false;
    this.arrMaps=[];
    this.arrMaps=[];
    this.value="true";
    this.valueChange.next("true");
    this.form = this.formBuilder.group({
      id:[''],
      name:['',Validators.required],
      region_id:[0,[Validators.required,Validators.min(1)]],
      user_id:['',[Validators.required,Validators.min(1)]],
      active:[''],
      secondary_color:['',Validators.required],
      primary_color:['',Validators.required],
      pickerCtrl_primary:['',Validators.required],
      pickerCtrl_secundary:['',Validators.required],
      watermerk:[''],
      logo:[''],
      maps:[''],
    })
    this.formSearch=this.formBuilder.group({
      searchTermLinked:[''],
      searchTermNotLinked:['']
    });

    this.form.get("region_id").updateValueAndValidity();
    this.form.get("name").updateValueAndValidity();

    this.form.controls["primary_color"].valueChanges.subscribe((color) => {
      //if (this.form.controls["pickerCtrl_primary"].valid) {
        this.form.controls["pickerCtrl_primary"].setValue(color, {
          emitEvent: false,
        });
      //}
    });
    this.form.controls["pickerCtrl_primary"].valueChanges.subscribe((color) =>
      this.form.controls["primary_color"].setValue(color, {
        emitEvent: false,
      })
    );

    this.form.controls["secondary_color"].valueChanges.subscribe((color) => {
      //if (this.form.controls["pickerCtrl_secundary"].valid) {
        this.form.controls["pickerCtrl_secundary"].setValue(color, {
          emitEvent: false,
        });
      //}
    });
    this.form.controls["pickerCtrl_secundary"].valueChanges.subscribe((color) =>
      this.form.controls["secondary_color"].setValue(color, {
        emitEvent: false,
      })
    );

    this.form.controls["region_id"].valueChanges.subscribe((region) =>{
      this.reloadRegion(region);
  
  
    });

    this.layerService.lstLayers$$.subscribe((dataLayrs:Array<Layers>)=>{
      this.arrMapsLinked=[];
      if (this.form.get('region_id').value>0){
        Object.assign(this.arrMaps,dataLayrs);
        this.dataSource=new MatTableDataSource<Layers>(dataLayrs);
        this.dataSource.paginator = this.paginator;
        //if (this.f.maps.value!=""){
          this.checkLinkedArray();
        //}
      }

      this.changeDetect.detectChanges();
    });
    this.loadArrRegion();

    if(this.id!=undefined) this.loadConfiguration();
    

  }

  get f() {
    return this.form.controls;
  }


  loadArrRegion(){
    this.arrCombos["REGION"]=[];
    let oCombo: Combo=new Combo();
    oCombo.id=1;
    oCombo.name="Vlaanderen";
    this.arrCombos["REGION"].push(oCombo);
    oCombo=new Combo();
    oCombo.id=3;
    oCombo.name="Brussel";
    this.arrCombos["REGION"].push(oCombo);
    oCombo=new Combo();
    oCombo.id=2;
    oCombo.name="Wallonie";
    this.arrCombos["REGION"].push(oCombo);
  }

  onRegioChange(event){
    this.arrMapsLinked=[];
    this.arrMaps=[];
    this.reloadRegion(event.value);

  }

  private reloadRegion(regionId:string){
    switch (Number(regionId)){
      case 1:
        {
          this.layerService.getByRegion("Vlaanderen");
          break;
        }
        case 2:
        {
          this.layerService.getByRegion("Wallonie");
          this.checkLinkedArray();
          break;
        }
        case 3:
        {
          this.layerService.getByRegion("Brussel");
          this.checkLinkedArray();
          break;
        }
    }
  }

  checkLinkedArray(){
    this.arrMapsLinked=[];
    this.arrMapsLinked=Object.assign([],this.arrMapsLinked);
    this.dataSourceLinked=new MatTableDataSource<Layers>(this.arrMapsLinked);
    this.dataSourceLinked.paginator = this.paginatorLinked;
    if (this.f['maps'].value!=""){
        this.f['maps'].value.forEach(elemLinked=>{
          const oMap=this.arrMaps.find(elem=>{
            return elem.id==elemLinked.toString();
          })
          if (oMap!=null || oMap!=undefined){
            this.linkLayer(oMap);
          }
        })
    }

    this.dataSource=new MatTableDataSource<Layers>(this.arrMaps);
    this.dataSource.paginator = this.paginator;

    this.dataSourceLinked=new MatTableDataSource<Layers>(this.arrMapsLinked);
    this.dataSourceLinked.paginator = this.paginatorLinked;
  }

  public linkLayers() {
    for(let i=this.arrMaps.length-1;i>=0;i--)
    {
      if(this.arrMaps[i].link==true)
      {
         this.linkLayer(this.arrMaps[i]);
         this.arrMaps.splice(i,1);   
       }
    }
    this.dataSource=new MatTableDataSource<Layers>(this.arrMaps);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.formSearch.get("searchTermNotLinked").value;     
    
    this.dataSourceLinked=new MatTableDataSource<Layers>(this.arrMapsLinked);
    this.dataSourceLinked.paginator = this.paginatorLinked;
    this.dataSourceLinked.filter = this.formSearch.get("searchTermNotLinked").value;        
    this.changeDetect.detectChanges();


  }

  public linkLayer(mapElem: Layers){
    mapElem.link=false;
    this.arrMapsLinked.push(mapElem);
              
  
  }

  public unllinLayers() {
   for(let i=this.arrMapsLinked.length-1;i>=0;i--)
   {
    if(this.arrMapsLinked[i].link==true)
      {
        this.unllinkLayer(this.arrMapsLinked[i]);
        this.arrMapsLinked.splice(i,1);
      }  
   }

    this.dataSourceLinked=new MatTableDataSource<Layers>(this.arrMapsLinked);
    this.dataSourceLinked.paginator = this.paginatorLinked;
    this.dataSourceLinked.filter = this.formSearch.get("searchTermLinked").value;

    this.dataSource=new MatTableDataSource<Layers>(this.arrMaps);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.formSearch.get("searchTermNotLinked").value;     
    this.changeDetect.detectChanges();

  }

  public unllinkLayer(mapElem: Layers){
    mapElem.link=false;
    this.arrMaps.push(mapElem);
  }


  onSelectLogo(event) {
    const reader = new FileReader();
      reader.readAsDataURL(event.addedFiles[0]);
  
      reader.onload = (eventFile) => { 
        this.form.get('logo').setValue('' + eventFile.target.result);
      };
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.replaceFileLogo();
    }
  }  

  replaceFileLogo() {
    this.files.splice(0,1);
  }
  onRemoveLogo(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelectWaterMark(event) {
    const reader = new FileReader();
      reader.readAsDataURL(event.addedFiles[0]);
  
      reader.onload = (eventFile) => { 
        this.form.get('watermerk').setValue('' + eventFile.target.result);
      };
    this.files1.push(...event.addedFiles);
    if(this.files1.length > 1){
      this.replaceFileWatermark();
    }
  }

  replaceFileWatermark() {
    this.files1.splice(0,1);
  }
  
  onRemoveWatermark(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  
applyFilter(filterValue: any) { 
  filterValue = filterValue.currentTarget?.value.trim();
  filterValue = filterValue.toLowerCase();
  this.formSearch.get("searchTermNotLinked").setValue(filterValue);
  this.dataSource.filter = filterValue;
}

applyFilterLinked(filterValue: any) {
  filterValue = filterValue.currentTarget?.value.trim();
  filterValue = filterValue.toLowerCase();
  this.formSearch.get("searchTermLinked:").setValue(filterValue);
  this.dataSourceLinked.filter = filterValue;
}

selectAll(event){
  for(let i=this.arrMaps.length-1;i>=0;i--)
    {
      this.arrMaps[i].link= event.checked;
    }
    this.dataSource=new MatTableDataSource<Layers>(this.arrMaps);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.formSearch.get("searchTermNotLinked").value;     
    this.changeDetect.detectChanges();

}
isAllSelectedAvailable():boolean{

  if(this.arrMaps!=undefined &&  this.arrMaps.length>0)
    {
      return this.arrMaps?.filter(x=>{return x.link==true}).length==this.arrMaps.length;
    }else{
      return false;
    } 
}

isAnySelectedAvailable():boolean{
  if(this.arrMaps!=undefined &&  this.arrMaps.length>0)
    {
      let selectedLength=this.arrMaps?.filter(x=>{return x.link==true}).length;
      if(selectedLength==0){
        return false;
      }else{
        return selectedLength>0 && selectedLength<this.arrMaps.length;
      }
      
    }else{
      return false;
    } 
}

amountSelectedAvailable(){
  if(this.arrMaps!=undefined &&  this.arrMaps.length>0)
    {
      return this.arrMaps?.filter(x=>{return x.link==true}).length
    }else{
      return 0;
    } 
}


//Selected
selectAllSelected(event){
  for(let i=this.arrMapsLinked.length-1;i>=0;i--)
    {
      this.arrMapsLinked[i].link= event.checked;
    }
    this.dataSourceLinked=new MatTableDataSource<Layers>(this.arrMapsLinked);
    this.dataSourceLinked.paginator = this.paginatorLinked;
    this.dataSourceLinked.filter = this.formSearch.get("searchTermLinked").value;     
    this.changeDetect.detectChanges();

}
isAllSelectedSelected():boolean{

  if(this.arrMapsLinked!=undefined &&  this.arrMapsLinked.length>0)
    {
      return this.arrMapsLinked?.filter(x=>{return x.link==true}).length==this.arrMapsLinked.length;
    }else{
      return false;
    } 
}

isAnySelectedSelected():boolean{
  if(this.arrMapsLinked!=undefined &&  this.arrMapsLinked.length>0)
    {
      let selectedLength=this.arrMapsLinked?.filter(x=>{return x.link==true}).length;
      if(selectedLength==0){
        return false;
      }else{
        return selectedLength>0 && selectedLength<this.arrMapsLinked.length;
      }
      
    }else{
      return false;
    } 
}

amountSelectedSelected(){
  if(this.arrMapsLinked!=undefined &&  this.arrMapsLinked.length>0)
    {
      return this.arrMapsLinked?.filter(x=>{return x.link==true}).length
    }else{
      return 0;
    } 
}

close(){
   // (document.querySelector('.ant-drawer-close') as HTMLElement).click();
    this.valueChangeForceClose.next(true);
}
onSubmit(){
  this.submitted = true;
  this.form.get('user_id').setValue(this.accountService.userValue.id);
 // this.form.markAsTouched();
  this.form.markAllAsTouched();
  (this.form as any).submitted = true;

  // reset alerts on submit
  this.alertService.clear();
  // stop here if form is invalid
  if (this.form.invalid) {
    this.changeDetect.detectChanges();
    return;
  }
  const oConfiguration: Configuration=this.form.value
  oConfiguration.maps=[]
  this.arrMapsLinked.forEach(map => {
    oConfiguration.maps.push(Number(map.id));
  });
  //oConfiguration.active=true;
  oConfiguration.user_id= Number(this.accountService.userValue.id);
  //const primary_col: Color=oConfiguration.primary_color
  //const secondary_col: Color=oConfiguration.secondary_color

  //oConfiguration.primary_color=primary_col.toHexString();
  //oConfiguration.secondary_color=secondary_col.toHexString();
  // oConfiguration.primary_color=Configuration.rgbToHex(primary_col.r,primary_col.g,primary_col.b);
  // oConfiguration.secondary_color=Configuration.rgbToHex(secondary_col.r,secondary_col.g,secondary_col.b);
  if (this.id!=undefined && this.id!="" ){
    this.configurationService.saveConfiguration(oConfiguration).subscribe((data:Configuration)=>{
      this.alertService.clear();
      this.id=data.id;      
      this.submittedSuccesfull=true;
      this.changeDetect.detectChanges();

    });
  }else{
    delete oConfiguration.id;
    this.configurationService.addConfiguration(oConfiguration).subscribe((data:Configuration)=>{
      this.alertService.clear();
      this.id=data.id;
      this.form.get("id").setValue(this.id);
      this.changeDetect.detectChanges();
      this.submittedSuccesfull=true;
      this.changeDetect.detectChanges();
      
    });
  }
}

private base64toBlob(base64Data, contentType): Blob {
  contentType = contentType || '';
  const sliceSize = 1024;
  const base64Datas = base64Data.split("base64,")[1] || "";
  const byteCharacters = Buffer.from(base64Datas, 'base64').toString('binary');
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

private loadConfiguration(){
if(this.id==undefined) return ;
  this.configurationService.getByID(this.id).then((data: Configuration)=>{
    this.form.patchValue(new Configuration(data));
    this.changeDetect.detectChanges();
    this.form.updateValueAndValidity();

    if(data.logo!=null && data.logo!=undefined && data.logo!=""){
      const base64Logo = data.logo;
      const fileLogo = new File([this.base64toBlob(base64Logo,'image/png')], "logo");
      this.files.push(fileLogo);
    }

    if(data.watermerk!=null && data.watermerk!=undefined && data.watermerk!=""){
      const base64Watermerk = data.watermerk;
      const fileWatermark = new File([this.base64toBlob(base64Watermerk,'image/png')], "watermark");   
      this.files1.push(fileWatermark);
    }



    //this.checkLinkedArray();

    switch (Number(data.region_id)){
      case 1:
        {
          this.layerService.getByRegion("Vlaanderen");
          break;
        }
        case 2:
        {
          this.layerService.getByRegion("Wallonie");
          break;
        }
        case 3:
        {
          this.layerService.getByRegion("Brussel");
          break;
        }
    }
  })

}
  
}

