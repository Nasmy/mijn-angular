import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Settings2faComponent } from './settings2fa.component';

describe('Settings2faComponent', () => {
  let component: Settings2faComponent;
  let fixture: ComponentFixture<Settings2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings2faComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Settings2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
