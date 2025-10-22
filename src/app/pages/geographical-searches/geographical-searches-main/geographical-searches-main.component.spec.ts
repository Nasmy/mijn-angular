import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicalSearchesMainComponent } from './geographical-searches-main.component';

describe('GeographicalSearchesMainComponent', () => {
  let component: GeographicalSearchesMainComponent;
  let fixture: ComponentFixture<GeographicalSearchesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographicalSearchesMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeographicalSearchesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
