import { Company } from './company.model'
import { Company_department } from './company_department.model'
import { User } from './user.model'
export class Company_User {
    id: number;
    company_id: number;
    invite_statusid: number;
    user_id:number;
    date_from: Date;
    date_to: Date;   
    company: Company;
    department: Company_department; 
    user: User; 
 
}
