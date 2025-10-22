import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFocusComponent } from './table-focus.component';

describe('TableFocusComponent', () => {
  let component: TableFocusComponent;
  let fixture: ComponentFixture<TableFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFocusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
