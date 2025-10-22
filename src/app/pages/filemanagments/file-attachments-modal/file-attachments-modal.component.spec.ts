import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentsModalComponent } from './file-attachments-modal.component';

describe('FileAttachmentsModalComponent', () => {
  let component: FileAttachmentsModalComponent;
  let fixture: ComponentFixture<FileAttachmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachmentsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAttachmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
