import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileModeldocumentsModalComponent } from './file-modeldocuments-modal.component';

describe('FileModeldocumentsModalComponent', () => {
  let component: FileModeldocumentsModalComponent;
  let fixture: ComponentFixture<FileModeldocumentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileModeldocumentsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileModeldocumentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
