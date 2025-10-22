import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentsPreviewComponent } from './file-attachments-preview.component';

describe('FileAttachmentsPreviewComponent', () => {
  let component: FileAttachmentsPreviewComponent;
  let fixture: ComponentFixture<FileAttachmentsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachmentsPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAttachmentsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
