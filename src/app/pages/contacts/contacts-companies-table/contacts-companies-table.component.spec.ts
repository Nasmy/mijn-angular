import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCompaniesTableComponent } from './contacts-companies-table.component';

describe('ContactsCompaniesTableComponent', () => {
  let component: ContactsCompaniesTableComponent;
  let fixture: ComponentFixture<ContactsCompaniesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsCompaniesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsCompaniesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
