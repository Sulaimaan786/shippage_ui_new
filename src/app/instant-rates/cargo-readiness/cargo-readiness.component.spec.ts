import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoReadinessComponent } from './cargo-readiness.component';

describe('CargoReadinessComponent', () => {
  let component: CargoReadinessComponent;
  let fixture: ComponentFixture<CargoReadinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoReadinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoReadinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
