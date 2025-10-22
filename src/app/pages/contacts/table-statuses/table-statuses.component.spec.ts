import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatusesComponent } from './table-statuses.component';

describe('TableStatusesComponent', () => {
  let component: TableStatusesComponent;
  let fixture: ComponentFixture<TableStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableStatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
