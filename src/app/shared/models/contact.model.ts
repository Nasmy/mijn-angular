import { contactType } from "@enums/contactType.enum";

//import { JsonpClientBackend } from '@angular/common/http';
export class Contact {
    contactType?:contactType;
    contactId?:number;
    name?:string;
    lastName?:string;
    birthPlace?:string;
    birthDate?:string;
    legalForm?:string;
    foundingDate?:string;
    vatNumber?:string;
    street?:string;
    streetNumber?:string;
    bus?:string;
    zip?:string;
    city?:string;
    country?:string;
    email?:string;
    phone?:string;
    fax?:string;
    gsm?:string;
    url?:string;
    nationality?:string;
    activity?:string;
    street2?:string;
    streetNumber2?:string;
    bus2?:string;
    zipCode2?:string;
    city2?:string;
    country2?:string;
    email2?:string;
    phone2?:string;
    fax2?:string;
    gsm2?:string;
    url2?:string;
}
