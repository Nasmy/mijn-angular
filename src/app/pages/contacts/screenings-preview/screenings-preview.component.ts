import { Component, inject, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_DRAWER_DATA, NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Contact } from '@shared/models';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsService, ContactsService, SubmissionsService } from '@shared/services';
//import { AccountService, FormsService, ContactsService,  SubmissionsService } from '@shared/services';
import { MatRadioModule } from '@angular/material/radio';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
//import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { Document, HeadingLevel, Packer, ImageRun, Paragraph, TextRun } from "docx";
import { contactType } from '@enums/contactType.enum';
import SignaturePad from "signature_pad";
import { SignaturepadComponent } from '@shared/components/signaturepad/signaturepad.component';

@Component({
  selector: 'app-screenings-preview',
  standalone: true,
  imports: [SignaturepadComponent,NzDrawerModule, NzIconModule, CommonModule, FormsModule, ReactiveFormsModule, MatRadioModule, NzCollapseModule, NzModalModule, RouterModule, TranslateModule],
  //providers: [NgbCollapseDirective],
  templateUrl: './screenings-preview.component.html',
  styleUrl: './screenings-preview.component.scss'
})
export class ScreeningsPreviewComponent implements  OnInit  {
  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  sig: SignaturePad;

  addMode:boolean;
  contact;
  form;
  submission;
  contacts;
  parsed;
  idEncoded;
  image;
  formBuild:FormGroup;
  arrayBuffer: ArrayBuffer;
  formTitle: string;
  formStatus: string;
  contactType=contactType;
  //public arrComboModels: { [key: string]: Contact } = {};
  public arrComboModels: { [key: string]: number } = {};

  public keepOriginalOrder = (a, b) => a.key;

  @ViewChild('printSection') printSection!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService,
    private contactsService: ContactsService,
    private translate: TranslateService,
    private submissionsService: SubmissionsService,
    private modal: NzModalRef,
    //private accountService: AccountService,
    //private alertService: AlertService,
    //private toaster: ToastrService,
    //private encryptionService: EncryptionService,
    private http: HttpClient
    ) {
      //this.accountService.checkRoute('contacts');
}
  
nzData: { value: string } = inject(NZ_MODAL_DATA);

//isModalVisible = false;
isDrawerVisible = true;

openDrawer(): void {
  this.isDrawerVisible = true;
}

handleAction(): void {
  console.log(this.nzData);
  // Handle docked bar actions
}

handleCancel(): void {
  //this.isModalVisible = false;
  this.modal.destroy();
  this.isDrawerVisible = false;
}

handlePrint(): void {
  window.print();
}

printComponent() {
  const printContents = this.printSection.nativeElement.innerHTML;
  const originalContents = document.body.innerHTML;
  

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload(); // To prevent UI breaking after printing
}

/*printComponent() {
    const printContents = this.printSection.nativeElement.innerHTML;
    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    if (popupWindow) {
      popupWindow.document.open();
      popupWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              img {
                max-width: 100%;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContents}
          </body>
        </html>
      `);
      popupWindow.document.close();
    }
}*/

ngOnInit(): void {
  
  //this.idEncoded = this.route.snapshot.params['id'];
  this.addMode = true;
  this.formTitle = this.nzData['title'];
  this.formStatus = this.nzData['status'];

  this.formBuild = this.formBuilder.group({}
    // Fields added dynamicaly
  );
  
  //this.getAllContacts();

  //if (this.accountService.userValue.client_id > 0){

    this.submissionsService.getById(this.nzData['id']).subscribe(result => {
      this.submission = result;
      this.parsed = JSON.parse(this.submission.formData);
      console.log(this.submission)
      
      //console.log(this.submission);

      this.contactsService.getById(this.submission.contactId).subscribe(result => {
        this.contact = result;

        //console.log(this.contact);
      });

      this.formsService.getById(this.submission.formId).subscribe(result => {
        this.form = result;

        console.log(this.form);
      
        this.form.formBlocks.forEach(block => {
          block.formBlockInputs.forEach(input => {

            this.formBuild.addControl(input.label, this.formBuilder.control(this.parsed[input.label], [Validators.required]));
            input.value = this.parsed[input.label];
            if(input.inputType=="Contact"){
              this.arrComboModels[input.label]=this.parsed[input.label].contactId;
            }

          });
  
        });

        //console.log(this.formBuild);
      });

    });


  //}

this.http.get('/assets/img/logo.png', {responseType: 'blob'})
  .subscribe(
    res => {
      const bufferPromise = res.arrayBuffer();
      bufferPromise.then(
          buffer =>
          {
            this.arrayBuffer = buffer;
        }
      );

    }
  );

}

