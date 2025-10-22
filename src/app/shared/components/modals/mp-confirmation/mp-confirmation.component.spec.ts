import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpConfirmationComponent } from './mp-confirmation.component';

describe('MpConfirmationComponent', () => {
  let component: MpConfirmationComponent;
  let fixture: ComponentFixture<MpConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MpConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
