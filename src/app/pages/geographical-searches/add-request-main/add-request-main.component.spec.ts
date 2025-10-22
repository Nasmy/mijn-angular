import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestMainComponent } from './add-request-main.component';

describe('AddRequestMainComponent', () => {
  let component: AddRequestMainComponent;
  let fixture: ComponentFixture<AddRequestMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequestMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
