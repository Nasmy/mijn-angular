import {Point} from './point.model';
export class Parcel {
    capakey: string;
    rings: number[][];
    center: Point;
    surface: number;
    perimeter: number;
    markForDelete: boolean;
    geometry: string;
}
