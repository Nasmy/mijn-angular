import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { GeographicalSearchesTableComponent } from '../geographical-searches-table/geographical-searches-table.component';
import { AddRequestMainComponent } from '../add-request-main/add-request-main.component';
import { AddRequestKlimComponent} from '../add-request-klim/add-request-klim.component';
import { MapViewerComponent } from '../map-viewer/map-viewer.component';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzSegmentedModule, NzSegmentedOptions } from 'ng-zorro-antd/segmented';
import { ConfigurationMainComponent } from '../configuration-main/configuration-main.component'; 
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerPlacement, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
ModuleRegistry.registerModules([AllCommunityModule]);

import { CalendarCustomDefinition, CopyIconDefinition, DownloadIconDefinition, MapCustomDefinition } from '../../../../assets/img/icons/custom-icons';
import { RequestsService } from '@services/requests.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { AuthService, KlimConfigService, PageTittleService } from '@shared/services';
import { klimConfigs } from '@shared/models';
const CUSTOM_ICONS = [CopyIconDefinition, DownloadIconDefinition, CalendarCustomDefinition, MapCustomDefinition];

@Component({
  selector: 'app-geographical-searches-main',
  standalone: true,
  imports: [
    GeographicalSearchesTableComponent,
    AddRequestMainComponent,
    AddRequestKlimComponent,
    MapViewerComponent, 
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    TranslateModule,
    NzSegmentedModule,
    FormsModule,
    NzDrawerModule    
  ],  // Add any necessary imports here.
  templateUrl: './geographical-searches-main.component.html',
  styleUrls: ['./geographical-searches-main.component.scss']
})
export class GeographicalSearchesMainComponent implements OnInit {
  public selectedOption:number=0;
  valueCanClose:string = "undefined";
  valueCanCloseKlim:string = "undefined";
  valueCanCloseConfiguration:string = "undefined";
  leftDriverDisplay: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private MyConfig:klimConfigs=<klimConfigs>{};
  
  options: NzSegmentedOptions = [
    { value: 0, icon: 'calendar_custom' },
    { value: 1, icon: 'map_custom' }
  ];

  constructor(
    private drawerService: NzDrawerService,
    private iconService: NzIconService,
    private requestsService: RequestsService,
    public translate: TranslateService,
    private klimConfigService: KlimConfigService,
    private accountService: AuthService,
    public pageTitleService:PageTittleService,
    private changeDetect:ChangeDetectorRef,
  
  ) {
    this.iconService.addIcon(...CUSTOM_ICONS);
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('nl');
    this.pageTitleService.settitle(translate.instant("Geographical Searches"));

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang?.match(/en|nl/) ? browserLang : 'nl');
  }
  ngOnInit(): void {

    this.klimConfigService.getByClientTypeId(this.accountService?.userValue?.client?.type_id);  
    
    this.klimConfigService.MyConfigs$$.pipe(first())
    .subscribe({
      next: (dataconfig=>{
      if(dataconfig!=null&& dataconfig!=undefined){
        if(dataconfig.defaultSearchTab!=''){
          this.MyConfig=dataconfig;
          switch(this.MyConfig?.defaultSearchTab){
            case "BASIC":    
            case "ADVANCED":
            case "ADDRESS":
              {
                this.openComponent();
                break;
              }
            case "SPECIAL":{
              this.selectedOption=1;
              break;
            }
            case "KLIM":{
             this.openComponentKlim();
              break;
            }
            default:            
            
          }
        }
      }      
    })
  })
  }
  valueChanged(event){
    this.leftDriverDisplay.next(false);
    console.log(event)
  }
  tryClose(prom){

  }


  openConfigurationDrawer(){
    this.valueCanCloseConfiguration="undefined";
    const valueChange = new Subject<string>();        
    const valueChangeSubscription = valueChange
    .asObservable()
    .subscribe(value => {
      this.valueCanCloseConfiguration = value;
    });

    const drawerRef = this.drawerService.create<ConfigurationMainComponent>({
      nzTitle: '',
      nzFooter: "",
      nzExtra: '',
      nzMaskClosable:true,
      nzClosable:true,
      nzKeyboard:true,    
      nzWidth:"578px",    
      nzOnCancel:() => this.canCloseConfig().then(data=>{ return data}),
      nzContent: ConfigurationMainComponent,
      nzContentParams: {
        valueChange,
        value: this.valueCanCloseConfiguration
      },   
    });
  
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.valueCanCloseConfiguration = data;
      }
    });  
  }



  async  openComponent() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanClose);
      }, 3000);
    });

    this.valueCanClose='true';
    const valueChangeForceClose = new Subject<boolean>();  
    const valueChange = new Subject<string>();        
    const valueChangeSubscription = valueChange
    .asObservable()
    .subscribe(value => {
      this.valueCanClose = value;
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
      nzContentParams: {
        valueChange,
        value: this.valueCanClose,
        valueChangeForceClose: valueChangeForceClose
      },   
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
        this.valueCanClose = data;
      }
    });      
  }

  async canClose() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanClose=="true"?true:false);
      }, 100);
    });
  }

  async canCloseConfig() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanCloseConfiguration=="true"?true:false);
      }, 100);
    });
  }

  async canCloseKlim() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanCloseKlim=="true"?true:false);
      }, 100);
    });
  }

  MapOptions(){
    this.leftDriverDisplay.next(true);
  }

  async  openComponentKlim() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.valueCanClose);
      }, 3000);
    });

    this.valueCanCloseKlim='true';
    const valueChangeForceClose = new Subject<boolean>();  
    const valueChange = new Subject<string>();        
    const valueChangeSubscription = valueChange
    .asObservable()
    .subscribe(value => {
      this.valueCanCloseKlim = value;
    });

    const drawerRef = this.drawerService.create<AddRequestKlimComponent>({
      nzTitle: '',
      nzFooter: "",
      nzExtra: '',
      nzMaskClosable:true,
      nzClosable:true,
      nzKeyboard:true,   
      nzWidth:"515px", 
      nzOnCancel:() => this.canCloseKlim().then(data=>{ return data}),
      nzContent: AddRequestKlimComponent,
      nzContentParams: {
        valueChange,
        value: this.valueCanCloseKlim,
        valueChangeForceClose: valueChangeForceClose
      },   
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
        this.valueCanCloseKlim = data;
      }
    });      
  }
}
