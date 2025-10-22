import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStatusActionComponent } from './documentstatus-action.component';

describe('DocumentStatusActionComponent', () => {
  let component: DocumentStatusActionComponent;
  let fixture: ComponentFixture<DocumentStatusActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentStatusActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentStatusActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
