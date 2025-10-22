import { Component, ViewChild } from '@angular/core';
import { MapViewerComponent } from "../map-viewer/map-viewer.component";
import { EnvironmentalpermitTableComponent } from '../environmentalpermit-table/environmentalpermit-table.component';
import Point from '@arcgis/core/geometry/Point';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EnvironmentalpermitTableArchiveComponent } from "../environmentalpermit-table-archive/environmentalpermit-table-archive.component";
import { CommonModule } from '@angular/common';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-environmental-permit-main',
  standalone: true,
  imports: [NzSegmentedModule, CommonModule, NzTabsModule, MapViewerComponent, EnvironmentalpermitTableComponent,EnvironmentalpermitTableArchiveComponent],
  templateUrl: './environmental-permit-main.component.html',
  styleUrl: './environmental-permit-main.component.scss'
})
export class EnvironmentalPermitMainComponent {
  selectedTabIndex = 0;
  @ViewChild(MapViewerComponent)   mapViewerComponent!: MapViewerComponent;
  @ViewChild('activeTable') activeTable!: EnvironmentalpermitTableComponent;
  @ViewChild('archiveTable') archiveTable!: EnvironmentalpermitTableArchiveComponent;
 options = [];
  constructor(
    private translateService: TranslateService
  ) 
  { 
    this.options=[this.translateService.instant('Active'), this.translateService.instant('Archive')];
  }


  
  
  focusOnPoint(point: Point) {
    // Emit the focus point to the map viewer
    this.mapViewerComponent.FocusToPoint(point);
  }



handleValueChange(e:  number): void {  
  this.selectedTabIndex = e;  
}

}
