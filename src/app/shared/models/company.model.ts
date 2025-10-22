import {CompanyType} from './companyType.model'
//import { Color } from '@angular-material-components/color-picker';
import { CompanyLicense } from './companyLicense.model';
import { User } from './user.model';
import { Licenses } from './licenses.model';
export class Company {
    id: number;
    name: string;
    vat: string;
    street: string;
    number: string;
    bus: string;
    city: string;
    zip: string;
    country: string;
    code: string;
    phone: string;
    email: string;
    active: boolean;
    type_id: number;
    city_id: number;
    cityfull: string;
    total_users: number;
    total_req: number;
    total_days: number;
    total_capacity: number;
    used_capacity: number;
    total_users_license: number;
    avatar: any;
    color: any;
    client_nr: string;
    type: string;
    pakket: string;
    status: boolean;
    startDatum: Date;
    eindDatum: Date;
    domain: string;
    subDomain: string;
    pakketSearch: string;
    statusSearch: boolean;
    startDatumSearch: Date;
    jwk_private: string;
    jwk_public: string;
    client_secret: string;
    clientid: string;
    biv_number: string;
    jsonResult: string;
    googlePlaces_API: string;



// property
    licenses:Array<Licenses>;
    companyType: CompanyType;
    license_details: CompanyLicense;
    users: Array<User>;

    constructor(data:Company =null){


        //this.color= new Color(2,117,129)
        if (data!=null){
          this.id=data.id;
          this.name=data.name;
          this.vat=data.vat;
          this.street=data.street;
          this.number=data.number;
          this.bus=data.bus;
          this.city=data.city;
          this.zip=data.zip;
          this.country=data.country;
          this.code=data.code;
          this.phone=data.phone;
          this.email=data.email;
          this.active=data.active;
          this.type_id=data.type_id;
          this.city_id=data.city_id;
          this.cityfull=data.cityfull;
          this.total_users=data.total_users;
          this.total_req=data.total_req;
          this.total_days=data.total_days;
          this.total_users_license=data.total_users_license;
          this.avatar=data.avatar;
          this.license_details=data.license_details;
          this.users=data.users;
          this.client_nr=data.client_nr;
          this.status=data.status;
          this.startDatum=data.startDatum;
          this.eindDatum=data.eindDatum;
          this.pakket=data.pakket;
          this.type=data.type;
          this.licenses=data.licenses;
          this.domain=data.domain;
          this.subDomain=data.subDomain;
          this.used_capacity=data.used_capacity;
          this.total_capacity=data.total_capacity;
          this.jwk_private=data.jwk_private;
          this.jwk_public=data.jwk_public;
          this.client_secret=data.client_secret;
          this.clientid=data.clientid;
          this.biv_number=data.biv_number;
          this.jsonResult=data.jsonResult;
          this.googlePlaces_API=data.googlePlaces_API;
          try{
            //const rgbColor=this.hexToRgb(data.color);
            //this.color= new Company.rgbToHex( rgbColor.r,rgbColor.g,rgbColor.b);
            this.color=data.color;
          }
          catch{}
      }else{

      }


    }

  /* public get  _color():Color
      {
        try{
            return JSON.parse(''+this.color)
        }catch{
            return this.color
        }
    }*/


    public hexToRgb(hex) {
      if (hex==null) return null;
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    }



    public  static   rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }


}
