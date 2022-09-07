import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsReturnablePopUpComponent } from './is-returnable-pop-up.component';

describe('IsReturnablePopUpComponent', () => {
  let component: IsReturnablePopUpComponent;
  let fixture: ComponentFixture<IsReturnablePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsReturnablePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsReturnablePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
