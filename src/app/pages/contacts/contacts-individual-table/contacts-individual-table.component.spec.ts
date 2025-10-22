import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsIndividualTableComponent } from './contacts-individual-table.component'

describe('ContactsTableComponent', () => {
  let component: ContactsIndividualTableComponent;
  let fixture: ComponentFixture<ContactsIndividualTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsIndividualTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsIndividualTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
