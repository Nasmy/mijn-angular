import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiscoreComponent } from './mobiscore.component';

describe('MobiscoreComponent', () => {
  let component: MobiscoreComponent;
  let fixture: ComponentFixture<MobiscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobiscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
