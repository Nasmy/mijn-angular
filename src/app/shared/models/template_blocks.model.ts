import { Blocks } from './blocks.model';
import {Parameters} from './parameters.model';
import {Templates} from './templates.model';
export class TemplateBlocks {
 id :string;   
templateId:string;
blockId :string;
categoryId:string;
title :string;
content_Nl :string;
content_Fr:string;
content_En :string;

category :Parameters;
template : Templates;
block : Blocks
}
