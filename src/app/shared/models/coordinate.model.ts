export class Coordinate {
 x: number
 y: number

 Verplaats( nX:number, nY: number)
 {
  // nlat is numeric(*) = Val(:Lat_WGS84)
  // nlon is numeric(*) = Val(:Lon_WGS84)
   
  const   nlatLamberts :number  = this.x
  const   nlonLamberts : number= this.y
   
   //Earth’s radius, sphere
   //nStraalAarde is int = 6378137
  const nStraalAarde =  6367449
   
   
   //Coordinate offsets in radians
  const  dLat : number  = nX/nStraalAarde
 // let  dLon : number = nY/(nStraalAarde*Math.cos(Math.PI*nlat/180))
  const  dLonLamberts : number= nY/(nStraalAarde*Math.cos(Math.PI*nlatLamberts/180))
   
  this.x = nlatLamberts + dLat * 180/Math.PI
  this.y = nlonLamberts + dLonLamberts * 180/Math.PI 
   

 }
}