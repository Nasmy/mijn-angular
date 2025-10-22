import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAddModeldocumentComponent } from './file-add-modeldocument.component';

describe('FileAddModeldocumentComponent', () => {
  let component: FileAddModeldocumentComponent;
  let fixture: ComponentFixture<FileAddModeldocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAddModeldocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAddModeldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
