import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSummaryComponent } from './rate-summary.component';

describe('RateSummaryComponent', () => {
  let component: RateSummaryComponent;
  let fixture: ComponentFixture<RateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
