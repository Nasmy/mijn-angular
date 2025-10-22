
import { Parameters } from './parameters.model';
import { User } from './user.model';
export class Requests {
    id: string;
    user_id: string;
    capakey: string;
    date_send: Date;
    created_at: Date;
    updated_at: Date;
    reference: string;
    filenumber: string;    
    klim_id: string;
    status_id: string;
    klip: string;
    klim: boolean;
    folder: string;
    last_klip_request: string;
    no_mail: string;
    invalid_capakey: string;
    invoice_id: string;
    external_id: string;
    payed: string;
    json: string;
    user_avatar: string;
    config_array: string;
    type: string;
    percelen: string;
    fullname: string;
    file_objectId:number;
    address:string;

// property
    syscode: string;
    status_name: string;
    userName: string;
    status:Parameters;
    user: User;

}
