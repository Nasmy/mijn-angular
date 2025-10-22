import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningsListComponent } from './screenings-list.component';

describe('ScreeningsListComponent', () => {
  let component: ScreeningsListComponent;
  let fixture: ComponentFixture<ScreeningsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreeningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
