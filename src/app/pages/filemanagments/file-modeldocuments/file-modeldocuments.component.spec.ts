import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileModeldocumentsComponent } from './file-modeldocuments.component';

describe('FileModeldocumentsComponent', () => {
  let component: FileModeldocumentsComponent;
  let fixture: ComponentFixture<FileModeldocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileModeldocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileModeldocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
