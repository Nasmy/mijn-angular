import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapakeyBasicComponent } from './capakey-basic.component';

describe('CapakeyBasicComponent', () => {
  let component: CapakeyBasicComponent;
  let fixture: ComponentFixture<CapakeyBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapakeyBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapakeyBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
