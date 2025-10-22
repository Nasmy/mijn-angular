import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContactsComponent } from './file-contacts.component';

describe('FileContactsComponent', () => {
  let component: FileContactsComponent;
  let fixture: ComponentFixture<FileContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
