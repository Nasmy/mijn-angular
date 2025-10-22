import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableopenLocalComponent } from './tableopen-local.component';

describe('TableopenRemoteComponent', () => {
  let component: TableopenLocalComponent;
  let fixture: ComponentFixture<TableopenLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableopenLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableopenLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
