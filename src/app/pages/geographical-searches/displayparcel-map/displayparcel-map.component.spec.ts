import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayparcelMapComponent } from './displayparcel-map.component';

describe('DisplayparcelMapComponent', () => {
  let component: DisplayparcelMapComponent;
  let fixture: ComponentFixture<DisplayparcelMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayparcelMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayparcelMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