initCanvasSignature():void {
  if(this.canvas && this.canvas.nativeElement) {
     this.sig = new SignaturePad(this.canvas.nativeElement);
  }
}

onFieldsChange(event,label){

  let ContactForm = this.contacts.find(elem=>{return elem.contactId==event.target.value});
  if(ContactForm!=undefined){
    this.formBuild.controls[label].setValue(ContactForm)
    this.arrComboModels[label]=ContactForm.contactId;
  }else{
    this.formBuild.controls[label].setValue("/")
  }

}

public createContact(contact) {

  var faxed = '';
  var gsmed = '';

if(contact.contactType == contactType.Company) {

  var dateArr = contact.foundingDate.split('T');

  if (contact.fax) {
    faxed = ' Fax: '+contact.fax;
  }
  if (contact.gsm) {
    gsmed = ' GSM: '+contact.gsm;
  }
  var comms = 'Tel:'+contact.phone+faxed+gsmed;

  return new Paragraph({
    children: [
      new TextRun(`Naam: ${contact.name}`),
      new TextRun({break:1}),
      new TextRun(`Rechtsvorm: ${contact.legalForm}`),
      new TextRun({break:1}),
      new TextRun(`BTW-nr: ${contact.vatNumber}`),
      new TextRun({break:1}),
      new TextRun(`Oprichtingsdatum: ${dateArr[0]}`),
      new TextRun({break:1}),
      //new TextRun(`Address: ${contact.street}, ${contact.streetNumber} ${contact.bus}`),
      new TextRun(`Address: ${contact.street}, ${contact.streetNumber}`),
      new TextRun({break:1}),
      new TextRun(`Gemeente: ${contact.zip} ${contact.city}, ${contact.country}`),
      new TextRun({break:1}),
      //new TextRun(`Tel: ${contact.phone}, Fax: ${contact.fax}, GSM: ${contact.gsm}`),
      new TextRun(`${comms}`),
      new TextRun({break:1}),
      new TextRun(`E-mail: ${contact.email}`),
      new TextRun({break:1}),
      new TextRun(`URL: ${contact.url}`),
      new TextRun({break:1}),
      new TextRun(`Activiteit: ${contact.activity}`),
      new TextRun({break:1}),
    ]
  });
} else {
  
  var dateArr = contact.birthDate.split('T');

  if (contact.fax) {
    faxed = ' Fax: '+contact.fax;
  }
  if (contact.gsm) {
    gsmed = ' GSM: '+contact.gsm;
  }
  var comms = 'Tel:'+contact.phone+faxed+gsmed;

  return new Paragraph({
    children: [
      new TextRun(`Voornaam: ${contact.name}`),
      new TextRun({break:1}),
      new TextRun(`Achternaam: ${contact.lastName}`),
      new TextRun({break:1}),
      new TextRun(`Geboorteplaats: ${contact.birthPlace}`),
      new TextRun({break:1}),
      new TextRun(`Geboortedatum: ${dateArr[0]}`),
      new TextRun({break:1}),
      //new TextRun(`Address: ${contact.street}, ${contact.streetNumber} ${contact.bus}`),
      new TextRun(`Address: ${contact.street}, ${contact.streetNumber}`),
      new TextRun({break:1}),
      new TextRun(`Gemeente: ${contact.zip} ${contact.city}, ${contact.country}`),
      new TextRun({break:1}),
      //new TextRun(`Tel: ${contact.phone}, Fax: ${contact.fax}, GSM: ${contact.gsm}`),
      new TextRun(`${comms}`),
      new TextRun({break:1}),
      new TextRun(`E-mail: ${contact.email}`),
      new TextRun({break:1}),
      new TextRun(`URL: ${contact.url}`),
      new TextRun({break:1}),
      new TextRun(`Nationaliteit: ${contact.nationality}`),
      new TextRun({break:1}),
      new TextRun(`Activiteit: ${contact.activity}`),
      new TextRun({break:1}),
      new TextRun(`BTW-nr: ${contact.vatNumber}`)

    ]
  });
}
}


public createHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    thematicBreak: true
  });
}

public createSubHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2
  });
}

public createSubmissionList(submission: any[]): Paragraph[] {
  //var result = Object.keys(submission).map((key) => [key, submission[key]]);
  var result = Object.keys(submission).map((key, value) => (submission[key]['contactId'] != null) ? [submission[key]] : [key, submission[key]]);

  //console.log(result);

  return result.map(
    (result, reskey) =>
      (result[0].contactId != null) ? 
        (this.createContact(result[0])) :
        (new Paragraph({text: String(result),}))
  );
}



public create([submis]): Document {
 console.log(JSON.stringify(this.form.formBlocks));
 return this.CreateDocumentNew();
  const document = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new ImageRun({
              data:  this.arrayBuffer,
              transformation: {
                width: 200,
                height: 50,
              },
            }),],
        }),
        this.createSubHeading(""),
        new Paragraph({
          children: [
              new TextRun({
                  text: this.form.name,
                  font: {
                      name: "Calibri",
                  },
                  size: 30,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
      }),
        this.createSubHeading(""),
        new Paragraph({
          children: [
              new TextRun({
                  text: "1. Contact details",
                  font: {
                      name: "Calibri",
                  },
                  size: 28,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
      }),
        this.createSubHeading(""),
        this.createContact(this.contact),
        
        //if (this.contact.contactType == '') {
        //new Paragraph('Naam: '+this.contact.name),
        //new Paragraph('Voorna(a)am(en)m: '+this.contact.lastName),
        //new Paragraph('Geboorteplaats: '+this.contact.lastName),
        //} else {

        //}
        this.createSubHeading(""),
        new Paragraph({
          children: [
              new TextRun({
                  text: "2. Submission",
                  font: {
                      name: "Calibri",
                  },
                  size: 28,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
      }),
        this.createSubHeading(""),
        ...this.createSubmissionList(submis),
        ]
      }
    ]
  });

  return document;
}


CreateDocumentNew(){

  const document = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new ImageRun({
              data:  this.arrayBuffer,
              transformation: {
                width: 200,
                height: 50,
              },
            }),],
        }),
        this.createSubHeading(""),
        new Paragraph({
          children: [
              new TextRun({
                  text: this.form.name,
                  font: {
                      name: "Calibri",
                  },
                  size: 30,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
        }),
        this.createSubHeading(""),
        new Paragraph({
          children: [
              new TextRun({
                  text: "1. "+this.translate.instant("Contact details"),
                  font: {
                      name: "Calibri",
                  },
                  size: 28,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
        }),
        this.createSubHeading(""),
        this.createContact(this.contact),        
        this.createSubHeading(""),
       /* new Paragraph({
          children: [
              new TextRun({
                  text: "2. " +this.translate.instant("Submission"),
                  font: {
                      name: "Calibri",
                  },
                  size: 28,
                  bold: true,
                  color: "e83c4e",
              }),
          ],
        }),*/

        this.createSubHeading(""),
       // ...this.createSubmissionList(submis),
       ...this.createSubmissionListParagraph()
        ]
      }
    ]
  });
  return document;
}


createSubmissionListParagraph():Array<Paragraph>{
    let lstPara:Array<Paragraph> = [];
    this.form.formBlocks.forEach(block => {
    let newParagraph =new  Paragraph({
            children: [],
        });
        let TextNewBlock=new TextRun({
            text:block.label!=null?this.translate.instant(block.label):"",
            font: {
                name: "Calibri",
            },
            size: 28,
            bold: true,
            color: "e83c4e",
            break: 1,
        });
        newParagraph.addChildElement(TextNewBlock);
      
        block.formBlockInputs.forEach(elementInput => {
          if (typeof elementInput.value === "object") {            
       
            let TextNewInputValueLabel = new TextRun({
              text: elementInput.label,
              font: {
                name: "Calibri",
              },
              size: 20,
              bold: true,
              color: "0d0d0d",
              break: 1,
            });
            newParagraph.addChildElement(TextNewInputValueLabel);


            const entries = Object.entries(elementInput.value).map(([key, value]) => {
              if (!["contactId", "contactType", "company_id"].includes(key)) {
                let KeyTranslated = (key != null ? this.translate.instant("formObject." + key) : "");
                KeyTranslated = KeyTranslated.replace("formObject.", "");
                let ValueTranslated = (value != null ? this.translate.instant("formObject." + value?.toString()) : "");
                ValueTranslated = ValueTranslated.replace("formObject.", "");
                if (ValueTranslated != "") {
                  let TextNewInput = new TextRun({
                    text: KeyTranslated + ": ",
                    font: {
                      name: "Calibri",
                    },
                    size: 20,
                    bold: false,
                    color: "0d0d0d",
                    break: 1,
                  });
                  newParagraph.addChildElement(TextNewInput);
                  let TextNewInputValue = new TextRun({
                    text: ValueTranslated,
                    font: {
                      name: "Calibri",
                    },
                    size: 20,
                    bold: true,
                    color: "0d0d0d",
                    break: 0,
                  });
                  newParagraph.addChildElement(TextNewInputValue);
                }

              }

            }

            );

          } else {
            let ValueTranslated = (elementInput.label != null ? this.translate.instant("formObject." + elementInput.label) : "");
            ValueTranslated=ValueTranslated.replace("formObject.", "");
            if (elementInput.value != "") {
              let TextNewInput = new TextRun({
                text: ValueTranslated.replace("formObject.", "") + ": ",
                font: {
                  name: "Calibri",
                },
                size: 20,
                bold: false,
                color: "0d0d0d",
                break: 1,
              });
              newParagraph.addChildElement(TextNewInput);

                     if(elementInput.value?.includes('base64')){                                
                    let image=  new ImageRun({
                          data: this.base64ToArrayBuffer(elementInput.value),
                          transformation: {
                            width: 200,
                            height: 50,
                          },
                        });
                        newParagraph.addChildElement(image);

               }else{

                  
                  let TextNewInputValue = new TextRun({
                    text: elementInput.value,
                    font: {
                      name: "Calibri",
                    },
                    size: 20,
                    bold: true,
                    color: "0d0d0d",
                    break: 0,
                  });
                  newParagraph.addChildElement(TextNewInputValue);
                }
            }
            
          }

        });     

      lstPara.push(newParagraph);
    })
    return lstPara
}

public download(): void {
  const doc = this.create([this.parsed]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "Form Submission - "+today.toDateString()+".docx");
    console.log("Document created successfully");
  });
}

base64ToArrayBuffer(base64: string): ArrayBuffer {
    // Remove potential data URL prefix (e.g., "data:image/png;base64,")
    const base64WithoutPrefix = base64.split(',')[1] || base64;
    
    // Decode the Base64 string to a binary string
    const binaryString = atob(base64WithoutPrefix);
    
    // Create a Uint8Array to hold the binary data
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    
    // Convert each character to its byte value
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
}

}
