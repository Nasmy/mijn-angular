import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningsSingleComponent } from './screenings-single.component';

describe('ScreeningsSingleComponent', () => {
  let component: ScreeningsSingleComponent;
  let fixture: ComponentFixture<ScreeningsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningsSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreeningsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
