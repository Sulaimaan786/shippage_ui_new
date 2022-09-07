import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirRouteDetailsComponent } from './air-route-details.component';

describe('AirRouteDetailsComponent', () => {
  let component: AirRouteDetailsComponent;
  let fixture: ComponentFixture<AirRouteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirRouteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirRouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
