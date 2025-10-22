import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalRequirementsComponent } from './minimal-requirements.component';

describe('MinimalRequirementsComponent', () => {
  let component: MinimalRequirementsComponent;
  let fixture: ComponentFixture<MinimalRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimalRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
