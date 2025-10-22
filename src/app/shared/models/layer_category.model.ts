import {Layers} from './layer.model';
export class LayerCategory {
    id: string;
    name: string;
    description: string;
    maps: Array<Layers>;
    mapsFiltered: Array<Layers>;
    checked: boolean
    guid: string
    indeterminate:boolean;
}
