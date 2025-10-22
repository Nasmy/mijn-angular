import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileObjectsComponent } from './file-objects.component';

describe('FileObjectsComponent', () => {
  let component: FileObjectsComponent;
  let fixture: ComponentFixture<FileObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileObjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
