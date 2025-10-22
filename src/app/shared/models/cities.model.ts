import { Provinces } from "./province.model";

export class Cities {
    id: string;
    country_name: string;
    name: string;
    nl: string;
    fr: string;
    en: string;
    zip: string;
    nis_id: string;
    code: string
    
    namelang: string;
    province: Provinces;
}
