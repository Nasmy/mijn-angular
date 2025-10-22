import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableopenRemoteComponent } from './tableopen-remote.component';

describe('TableopenRemoteComponent', () => {
  let component: TableopenRemoteComponent;
  let fixture: ComponentFixture<TableopenRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableopenRemoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableopenRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
