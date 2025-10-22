import { TemplateBlocks } from "./template_blocks.model";

export class FileTemplates {
    id: string;
    fileManagmentId: number;   
    categoryId: number;   
    statusId: number;   
    title: string;   
    header: string;
    content: string;
    foother: string;
    watermark: string; 
    stared: boolean; 

    templateBlocks:Array<TemplateBlocks>;
 
}
