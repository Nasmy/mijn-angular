import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaAdressComponent } from './capa-adress.component';

describe('CapaAdressComponent', () => {
  let component: CapaAdressComponent;
  let fixture: ComponentFixture<CapaAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapaAdressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapaAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
