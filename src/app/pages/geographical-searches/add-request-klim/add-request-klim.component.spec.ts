import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestKlimComponent } from './add-request-klim.component';

describe('AddRequestKlimComponent', () => {
  let component: AddRequestKlimComponent;
  let fixture: ComponentFixture<AddRequestKlimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequestKlimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRequestKlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
