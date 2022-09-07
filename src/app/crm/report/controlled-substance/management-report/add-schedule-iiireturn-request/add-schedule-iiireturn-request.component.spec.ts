import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleIIIReturnRequestComponent } from './add-schedule-iiireturn-request.component';

describe('AddScheduleIIIReturnRequestComponent', () => {
  let component: AddScheduleIIIReturnRequestComponent;
  let fixture: ComponentFixture<AddScheduleIIIReturnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleIIIReturnRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleIIIReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
