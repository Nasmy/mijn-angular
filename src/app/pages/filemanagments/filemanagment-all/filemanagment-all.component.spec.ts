import { ComponentFixture, TestBed } from '@angular/core/testing';


import { FilemanagmentAllComponent } from './filemanagment-all.component';

describe('FilemanagmentAllComponent', () => {
  let component: FilemanagmentAllComponent;
  let fixture: ComponentFixture<FilemanagmentAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilemanagmentAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilemanagmentAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
