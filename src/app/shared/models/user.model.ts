import { Company_User } from './company_user.model';
import { User_usergroups } from "./user_usergroups.model";                                 
import { Company } from './company.model'

export class User {
    id: number;
    active: boolean;   
    firstname: string;
    client_id: number;
    lastname: string;
    personal_number: string;
    access_token: string;
    refresh_token: string;
    company_admin:boolean;
    refreshTokenExpiryTime: Date;
    email: string;
    telephone: string;
    mobile: string;
    avatar: string;
    userGroups: Array<number>;
    website: string;
    print_language: string;
    language: string;
    tags:string;
    user_UserGroups : Array<User_usergroups>;
    company_user : Array<Company_User>;
    gender:number;
    birthdate:Date;
    name:string;
    client_date:Date;
    created_user: User; 
    client: Company
}
