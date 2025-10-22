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

import { Combo, Requests, ResponseApi } from '@models/index';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfigurationService } from '@services/configuration.service';
import { AuthService } from '@services/auth.service';
import { ComboService } from '@services/combo.service';
import { MapService } from '@services/map.service';

@Component({
  selector: 'app-capakey-basic',
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
        MatSelectModule
  ],
  templateUrl: './capakey-basic.component.html',
  styleUrl: './capakey-basic.component.scss'
})
export class CapakeyBasicComponent implements OnInit {
  
  submitted

  @Output() oCapaBasic= new EventEmitter<any>();
  @Output() onSubmitButton= new EventEmitter<any>();

  public form: FormGroup | undefined; 
  public autoFilter: Observable<Combo[]> | undefined;
  public arrCombos: { [key: string]: Array<Combo> } = {};
  public ItemsCapakey: Combo[] | undefined;

  private _capaKey="";
  private _bReset:boolean | false;
  private _bKlim: boolean | false;
  private _capakeyReq: string = '';
  private _reqNearest: any;
  private _reqObject: Requests= <Requests>{};
  private _tableRowData: any;

  onChanges = new Subject<SimpleChanges>();

  @Input()
  set capaKey(value: string) {
    this._capaKey = value;
  }

  get capaKey(): string {
    return this._capaKey;
  }

  @Input()
  set bKlim(value: boolean) {
    this._bKlim = value;
  }

  get bKlim(): boolean {
    return this._bKlim;
  }

  @Input()
  set tableRowData(value: any) {
    this._tableRowData = value;
  }

  get tableRowData(): any {
    return this._tableRowData;
  }

  constructor(
    private comboService:ComboService,
    private configurationService:ConfigurationService,
    private accountService:AuthService,
    private changeDetector:ChangeDetectorRef,
    private mapService:MapService,
    private formBuilder: FormBuilder){
      const CapakeyValidators = [ Validators.required,Validators.pattern("^[0-9]{5}[A-Z]{1}([0-9]{4})\/([0-9]{2})([A-Z\_]{1})([0-9]{3})$")];
      this.form = this.formBuilder.group({
        id: [''],
        capakey: ['',CapakeyValidators],
        capakeyAdress: [''],
        reference: ['', Validators.required],
        filenumber: [''],
        config_array: [''],
      });
    }

  ngOnInit(): void {
    this.arrCombos['CONFIGURATION']=[];
    if (this._capaKey!=""){
      this.form.get('capakey').setValue(this._capaKey)
    }

    /*When coming with @input from a file/objects table's drawer caller*/
    if (this._capakeyReq!=""){
      this.form.get('capakey').setValue(this._capakeyReq)
    }

    this.form.get('capakey').valueChanges.subscribe(value => this.mat_filter(value));
    this.loadActiveConfiguration();
    this.form.get('reference').valueChanges.subscribe(value =>
      { this._reqObject.reference=value; this.onSelectionChange() }
      );
    this.form.get('filenumber').valueChanges.subscribe(value =>{ this._reqObject.filenumber=value; this.onSelectionChange() });
    this.form.get('config_array').valueChanges.subscribe(value => { this._reqObject.config_array=value; this.onSelectionChange() });


  }

  ngOnChanges(changes: SimpleChanges) {
    // this.onChanges.next(changes);
     if (changes['capaKey']!=undefined &&  changes['capaKey'].currentValue != changes['capaKey'].previousValue) {
       this.changeCapakey(this._capaKey);
     }
 
     if (changes['reqNearest']!=undefined &&  changes['reqNearest'].currentValue != changes['reqNearest'].previousValue) {
        // console.log(this._reqNearest);
     }     
     if (changes['tableRowData']!=undefined &&  changes['tableRowData'].currentValue != changes['tableRowData'].previousValue) {
      this.form.get('filenumber').setValue(this._tableRowData["fileNumber"]);    
      this.form.get('reference').setValue(this._tableRowData["region"]+" "+this._tableRowData["name"]);
     }
     
   }

  get f(){
   return  this.form.controls;
  }

  

  
  private loadActiveConfiguration(){
    this.arrCombos["CONFIGURATION"]=[]
    this.configurationService.getAllActiveByUserID(this.accountService.userValue.id).subscribe((dataConfig: any)=>{

      if (dataConfig!=undefined && dataConfig.length>0){
        dataConfig?.forEach(conf => {
          const oCombo= new Combo();
           oCombo.id=conf.id;
           oCombo.name=conf.name + " ("+conf.regionName +")";
           this.arrCombos["CONFIGURATION"].push(oCombo);
        });
       }
    });

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
         this.changeDetector.detectChanges();
        })
      }
    }
  }

  submitForm(){

  }

 public changeCapakey(event){
    this.form.get("capakey").setValue(event);    
    this._capaKey=event;   
    if(this._capaKey!="" && this._capaKey!=undefined){
      this.loadAddressByCapakey(this._capaKey);
      this._reqObject.capakey=this._capaKey;
      this.onSelectionChange();
    }

  }

  private async loadAddressByCapakey(sCapa){
    let adress:string=await this.mapService.LoadAddressByCapakey(sCapa);
    if(adress==undefined|| adress==null){
     this.form.get("capakeyAdress").setValue("");
    }else{
      this.form.get("capakeyAdress").setValue(adress);
    }     
   }

  public onSelectionChange(){
    this.oCapaBasic.emit(this._reqObject);
   }

}
