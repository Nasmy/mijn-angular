import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAddEditComponent } from './configuration-add-edit.component';

describe('ConfigurationAddEditComponent', () => {
  let component: ConfigurationAddEditComponent;
  let fixture: ComponentFixture<ConfigurationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
