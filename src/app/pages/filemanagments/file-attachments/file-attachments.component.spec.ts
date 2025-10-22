import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentsComponent } from './file-attachments.component';

describe('FileAttachmentsComponent', () => {
  let component: FileAttachmentsComponent;
  let fixture: ComponentFixture<FileAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
