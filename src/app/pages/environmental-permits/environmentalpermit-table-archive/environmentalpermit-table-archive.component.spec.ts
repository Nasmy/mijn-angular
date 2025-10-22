import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalpermitTableArchiveComponent } from './environmentalpermit-table-archive.component';

describe('EnvironmentalpermitTableArchiveComponent', () => {
  let component: EnvironmentalpermitTableArchiveComponent;
  let fixture: ComponentFixture<EnvironmentalpermitTableArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentalpermitTableArchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentalpermitTableArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
