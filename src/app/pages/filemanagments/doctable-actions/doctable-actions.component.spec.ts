import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTableActionsComponent } from './doctable-actions.component';

describe('DocTableActionComponent', () => {
  let component: DocTableActionsComponent;
  let fixture: ComponentFixture<DocTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocTableActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
