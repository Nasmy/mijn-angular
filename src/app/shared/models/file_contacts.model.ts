import { Contact } from './contact.model';
import { File_Managment } from './file_managment.model';
import { Parameters } from './parameters.model';
import { User } from './user.model';
export class File_Contacts {
    filemanagmentid: number;
    contactid: number;
    roleId: number;
    created_at: Date;
    updated_at: Date;  

    role:Parameters;
    fileManagment:File_Managment;
    contact:Contact;
    createdBy:User;

}
