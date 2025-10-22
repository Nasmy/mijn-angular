import { ProspectionCadgisGeometry } from "./prospectionCadgisGeometry";

export class ProspectionParcels {
    attributes:ProspectionParcelAttribute;
    geometry:ProspectionCadgisGeometry;
}

export class ProspectionParcelAttribute {
    CaPaKey:string;
    CaSeKey:string;
    FiscSitId:string;
    GlobalID:string;
    LastUpdDTS:string;
    OBJECTID:string;
    RecId:string;
    "SHAPE.STArea()":string;
    "SHAPE.STLength()":string;
    Status:string;
    SuVaCn:string;
    SuVaCnType:string;
    Type:string;
    Address:string;
    GewestPlan:Array<string>;
    POI:Array<string>=[];
}

