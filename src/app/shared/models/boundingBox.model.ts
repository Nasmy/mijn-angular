import {Coordinate} from './coordinate.model'
export class BoundingBox {

  currentZoom: number  
  lowerLeft : Coordinate=new Coordinate()
  upperRight : Coordinate= new Coordinate()

  constructor(){
      this.currentZoom=0
  }


  public async zoomout(nZoom){

    this.lowerLeft.x = this.lowerLeft.x - nZoom
    this.lowerLeft.y = this.lowerLeft.y - nZoom


    this.upperRight.x = this.upperRight.x  + nZoom
    this.upperRight.y = this.upperRight.y  + nZoom
   

    this.lowerLeft.Verplaats(-nZoom,-nZoom)
    this.upperRight.Verplaats(nZoom,nZoom)


    this.currentZoom += nZoom

  }


  public normalisedBoundingBox(nInitialZoom: number, nZoomStep: number,nFinalZoom: number) 
  {
    const oResultBB : BoundingBox =new BoundingBox();
    oResultBB.lowerLeft = this.lowerLeft
    oResultBB.upperRight = this.upperRight
    
    //met nInitialZoom wordt er sowieso al een eerst maal uitgezoomd
    if (nInitialZoom != 0) 
    {
        oResultBB.zoomout(nInitialZoom)
    }

    while((this.lowerLeft.x<oResultBB.lowerLeft.x) || this.lowerLeft.y<oResultBB.lowerLeft.y ){
        oResultBB.zoomout(nZoomStep)

    }
    while((this.upperRight.x<oResultBB.upperRight.x) || this.upperRight.y<oResultBB.upperRight.y ){
        oResultBB.zoomout(nZoomStep)

    }
    
    if (nFinalZoom != 0) 
    {
        oResultBB.zoomout(nFinalZoom)
    }

    this.lowerLeft=oResultBB.lowerLeft
    this.upperRight=oResultBB.upperRight

 }

}
