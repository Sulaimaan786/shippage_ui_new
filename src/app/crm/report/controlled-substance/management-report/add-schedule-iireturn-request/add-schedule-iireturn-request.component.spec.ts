import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleIIReturnRequestComponent } from './add-schedule-iireturn-request.component';

describe('AddScheduleIIReturnRequestComponent', () => {
  let component: AddScheduleIIReturnRequestComponent;
  let fixture: ComponentFixture<AddScheduleIIReturnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleIIReturnRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleIIReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
