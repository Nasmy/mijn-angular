import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentEditorComponent} from "@shared/components/document-editor/document-editor.component"
import { EncryptionService, FileManagmentService, TemplatesService } from '@shared/services';
import { CommonModule } from '@angular/common';
import { ResponseApi, SyncfusionEditorSerialized, TemplateBlocks, Templates } from '@shared/models';
import { EmptyDocument } from './defaultDocument';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-editor-modeldocument',
  standalone: true,
  imports: [CommonModule,DocumentEditorComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './file-editor-modeldocument.component.html',
  styleUrl: './file-editor-modeldocument.component.scss',
  schemas:[]
})
export class FileEditorModeldocumentComponent implements OnInit {
  //public id:string="";
  public modal_id:string="";
  public category_id:number;
  public filemanagmentid:number;
  protected templateId:string="";
  public readonly:boolean;
  public template:any="";
  public loadedTemplate:Templates=<Templates>{};
  templateLoaded:boolean=false;

  notlinked: Array<TemplateBlocks> = [];
  linked: Array<TemplateBlocks> = [];

  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private  modelDocumentsService: TemplatesService,
    private  filemanagmentService: FileManagmentService,
  ){
    console.log("Editor is open");
  }


  ngOnInit(): void {
    this.templateId = this.route.snapshot.params['id'];
    if(this.route.snapshot.routeConfig.path.includes("preview")){
      this.readonly=true;
    }else{
      this.readonly=false;
    }
    
    this.modal_id = this.route.snapshot.params['modal_id'];
    

    let filemanagmentEncoded= this.route.snapshot.params['filemanagment_id'];
    if(filemanagmentEncoded !=""){
      this.filemanagmentid=this.encryptionService.getIdDecrypted(decodeURIComponent(filemanagmentEncoded));       
    }

    let ficategoryEncoded= this.route.snapshot.params['category_id'];
    if(ficategoryEncoded !=""){
      this.category_id=this.encryptionService.getIdDecrypted(decodeURIComponent(ficategoryEncoded));       
    }

    if(this.modal_id!=undefined){
      this.loadDocument();
    }else if(this.templateId!=undefined){
      this.loadTemplate();
    }else{

      
      this.templateLoaded=true;
    }
  

  }

  loadTemplate(){
    this.templateLoaded=false;
      this.modelDocumentsService.getById(this.templateId).subscribe((dataResponse:ResponseApi<Templates>)=>{     
          this.loadedTemplate=dataResponse.data;
          this.category_id=this.loadedTemplate.categoryId;
          dataResponse.data.templateBlocks.forEach(tempBlock => {
            this.linked.push(tempBlock);
            this.removeFromNotLinkedBlocks(tempBlock);  
            this.syncLinkedArray();      
          });  
        this.templateLoaded=true;
      })
  }

  loadDocument(){
    this.templateLoaded=false;
      this.modelDocumentsService.loadFileTemplatesByid(this.modal_id,this.filemanagmentid).subscribe((dataResponse:ResponseApi<Templates>)=>{     
          this.loadedTemplate=dataResponse.data;
          this.category_id=this.loadedTemplate.categoryId;
          this.template= JSON.parse(dataResponse.data.content);
          this.templateLoaded=true;
      })
  }

  private removeFromNotLinkedBlocks(block:TemplateBlocks):void {
    const index = this.notlinked.findIndex(elem=>{return elem.blockId==block.blockId});
      if (index >= 0) {
        this.notlinked.splice(index, 1);
      }    
  } 

  private syncLinkedArray(){
    this.template=JSON.parse(JSON.stringify(EmptyDocument));   
    this.linked.forEach(TemplateBlock => {
      let Template:SyncfusionEditorSerialized=JSON.parse(TemplateBlock.block.content_Nl);
        Template.sec.forEach(Section=>{        
          Section.b.forEach(Block=>{
            if(TemplateBlock.title!="" && TemplateBlock.title!=null){
              let prefixSearchIndex=Block.i.findIndex(paragraph=>{return paragraph.tlp=="PREFIX: "});
              if(prefixSearchIndex>=0){                
                Block.i[prefixSearchIndex].tlp=TemplateBlock.title;
              }
              
            }
            this.template.sec[0].b.push(Block);            
          });    
          
          Object.keys(Section.hf).forEach((key)=>{     
            Section.hf[key].b.forEach((value)=>{
              if(this.template.sec[0].hf[key]==undefined) {
                this.template.sec[0].hf[key]={};
                this.template.sec[0].hf[key].b=[];
              }                
                this.template.sec[0].hf[key].b.push(value);
            });      
            //this.template.sec[0].hf["key"]=Template.imgs[key]
          });
        })
        Object.keys(Template.imgs).forEach((key)=>{          
          this.template.imgs[key]=Template.imgs[key]
        });

        Template.al.forEach(al=>{
          this.template.al.push(al);
        });
        Template.sty.forEach(style=>{
          this.template.sty.push(style);
        });
        Template.li.forEach(style=>{
          this.template.li.push(style);
        });
        Template.cm.forEach(style=>{
          this.template.cm.push(style);
        });  
         Template.r.forEach(style=>{
          this.template.r.push(style);
        });         
        Template.cx.forEach(style=>{
          this.template.cx.push(style);
        });    
    });
    
  }



}
