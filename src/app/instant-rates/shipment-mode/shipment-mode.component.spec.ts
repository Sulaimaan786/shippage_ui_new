import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentModeComponent } from './shipment-mode.component';

describe('ShipmentModeComponent', () => {
  let component: ShipmentModeComponent;
  let fixture: ComponentFixture<ShipmentModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
