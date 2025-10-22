
//import { Color } from '@angular-material-components/color-picker';

import Color from 'ts-color-class';

export class Configuration {
    id: string;
    name: string;
    region_id: number;
    active: boolean;
    user_id: number;
    watermerk:string;
    logo:string;
    primary_color:any //Color;
    secondary_color: any //Color;
    maps: Array<number>;

    //property
    regionName: string;


    constructor(data){
      this.id=data.id ;
      this.name=data.name ;
      this.region_id=data.region_id ;
      this.active=data.active ;
      this.user_id=data.user_id ;
      this.watermerk=data.watermerk;
      this.logo=data.logo;
      this.primary_color=data.primary_color;
      this.secondary_color=data.secondary_color;

     try{
      //const rgbPrimary=this.hexToRgb(data.primary_color);
      //const rgbSecondary=this.hexToRgb(data.secondary_color);

     // this.primary_color=new Color( rgbPrimary.r,rgbPrimary.g,rgbPrimary.b);
     // this.secondary_color=new Color( rgbSecondary.r,rgbSecondary.g,rgbSecondary.b);
     }catch{}

      this.maps=data.maps;
    }



    public hexToRgb(hex) {
      if (hex==null) return null;
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),


      } : null;
    }



    public  static   rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }


}
