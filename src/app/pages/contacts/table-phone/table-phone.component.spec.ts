import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePhoneComponent } from './table-phone.component';

describe('TablePhoneComponent', () => {
  let component: TablePhoneComponent;
  let fixture: ComponentFixture<TablePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePhoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
