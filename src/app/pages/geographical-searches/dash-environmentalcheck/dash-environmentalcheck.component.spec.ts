import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEnvironmentalcheckComponent } from './dash-environmentalcheck.component';

describe('DashEnvironmentalcheckComponent', () => {
  let component: DashEnvironmentalcheckComponent;
  let fixture: ComponentFixture<DashEnvironmentalcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEnvironmentalcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEnvironmentalcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
