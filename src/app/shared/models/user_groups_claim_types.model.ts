import {User_groups_claims} from './user_groups_claims.model';
export class User_groups_claim_types{
    id: number;
    user_group_id: number;
    type_name:string;    
    claims: Array<User_groups_claims>;

}