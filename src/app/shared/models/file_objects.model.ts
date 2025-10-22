import {ProspectionType,TypeParcel} from '../enums';
import { ProspectionCadgisGeometry } from './prospectionCadgisGeometry.model';
import {Requests} from './requests.model';
export class File_Objects {
    id: string;
    file_managment_id: number;
    fileManagment: any;
    request_id: number;
    region: string;
    municipality: string;
    department: string;
    section: string;
    type_prospection: ProspectionType;
    type_parcel: TypeParcel;
    area_from: number;
    area_to:number;
    object_id:string;
    capakey:string;
    area:string;
    type_area:string;
    type:string;
    status:string;
    address:string;
    geometry:ProspectionCadgisGeometry;
    created_at:Date;
    updated_at:Date;
    request:Requests;
    gewest_plan:Array<string>;

    name: string;
    fileNumber: string;
    
}


