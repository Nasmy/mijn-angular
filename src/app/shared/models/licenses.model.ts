import {Company} from './company.model'
import {Licenses_Packages} from './licenses_packages.model'
export class Licenses {
    id: number;
    company_id: number;
    from: Date;
    till: Date;
    active: boolean;
    total_users: number;
    company: Company;
    license_packages: Array<Licenses_Packages>;
    
 
}
