import {File_Folder} from './file_folder.model'
import {File_Managment} from './file_managment.model'
export class File_Attachments {
    id: string;
    fileManagmentId: number;
    fileFolderId: number;
    contentType: string;
    name: string;
    file_size: number;
    file_extension:string;
    url:string;
    created_at: number;
    updated_at: number;

    fileManagment:File_Managment
    fileFolder:File_Folder

}
