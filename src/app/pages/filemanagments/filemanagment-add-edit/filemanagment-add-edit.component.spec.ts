import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanagmentAddEditComponent } from './filemanagment-add-edit.component';

describe('FilemanagmentAddEditComponent', () => {
  let component: FilemanagmentAddEditComponent;
  let fixture: ComponentFixture<FilemanagmentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilemanagmentAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilemanagmentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
