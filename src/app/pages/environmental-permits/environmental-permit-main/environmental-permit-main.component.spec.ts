import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalPermitMainComponent } from './environmental-permit-main.component';

describe('EnvironmentalPermitMainComponent', () => {
  let component: EnvironmentalPermitMainComponent;
  let fixture: ComponentFixture<EnvironmentalPermitMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentalPermitMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentalPermitMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
