import { File_Attachments } from './file_attachments.model';
import {File_Managment} from './file_managment.model'
export class File_Folder {
    id: number;
    name: string;
    fileManagmentId: number;
    folderParentId: number;
   
    folderParent:File_Folder;
    folderChilds:Array<File_Folder>;
    fileManagment:File_Managment;
    fileAttachments:Array<File_Attachments>;

}
