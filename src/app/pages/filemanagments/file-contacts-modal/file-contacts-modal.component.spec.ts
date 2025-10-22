import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContactsModalComponent } from './file-contacts-modal.component';

describe('FileContactsModalComponent', () => {
  let component: FileContactsModalComponent;
  let fixture: ComponentFixture<FileContactsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileContactsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
