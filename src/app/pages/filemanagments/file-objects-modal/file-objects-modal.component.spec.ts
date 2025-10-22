import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileObjectsModalComponent } from './file-objects-modal.component';

describe('FileObjectsModalComponent', () => {
  let component: FileObjectsModalComponent;
  let fixture: ComponentFixture<FileObjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileObjectsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileObjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
