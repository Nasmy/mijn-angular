import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Alert, Combo, File_Managment, ResponseApi } from '@shared/models';
import { ParametersService } from '@shared/services';
import { AgGridModule } from 'ag-grid-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-file-summary',
  standalone: true,
  imports: [
    NzCardModule,
    TranslateModule,
    AgGridModule,
    NzGridModule,
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    NzAlertModule,
    NzModalModule,
    NzSpinModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerModule
  ],
  templateUrl: './file-summary.component.html',
  styleUrls: ['./file-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSummaryComponent implements OnInit {

  private _fileManagment:File_Managment=<File_Managment>{};
  public arrCombos: { [key: string]: Array<Combo> } = {};
  public allertMessage:Alert;
  public isVisibleEdit:boolean|false;
  public SubmitedSuccessfull:boolean=false;
  public onloading:boolean=false;
  submitted

  @Output() oFileManagment= new EventEmitter<any>();
  @Input()
  set fileManagment(value: File_Managment) {
    this._fileManagment = value;
  }

  get fileManagment(): File_Managment {
    return this._fileManagment;
  }  
  @Output() onSubmitButton= new EventEmitter<any>();


  form: FormGroup;

 constructor(
  private paramService:ParametersService,
  private formBuilder: FormBuilder,
 ){
  this.loadComboStatus();
 }
  ngOnInit(): void {
    this.arrCombos["STATUS"]=[];
    this.allertMessage=<Alert>{};

    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      file_number: ['', Validators.required],
      description: ['', Validators.required],
      status_id: [{value: '', disabled: false}, Validators.required],
      client_id: ['', Validators.required],
      created_at: [''],
      updated_at: [''],    


    })

    let target = document.querySelector(".cdk-overlay-container") as HTMLElement;
     target?.style.setProperty('z-index', '1001');

    
    
  }

  ngOnChanges(changes: SimpleChanges) {  
     if (changes['fileManagment']!=undefined &&  changes['fileManagment'].currentValue != changes['fileManagment'].previousValue) {    
      this.form.patchValue(this._fileManagment);
     }

   }

  get f() {
    return this.form.controls;
  }


  Edit(){
    this.isVisibleEdit=true;
  }


  onFileManagmentChange(){
    this._fileManagment=this.form.value;
    this.oFileManagment.emit(this._fileManagment);
    this.isVisibleEdit=false;
  }

  private loadComboStatus(){
    //this.paramService.getParamsByGroupSysCode("FILESTATUS").
    this.paramService.getParamsByGroupSysCode("FILE_MANAGMENT_STATUS").
      subscribe((statusses:ResponseApi< Array<Combo>>)=>{
        this.arrCombos["STATUS"]=statusses.data;
      })    
  }


  getStatus(id:number){
    return this.arrCombos["STATUS"].find(status=>{return status.id==id});
  }
}
