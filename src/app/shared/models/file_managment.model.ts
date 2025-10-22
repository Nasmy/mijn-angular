import {File_Objects} from './file_objects.model'
import { Parameters } from './parameters.model';
export class File_Managment {
    id: number;
    name: string;
    file_number: string;
    description: string;
    status_id: number;
    client_id: number;
    created_at: number;
    updated_at: number;

    fileObjects:Array<File_Objects>
    status:Parameters

}
