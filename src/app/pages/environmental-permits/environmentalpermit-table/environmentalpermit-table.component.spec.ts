import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalpermitTableComponent } from './environmentalpermit-table.component';

describe('EnvironmentalpermitTableComponent', () => {
  let component: EnvironmentalpermitTableComponent;
  let fixture: ComponentFixture<EnvironmentalpermitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentalpermitTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentalpermitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
