import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanagmentIndividualComponent } from './filemanagment-individual.component';

describe('FilemanagmentIndividualComponent', () => {
  let component: FilemanagmentIndividualComponent;
  let fixture: ComponentFixture<FilemanagmentIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilemanagmentIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilemanagmentIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
