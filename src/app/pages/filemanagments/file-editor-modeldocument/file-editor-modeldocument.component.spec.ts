import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditorModeldocumentComponent } from './file-editor-modeldocument.component';

describe('FileEditorModeldocumentComponent', () => {
  let component: FileEditorModeldocumentComponent;
  let fixture: ComponentFixture<FileEditorModeldocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileEditorModeldocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileEditorModeldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
