import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,from, of } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Company, CompanyType,Combo, ResponseApi,Cities, City_nis, Packages, Parameters, Guid, Provinces} from '@models/index';
import { AlertService} from '@services/alert.service';
import * as query from "@arcgis/core/rest/query.js";
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import Polygon from '@arcgis/core/geometry/Polygon';
import Point from '@arcgis/core/geometry/Point';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private Mydata: any
  private _packages$ = new BehaviorSubject<Array<Packages>>([]);
  public  packages$$: Observable<Array<Packages>> = this._packages$.asObservable();

  private _params$ = new BehaviorSubject<Array<Parameters>>([]);
  public  params$$: Observable<Array<Parameters>> = this._params$.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService
    ) {

      }

public  getCompanyType(sName: string): Observable<Array<Combo>>{
    return from(this._getCompanyType(sName).then((data: Array<Combo>) => {
      return data;
    }))
  }
  private _getCompanyType(sName: string) {
    return this.http.get(`${environment.apiBaseUrl}/clienttypes/search?q=${sName}`).pipe(
      map((data: ResponseApi< Array<Combo>>) =>  this.Mydata = data.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


  public  getCities(sName: string): Observable<Array<Cities>>{
    return from(this._getCities(sName).then((dataCities: Array<Cities>) => {
      const language=localStorage.getItem("language")

      dataCities.forEach((city: Cities)=>{
        switch(language){
          case "en-US":
            city.namelang=city.en + ' '+city.zip+ ', '+ city.country_name
          break;
          case "nl-NL":
            city.namelang=city.nl+ ' '+city.zip+ ', '+ city.country_name
          break;
          case "fr-FR":
            city.namelang=city.fr+ ' '+city.zip+ ', '+ city.country_name
          break;
        }
      })
      return dataCities;
    }))
  }
  private _getCities(sName: string) {
    return this.http.get(`${environment.apiBaseUrl}/combo/city/search?q=${sName}`).pipe(
      map((dataCities: ResponseApi< Array<Cities>>) =>this.Mydata = dataCities.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  public  searchInCombo(sSearchName:string,arrCombo:Array<Combo>,sComboName:string): Observable<Array<Combo>>{

     const arrComboFiltered$: BehaviorSubject<Array<Combo>> = new BehaviorSubject<Array<Combo>>(null);
     const  arrComboFiltered$$: Observable<Array<Combo>> = arrComboFiltered$.asObservable();

     arrComboFiltered$.next( arrCombo.filter(x => x.name.toLowerCase().includes(sSearchName.toLowerCase().toString())))




      const arrComboFiltered: Array<Combo>= arrCombo.filter(x => x.name.toLowerCase().includes(sSearchName.toLowerCase().toString()));

      if (arrComboFiltered.length==0){
        switch (sComboName)
        {
          case 'COMPANYTYPE':
            this.getCompanyType(sSearchName).subscribe((data: Array<Combo>)=>{
              arrComboFiltered$.next(data);
            //  return arrComboFiltered;

            })
            return arrComboFiltered$$

          break;
          default:
            return arrComboFiltered$$

        }
      }else{
        return arrComboFiltered$$;
      }



  }

  public  searchCities(sSearchName:string,arrCombo:Array<Cities>): Observable<Array<Cities>>{

    const arrComboFiltered$: BehaviorSubject<Array<Cities>> = new BehaviorSubject<Array<Cities>>(null);
    if(arrCombo.length>0){
      arrComboFiltered$.next( arrCombo.filter(x => x.namelang.toLowerCase().includes(sSearchName.toLowerCase())));
    }else{
      arrComboFiltered$.next([]);
    }
     //let  arrComboFiltered$$: Observable<Combo> = arrComboFiltered$.asObservable();

      const arrComboFiltered: Array<Cities>= arrCombo.filter(x => x.namelang === sSearchName);

      if (arrComboFiltered.length==0){

            this.getCities(sSearchName).subscribe((data: Array<Cities>)=>{
              arrComboFiltered$.next(data);
           })
            return arrComboFiltered$


      }else{
        return arrComboFiltered$;
      }
  }

  public  searchCapakey(inCapa:string,arrCombo:Array<Combo>): Observable<Array<Combo>>{

    const  sSearchCapa=inCapa.replace(/\s/g, "");

    const arrComboFiltered$: BehaviorSubject<Array<Combo>> = new BehaviorSubject<Array<Combo>>(null);

    arrComboFiltered$.next( arrCombo.filter(x => x.name.toLowerCase().includes(sSearchCapa.toLowerCase())))

    const arrComboFiltered: Array<Combo>= arrCombo.filter(x => x.name === sSearchCapa);

      if (arrComboFiltered.length==0 && sSearchCapa!=""){
              const arrCombo: Array<Combo>=[];
              // Cadgis CapakeyPattern              
              const  sBody="{}"
              const PostObject:any=new Object();
              PostObject.url="https://eservices.minfin.fgov.be/ecad-backend-rest/localisation/capakey?pattern="+sSearchCapa;
              PostObject.body=sBody;
              this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObject).subscribe((capaData: any)=>{
                if (capaData!=null){
                    this.Mydata = capaData                  
                    const oCombo:Combo=new Combo()

                    this.Mydata.forEach((caPaKey) =>{
                      new Combo();
                      oCombo.id=Guid.newGuid.toString();
                      oCombo.name=caPaKey;
                      arrCombo.push(Object.assign({},oCombo));                      
                  })
                }
              const uniqueObjectArray = [...new Map(arrCombo.map(item => [item.name, item])).values()]
              arrComboFiltered$.next(uniqueObjectArray);
              })

              /*
              //Wallonie
              //let sURlWallonie: string="http://eservices.minfin.fgov.be/ecad-backend-rest/localisation/capakey?pattern="+sSearchCapa
              //const sURlWallonie: string="https://ccff02.minfin.fgov.be/arcgis/rest/services/cadgisr2c/CadastralObjects_C/MapServer/7/query?where=+CaPakey+like+%27"+sSearchCapa+"%25%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CaPaKey,ObjectID&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson"
              const sURlWallonie: string="https://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/query?where=+CaPakey+like+%27"+sSearchCapa+"%25%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CaPaKey,ObjectID&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson"
              const  sBody="{}"
              const PostObject:any=new Object();
              PostObject.url=sURlWallonie;
              PostObject.body=sBody;
              this.http.post(`${environment.apiUrl}/cors/GET`,PostObject).subscribe((capaData: any)=>{
                if (capaData!=null){
                    this.Mydata = capaData.features
                    let counter=1
                    const oCombo:Combo=new Combo()

                    this.Mydata.forEach((item) =>{
                      new Combo();
                      oCombo.id=""+item.attributes.OBJECTID;
                      oCombo.name=item.attributes.CaPaKey;
                      arrCombo.push(Object.assign({},oCombo));
                      counter++;
                  })
                }
              const uniqueObjectArray = [...new Map(arrCombo.map(item => [item.name, item])).values()]
              arrComboFiltered$.next(uniqueObjectArray);
              })



           //Vlaanderen
           const headers1= new HttpHeaders()
           .set('Content-Type', 'multipart/form-data;')
            //const sUrlVlaanderen: string="https://perc.geopunt.be/perceel/suggestion?c=5&q="+sSearchCapa
            const sUrlVlaanderen: string="https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?c=5&q="+sSearchCapa
            const  sBodyVlaanderen="{}"
            const PostObjectVlaanderen:any=new Object();
            PostObjectVlaanderen.url=sUrlVlaanderen;
            PostObjectVlaanderen.body=sBodyVlaanderen;

            this.http.post(`${environment.apiUrl}/cors/GET`,PostObjectVlaanderen ).subscribe((capaData:  any)=>{
              if (capaData!=null){
                      this.Mydata = capaData.SuggestionResult
                      let counter=1
                      const oCombo:Combo=new Combo()

                      this.Mydata.forEach((item) =>{
                        new Combo()
                        oCombo.id=""+counter;
                        oCombo.name=item
                        arrCombo.push(Object.assign({},oCombo))
                        counter++
                      }
                    )
               }

            const uniqueObjectArray = [...new Map(arrCombo.map(item => [item.name, item])).values()]
            arrComboFiltered$.next(uniqueObjectArray)

           })

           // Brussel
            const sCapaURL: string=sSearchCapa.replace("/","%2F").toUpperCase();
            const sURlBrussel: string="https://gis.urban.brussels/geoserver/ows?service=wfs&version=1.0.0&request=GetFeature&typeName=CIBG_URBIS%3AKADASTRALE_PERCELENPLAN_URBIS&outputFormat=application%2Fjson&FILTER=%3CFilter%20xmlns%3D%22http%3A%2F%2Fwww.opengis.net%2Fogc%22%3E%20%3CPropertyIsLike%20wildCard=%22*%22%20singleChar=%22.%22%20escape=%22!%22%3E%3CPropertyName%3ECAPA_CAPAKEY%3C/PropertyName%3E%3CLiteral%3E"+sCapaURL+"*%3C/Literal%3E%3C/PropertyIsLike%3E%3C/Filter%3E&language=dut&spatialReference=31370"
            const  sBodyBryssel="{}"
            const PostObjectBruss:any=new Object();
            PostObjectBruss.url=sURlBrussel;
            PostObjectBruss.body=sBodyBryssel;

            this.http.post(`${environment.apiUrl}/cors/GET`,PostObjectBruss ).subscribe((capaData:  any)=>{
              if (capaData!=null){
                  this.Mydata = capaData.features
                  const counter=1
                  const oCombo:Combo=new Combo()
                  //let arrCombo: Array<Combo>=[]
                  this.Mydata.forEach((item) =>{
                    new Combo();
                    oCombo.id=""+item.properties.ID;
                    oCombo.name=item.properties.CAPAKEY;
                    arrCombo.push(Object.assign({},oCombo));
                  })
                }

              const uniqueObjectArray = [...new Map(arrCombo.map(item => [item.name, item])).values()];
              arrComboFiltered$.next(uniqueObjectArray);

            })
            */
          return arrComboFiltered$;

      }else{
        return arrComboFiltered$;
      }
  }

  public  searchCapakeyVlaanderen(inCapa:string,arrCombo:Array<Combo>): Observable<Array<Combo>>{

    const  sSearchCapa=inCapa.replace(/\s/g, "");

    const arrComboFiltered$: BehaviorSubject<Array<Combo>> = new BehaviorSubject<Array<Combo>>(null);

    arrComboFiltered$.next( arrCombo.filter(x => x.name.toLowerCase().includes(sSearchCapa.toLowerCase())))

    const arrComboFiltered: Array<Combo>= arrCombo.filter(x => x.name === sSearchCapa);

      if (arrComboFiltered.length==0 && sSearchCapa!=""){
              const arrCombo: Array<Combo>=[];  
           //Vlaanderen
           const headers1= new HttpHeaders()
           .set('Content-Type', 'multipart/form-data;')            
            //const sUrlVlaanderen: string="https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?c=5&q="+sSearchCapa
            const sUrlVlaanderen: string="https://geo.api.vlaanderen.be/geolocation/perceel/suggestion?c=5&data=adp&status=actual&q="+sSearchCapa
            const  sBodyVlaanderen="{}"
            const PostObjectVlaanderen:any=new Object();
            PostObjectVlaanderen.url=sUrlVlaanderen;
            PostObjectVlaanderen.body=sBodyVlaanderen;

            this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObjectVlaanderen ).subscribe((capaData:  any)=>{
              if (capaData!=null){
                      this.Mydata = capaData.SuggestionResult
                      let counter=1
                      const oCombo:Combo=new Combo()

                      this.Mydata.forEach((item) =>{
                        new Combo()
                        oCombo.id=""+counter;
                        oCombo.name=item
                        arrCombo.push(Object.assign({},oCombo))
                        counter++
                      }
                    )
               }

            const uniqueObjectArray = [...new Map(arrCombo.map(item => [item.name, item])).values()]
            arrComboFiltered$.next(uniqueObjectArray)

           })                     
          return arrComboFiltered$;

      }else{
        return arrComboFiltered$;
      }
  }


  public LoadDataFromCapakey(sCapakey: string){
    const sCapaURL: string=sCapakey.replace("/","%2F").toUpperCase();
    const headersVlaanderen= new HttpHeaders()
    .set('Cache-Control', 'max-age=0')
    //const  sUrlVlaanderen: string="https://perc.geopunt.be/perceel/location?q="+sCapaURL+"&c=1"
    const sUrlVlaanderen: string="https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?c=1&q="+sCapakey
    return  this.http.get(sUrlVlaanderen,{headers: headersVlaanderen})

  }

  public LoadRingDataFromCapakey(sCapakey: string, spatialReference:string="4326"){

    return this.http.get("https://geo.api.vlaanderen.be/capakey/v2/parcel/"+sCapakey+"?srs="+spatialReference+"&geometry=full");
    /*const sCapaURL: string=sCapakey.replace("/","%2F").toUpperCase();
    const headersVlaanderen= new HttpHeaders()
    .set('Cache-Control', 'max-age=0')
    const  sUrlVlaanderen: string="https://ags.geo.api.vlaanderen.be/arcgis/rest/services/adp/MapServer/0/query?where=CAPAKEY%20LIKE%20%27"+sCapaURL+"%27&f=json&outSR=4326"
    return  this.http.get(sUrlVlaanderen,{headers: headersVlaanderen})
    */

    /*return from(query.executeQueryJSON(
      "https://ags.geo.api.vlaanderen.be/arcgis/rest/services/adpf/MapServer/3/",
       {  // autocasts as new Query()
          where: `CAPAKEY LIKE'${sCapakey}'`,
          outSpatialReference: spatialReference,
          spatialRelationship: "intersects",
          returnGeometry:true,
          outFields:["*"],  
          geometryPrecision:5
       }));*/

  }

  public  getNisCodes(sRegio: string): Observable<Array<Combo>>{
    return from(this._getNisCodes(sRegio).then((dataCities: Array<City_nis>) => {
      const language=localStorage.getItem("language")
        const arrCombo:Array<Combo>=[];
      dataCities.forEach((city: City_nis)=>{
        const oCombo:Combo=new Combo();
        oCombo.id=city.id
        oCombo.code=city.nis
        switch(language){
          case "en-US":
            oCombo.name=city.name + ' '+city.nis+ ', '+ city.country.name
          break;
          case "nl-NL":
            oCombo.name=city.name+ ' '+city.nis+ ', '+ city.country.name
          break;
          case "fr-FR":
            oCombo.name=city.name+ ' '+city.nis+ ', '+ city.country.name
          break;
        }
        arrCombo.push(oCombo)
      })
      return arrCombo;

    }))
  }

  public  getCityByRegion(sRegio: string): Observable<Array<Combo>>{
    return from(this._getCityByRegion(sRegio).then((dataCities: Array<Cities>) => {
      const language=localStorage.getItem("language")
        const arrCombo:Array<Combo>=[];
      dataCities.forEach((city: Cities)=>{
        const oCombo:Combo=new Combo();
        oCombo.id=city.id
        oCombo.code=city.zip
        oCombo.nis_id=city.nis_id
        switch(language){
          case "en-US":
            oCombo.name=city.en + ' '+city.zip+ ', '+ city.province.nl
          break;
          case "nl-NL":
            oCombo.name=city.nl+ ' '+city.zip+ ', '+ city.province.nl
          break;
          case "fr-FR":
            oCombo.name=city.fr+ ' '+city.zip+ ', '+ city.province.nl
          break;
        }
        arrCombo.push(oCombo)
      })
      return arrCombo;

    }))
  }

  
  public  getNisCodesClear(sRegio: string): Observable<Array<Combo>>{
    return from(this._getNisCodes(sRegio).then((dataCities: Array<City_nis>) => {
      const language=localStorage.getItem("language")
        const arrCombo:Array<Combo>=[];
      dataCities.forEach((city: City_nis)=>{
        const oCombo:Combo=new Combo();
        oCombo.id=city.id
        oCombo.code=city.nis
        switch(language){
          case "en-US":
            oCombo.name=city.name
          break;
          case "nl-NL":
            oCombo.name=city.name
          break;
          case "fr-FR":
            oCombo.name=city.name
          break;
        }
        arrCombo.push(oCombo)
      })
      return arrCombo;

    }))
  }


  private _getNisCodes(sRegio: string) {
    return this.http.get(`${environment.apiBaseUrl}/city/citynis/region/${sRegio}`).pipe(
      map((data: ResponseApi< Array<City_nis>>) =>  this.Mydata = data.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  private _getCityByRegion(sRegio: string) {
    return this.http.get(`${environment.apiBaseUrl}/city/regon/${sRegio}`).pipe(
      map((data: ResponseApi< Array<Cities>>) =>  this.Mydata = data.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }
//https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?q=zandvlietse%20dorpstraat%20107B&c=5

public  searchAddressVlaanderen(sAddress: string): Observable<Array<Combo>>{

  const sUrl: string="https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?q="+encodeURI(sAddress)+"&c=5"
  const  sBody="{}"
  const PostObjectAdd:any=new Object();
  PostObjectAdd.url=sUrl;
  PostObjectAdd.body=sBody;

  return this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObjectAdd)
  .pipe(map((dataresponse:  any) => {
    const arrCombo: Array<Combo>=[]
    dataresponse.SuggestionResult.forEach(addresline => {
      const oCombo: Combo=new Combo()
      oCombo.id=Guid.newGuid().toString();
      oCombo.name=addresline
      arrCombo.push(Object.assign({},oCombo));
    });
    return arrCombo;

  })) 
}

  public  searchAddress(sAddress: string): Observable<Array<Combo>>{
    return from(this._searchAddress(sAddress).then((address: Array<Combo>) => {
      const arrCombo: Array<Combo>=[]
      address.forEach((addresline: any)=>{
        const oCombo: Combo=new Combo()
        oCombo.id=""+addresline.magicKey;
        oCombo.name=addresline.text
        arrCombo.push(Object.assign({},oCombo));
      })
      return arrCombo;
    }))
  }
  private _searchAddress(sAddress: string) {
      const sUrl: string="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?countryCode=BEL&maxSuggestions=6&outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D&text="+encodeURI(sAddress)+"&f=json"
      const  sBody="{}"
      /*const form = new FormData();
      form.append('url', sUrl);
      form.append('body', sBody);*/

      const PostObjectAdd:any=new Object();
      PostObjectAdd.url=sUrl;
      PostObjectAdd.body=sBody;

      return  this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObjectAdd)
      .pipe(map((dataresponse:  any) =>  this.Mydata = dataresponse.suggestions ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


  public LoadDataFromCapakeyCadGis(sCapakey: string,outSR:string ="31370"){
    const sCapaURL: string=sCapakey.replace("/","%2F").toUpperCase();
    //const  sUrlVlaanderen: string="http://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/13/query?where=CaPaKey%20Like%20%27%25"+sCapaURL+"%25%27&text=&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=0.29858214173889186&geometryPrecision=&outSR="+outSR+"&returnIdsOnly=false&returnCountOnly=false&orderByFields=OBJECTID+ASC&returnExtentsOnly=false&rangeValues=&f=json"
    const  sUrlVlaanderen: string="http://ccff02.minfin.fgov.be/geoservices/arcgis/rest/services/WMS/Cadastral_Layers/MapServer/11/query?where=CaPaKey%20Like%20%27%25"+sCapaURL+"%25%27&text=&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR="+outSR+"&returnIdsOnly=false&returnCountOnly=false&orderByFields=OBJECTID+ASC&returnExtentsOnly=false&rangeValues=&f=json"
    const  reqData:any=new Object();
    const PostObject:any=new Object();
    PostObject.url=sUrlVlaanderen;
    PostObject.body=JSON.stringify(reqData);
    return  this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObject);
  }

  public LoadDataFromCapakeyWaterInfo(sCapakey: string, outSR:string ="31370"){
    const sCapaURL: string=sCapakey.replace("/","%2F").toUpperCase();
    const  sUrlVlaanderen: string="https://inspirepub.waterinfo.be/arcgis/rest/services/waterinfo/search_and_select/MapServer/0/query?f=pjson&where=CAPAKEY+%3D+%27"+sCapaURL+"%27&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=3857"
    const  reqData:any=new Object
    /*const form = new FormData();
    form.append('url', sUrlVlaanderen);
    form.append('type', "GET");
    form.append('body', JSON.stringify(reqData));
    */
    const PostObject:any=new Object();
    PostObject.url=sUrlVlaanderen;
    PostObject.body=JSON.stringify(reqData);
    return  this.http.post(`${environment.apiBaseUrl}/cors/GET`,PostObject)
  }
   public async TransformCoordinate(oPoint: Point, inSR: string, outSR: string) {
    const sUrlVlaanderen: string = "https://inspirepub.waterinfo.be/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?f=json&outSR="+outSR+"&inSR="+inSR+"&geometries=%7B%22geometryType%22%3A%22esriGeometryPoint%22%2C%22geometries%22%3A%5B%7B%22x%22%3A"+oPoint.x+"%2C%22y%22%3A"+oPoint.y+"%2C%22spatialReference%22%3A%7B%22wkid%22%3A31370%7D%7D%5D%7D&transformation=1609";
    const reqData: any = new Object();
    const PostObject: any = new Object();
    PostObject.url = sUrlVlaanderen;
    PostObject.body = JSON.stringify(reqData);
    return this.http.post(`${environment.apiBaseUrl}/cors/GET`, PostObject).toPromise();
  }
  async convertToWGS84(x: number, y: number): Promise<{ latitude: number; longitude: number }> {
    const point3857 = new Point({
      x: x,
      y: y,
      spatialReference: { wkid: 3857 }
    });

    interface TransformResult {
      geometries: Array<{ x: number; y: number }>;
    }

    const result = await this.TransformCoordinate(point3857, '3857', '4326') as TransformResult;
    const transformedPoint = result.geometries[0];
    return {
      latitude: transformedPoint.y,
      longitude: transformedPoint.x
    };
  }

  getPolygonCentroid(coords: [number, number][]): { latitude: number; longitude: number } | null {
    if (coords.length < 3) {
      console.warn("At least 3 points are required to form a polygon.");
      return null;
    }
  
    try {
      // Calculate centroid using simple averaging of coordinates
      const sumX = coords.reduce((sum, coord) => sum + coord[0], 0);
      const sumY = coords.reduce((sum, coord) => sum + coord[1], 0);
      
      const x = sumX / coords.length;
      const y = sumY / coords.length;

      // Convert directly to geographic coordinates
      const geographicCoords = webMercatorUtils.xyToLngLat(x, y);
      if (!geographicCoords) return null;
      
      return {
        latitude: geographicCoords[1],
        longitude: geographicCoords[0]
      };
    } catch (error) {
      console.error('Error calculating centroid:', error);
      return null;
    }
  }

  public async GetCenterFromPolygon(arrPoints:Array<string>){
        return new Promise((resolve,reject)=>{  
            const  sUrlVlaanderen: string="https://eservices.minfin.fgov.be/ecad/api/parcels/center";
            const PostObject:any=new Object();
            PostObject.url=sUrlVlaanderen;
            PostObject.body=JSON.stringify(arrPoints);
            return  this.http.post(`${environment.apiBaseUrl}/cors/POST`,PostObject).pipe(
              map(coordinate =>
                coordinate                
              )              
            ).subscribe(coordinate => {           
                resolve(coordinate);          
            });
          });
  }

  public  getPackages(sName: string): Observable<Array<Combo>>{
    return from(this._getPackages(sName).then((dataPackages: Array<Packages>) => {
      this._packages$.next(dataPackages);
      const ComboPackages:Array<Combo>=[];

      dataPackages.forEach((pack: Packages)=>{

        const oPackage=new Combo();
        oPackage.id=""+pack.id;
        oPackage.name=pack.name + " "+pack.total_days+" dagen " + pack.total_req+" aanvragen";
        ComboPackages.push(oPackage);
      })
      return ComboPackages;
    }))
  }
  private _getPackages(sName: string) {
    return this.http.get(`${environment.apiBaseUrl}/combo/packages/search?q=${sName}`).pipe(
      map((dataPackages: ResponseApi< Array<Packages>>) =>this.Mydata = dataPackages.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


  public  getParams(sCode: string,sName: string): Observable<Array<Combo>>{
    return from(this._getParams(sCode,sName).then((dataParams: Array<Parameters>) => {
      this._params$.next(dataParams);
      const ComboPackages:Array<Combo>=[];

      dataParams.forEach((param: Parameters)=>{

        const oParam=new Combo();
        oParam.id=""+param.id;
        oParam.name=param.name ;
        ComboPackages.push(oParam);
      })
      return ComboPackages;
    }))
  }
  private _getParams(sCode: string,sName: string) {
    return this.http.get(`${environment.apiBaseUrl}/combo/params/search?code=${sCode}&q=${sName}`).pipe(
      map((dataPackages: ResponseApi< Array<Parameters>>) =>this.Mydata = dataPackages.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  public  getProvinces(sName: string="",force:string=""): Observable<Array<Provinces>>{
    return from(this._getProvinces(sName).then((dataProvinces: Array<Provinces>) => {
      const language=localStorage.getItem("language"); 

      dataProvinces.forEach((province: Provinces)=>{
        switch(language){
          case "en-US":
            province.namelang=province.en +' ('+ province?.region?.en+")";
          break;
          case "nl-NL":
            province.namelang=province.nl+' ('+ province?.region?.nl+")";
          break;
          case "fr-FR":
            province.namelang=province.fr+' ('+ province?.region?.fr+")";
          break;
        }
      })
      return dataProvinces;
    }))
  }
  private _getProvinces(sName: string) {
    return this.http.get(`${environment.apiBaseUrl}/combo/provinces/search?q=${sName}`).pipe(
      map((dataProvinces: ResponseApi<Array<Provinces>>) =>this.Mydata = dataProvinces.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }

  public  getCityByprovinces(provinces: Array<string>): Observable<Array<Combo>>{
    return from(this._getCityByProvinces(provinces).then((dataCities: Array<Cities>) => {
      const language=localStorage.getItem("language")
        const arrCombo:Array<Combo>=[];
      dataCities.forEach((city: Cities)=>{
        const oCombo:Combo=new Combo();
        oCombo.id=city.id
        oCombo.code=city.zip
        oCombo.nis_id=city.nis_id
        switch(language){
          case "en-US":
            oCombo.name=city.en + ' '+city.zip+ ', '+ city.province.nl
          break;
          case "nl-NL":
            oCombo.name=city.nl+ ' '+city.zip+ ', '+ city.province.nl
          break;
          case "fr-FR":
            oCombo.name=city.fr+ ' '+city.zip+ ', '+ city.province.nl
          break;
        }
        arrCombo.push(oCombo)
      })
      return arrCombo;

    }))
  }


  private _getCityByProvinces(arrProvinces: Array<string>) {
    return this.http.post(`${environment.apiBaseUrl}/city/byprovinces`,arrProvinces).pipe(
      map((data: ResponseApi< Array<Cities>>) =>  this.Mydata = data.data ))
      .toPromise()
      .catch(this.alertService.handleError);
  }


}
