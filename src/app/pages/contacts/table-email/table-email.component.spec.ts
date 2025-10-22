import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmailComponent } from './table-email.component';

describe('TableEmailComponent', () => {
  let component: TableEmailComponent;
  let fixture: ComponentFixture<TableEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
