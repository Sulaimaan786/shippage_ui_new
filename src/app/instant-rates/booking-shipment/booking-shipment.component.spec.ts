import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingShipmentComponent } from './booking-shipment.component';

describe('BookingShipmentComponent', () => {
  let component: BookingShipmentComponent;
  let fixture: ComponentFixture<BookingShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
