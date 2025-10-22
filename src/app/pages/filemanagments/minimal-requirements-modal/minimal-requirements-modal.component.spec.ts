import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalRequirementsModalComponent } from './minimal-requirements-modal.component';

describe('MinimalRequirementsModalComponent', () => {
  let component: MinimalRequirementsModalComponent;
  let fixture: ComponentFixture<MinimalRequirementsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalRequirementsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimalRequirementsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
