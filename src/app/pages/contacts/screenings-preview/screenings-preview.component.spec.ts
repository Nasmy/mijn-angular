import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningsPreviewComponent } from './screenings-preview.component';

describe('ScreeningsPreviewComponent', () => {
  let component: ScreeningsPreviewComponent;
  let fixture: ComponentFixture<ScreeningsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningsPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreeningsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
