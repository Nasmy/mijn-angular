import {User_groups_claim_types} from './user_groups_claim_types.model';
export class User_groups{
    id: number;
    name: string;
    syscode:string;
    active:boolean;
    claimTypes: Array<User_groups_claim_types>;

}