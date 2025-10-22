import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthService, ConfigurationService, ConfirmationDialogService } from '@shared/services';
import { Configuration } from '@shared/models';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ConfigurationAddEditComponent } from '../configuration-add-edit/configuration-add-edit.component';

@Component({
  selector: 'app-configuration-main',
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
    NzSwitchModule
  ],
  templateUrl: './configuration-main.component.html',
  styleUrls: ['./configuration-main.component.scss']
})
export class ConfigurationMainComponent implements OnInit {
  @Input() valueChange: Subject<string>;
  @Input() value:string = "undefined"

  private lstConfiguration$: BehaviorSubject<Array<Configuration>> = new BehaviorSubject<Array<Configuration>>(null);
  public  lstConfiguration$$: Observable<Array<Configuration>> = this.lstConfiguration$.asObservable();

  valueCanClose:string = "undefined";

  constructor(
    private configurationService:ConfigurationService,
    private accountService:AuthService,
    private drawerService: NzDrawerService,
    private confirmationService: ConfirmationDialogService,
    private translate: TranslateService,
  ){

  }
  ngOnInit(): void {
    this.loadAllConfiguration();
    this.value="true";
    this.valueChange.next("true");
  }

  loadAllConfiguration(){
    this.configurationService.getAllByUserID(this.accountService.userValue.id).pipe(first()).subscribe(dataConfig=>{
      if(dataConfig.length>0){
        this.lstConfiguration$.next(dataConfig);
      }
      
    })
  }


  openConfigurationAddDrawer(id:string=undefined){
    this.valueCanClose="undefined";
    const valueChange = new Subject<string>();     
    const valueChangeForceClose = new Subject<boolean>();     
    const valueChangeSubscription = valueChange
    .asObservable()
    .subscribe(value => {
      this.valueCanClose = value;
    });

    const drawerRef = this.drawerService.create<ConfigurationAddEditComponent>({
      nzTitle: '',
      nzFooter: "",
      nzExtra: '',      
      nzMaskClosable:true,
      nzClosable:true,
      nzKeyboard:true,  
      nzWidth:"780px",    
      nzOnCancel:() => this.canClose().then(data=>{ return data}),
      nzContent: ConfigurationAddEditComponent,
      nzContentParams: {
        valueChange,
        value: this.valueCanClose,
        id:id,
        valueChangeForceClose:valueChangeForceClose,
      },   
    });

    const valueChangeCloseSubscription = valueChangeForceClose
    .asObservable()
    .subscribe(value => {
      drawerRef.close();
      this.loadAllConfiguration();
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

  onDelete(id: string){
    this.confirmationService.confirm(this.translate.instant('Are you sure you want to delete this?'),this.translate.instant('This action can not be undone. Deleting this configuration will be remove permanently.'),'Delete',"Cancel","lg").then((result) => {
      if(result==false){
        this.valueChange.next("true");        
      }else if(result==true){      
        this.configurationService.delConfiguration(id).subscribe(data=>{
              this.valueChange.next("true");
              this.loadAllConfiguration();
         })             
      }  
      }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  changeStatus(oConfiguration){
    this.configurationService.saveConfiguration(oConfiguration).subscribe((data:Configuration)=>{
      this.loadAllConfiguration();
    });
  }



}
