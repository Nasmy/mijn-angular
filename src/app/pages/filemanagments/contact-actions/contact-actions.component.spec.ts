import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactActionsComponent } from './contact-actions.component';

describe('TableActionsComponent', () => {
  let component: ContactActionsComponent;
  let fixture: ComponentFixture<ContactActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
