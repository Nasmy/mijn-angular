import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

import { Combo, Point, ResponseApi } from '@models/index';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigurationService } from '@services/configuration.service';
import { AuthService } from '@services/auth.service';
import { ComboService } from '@services/combo.service';
import { AlertService } from '@services/alert.service';
import { MapService } from '@services/map.service';
import { CapakeyBasicComponent } from "../capakey-basic/capakey-basic.component";

@Component({
  selector: 'app-capa-adress',
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
    ReactiveFormsModule ,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    CapakeyBasicComponent
  ],
  templateUrl: './capa-adress.component.html',
  styleUrl: './capa-adress.component.scss'
})
export class CapaAdressComponent implements  OnInit {
  @Output() onSubmitButton= new EventEmitter<any>();
  @Output() oCapaBasic= new EventEmitter<any>();

  public form: FormGroup | undefined;
  public autoFilter: Observable<Combo[]> | undefined;
  public ItemsAddress: Combo[] | undefined;
  public submitted = false;
  public loading=false
  public capaKey=""
  private _bKlim=false;
  private _addressReq='';
  public _tableRowData;

  @Input()
  set bKlim(value: boolean) {
    this._bKlim = value;
  }
  get bKlim(): boolean {
    return this._bKlim;
  }
  
  @Input()
  set addressReq(value: string) {
    this._addressReq = value;
  }
  get addressReq(): string {
    return this._addressReq;
  }

  @Input()
  set tableRowData(value: any) {
    this._tableRowData = value;
  }

  get tableRowData(): any {
    return this._tableRowData;
  }


  constructor(
    private accountService: AuthService,
    private formBuilder: FormBuilder,
    private comboService:ComboService,
    private alertService:AlertService,
    private mapService:MapService,
    private changeDetect:ChangeDetectorRef,
  ) { 
    this.form = this.formBuilder.group({
      id: [''],
      address: ['', Validators.required],

    });
  }

  ngOnInit(): void {


    /*When coming with @input from a file/objects table's drawer caller*/

    this.form.get('address').valueChanges.subscribe(value => this.mat_filter(value))
  }
  ngOnChanges(changes: SimpleChanges) {
      // this.onChanges.next(changes);
       if (changes['addressReq']!=undefined &&  changes['addressReq'].currentValue != changes['addressReq'].previousValue) {
        this.mat_filter(this._addressReq,true);
       
       }         
  }

  get f() {
    return this.form.controls;
  }

  changeAddress(event){
    this.selectAdress(event)
    this.form.get('address').setValue(event.name);
  }

  private mat_filter(value: string,bautoselect:boolean=false) {
    const filterValue = value.toLowerCase();
    if (this.ItemsAddress == undefined) {
      this.ItemsAddress = []
    }
    if (filterValue.length > 4) {
      this.comboService.searchAddress(filterValue).subscribe((dataCity: Array<Combo>) => {
        this.ItemsAddress = dataCity
        this.autoFilter = new BehaviorSubject<Array<Combo>>(this.ItemsAddress).asObservable()
        this.ItemsAddress=Object.assign([],this.ItemsAddress)
        if(bautoselect){
          this.changeAddress(this.ItemsAddress[0]);
        }
        this.changeDetect.detectChanges()
      })
    }
  }

  
  private selectAdress(event){   
    const sMagicKey: string=event.id
    const sAdress: string=event.name
    const sURL: string="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?Single%20Line%20Input="+encodeURI(sAdress)+"&countryCode=BEL&magicKey="+encodeURI(sMagicKey)+"&maxLocations=6&outSR=%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4326%7D&f=json"
    this.mapService.SendGetProxy(sURL).subscribe((dataResponse:any)=>{
      if (dataResponse!=undefined){
        const myAddress=dataResponse.candidates[0]
        let oPoint: Point=new Point()
        oPoint=myAddress.location
        const sURLPoint: string= "https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/query?f=json&geometry=%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4326%7D%2C%22x%22:"+oPoint.x+",%22y%22:"+oPoint.y+"%7D&maxAllowableOffset=0.5971642834777837&orderByFields=OBJECTID%20ASC&outFields=*&outSR=4326&resultType=tile&returnExceededLimitFeatures=false&spatialRel=esriSpatialRelIntersects&where=1%3D1&geometryType=esriGeometryPoint&inSR=4326";

        this.mapService.SendGetProxy(sURLPoint).subscribe((dataResponse:any)=>{
          if (Array.isArray(dataResponse.features)){
            this.capaKey=dataResponse.features[0].attributes.CaPaKey;
            this.changeDetect.detectChanges();
          }
        })
      }
    })
  }

  public selectionChange(evRequest){
    this.oCapaBasic.emit(evRequest);
  }

  public submitForm(evSubmit){
    this.onSubmitButton.emit(evSubmit);
    if(evSubmit==false){
      this.form.reset();
    }
    
  }


}
