import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsActionsComponent } from './objects-actions.component';

describe('ObjectsActionsComponent', () => {
  let component: ObjectsActionsComponent;
  let fixture: ComponentFixture<ObjectsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectsActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
