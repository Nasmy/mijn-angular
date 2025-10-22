import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashElementComponent } from './dash-element.component';

describe('DashElementComponent', () => {
  let component: DashElementComponent;
  let fixture: ComponentFixture<DashElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
