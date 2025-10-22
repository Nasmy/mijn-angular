import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanagmentMainComponent } from './filemanagment-main.component';

describe('FilemanagmentMainComponent', () => {
  let component: FilemanagmentMainComponent;
  let fixture: ComponentFixture<FilemanagmentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilemanagmentMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilemanagmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
