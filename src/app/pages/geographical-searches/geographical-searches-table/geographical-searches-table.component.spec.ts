import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicalSearchesTableComponent } from './geographical-searches-table.component';

describe('GeographicalSearchesTableComponent', () => {
  let component: GeographicalSearchesTableComponent;
  let fixture: ComponentFixture<GeographicalSearchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographicalSearchesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeographicalSearchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
