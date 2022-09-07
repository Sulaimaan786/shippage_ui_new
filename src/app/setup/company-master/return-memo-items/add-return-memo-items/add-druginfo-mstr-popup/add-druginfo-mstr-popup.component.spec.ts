import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDruginfoMstrPopupComponent } from './add-druginfo-mstr-popup.component';

describe('AddDruginfoMstrPopupComponent', () => {
  let component: AddDruginfoMstrPopupComponent;
  let fixture: ComponentFixture<AddDruginfoMstrPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDruginfoMstrPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDruginfoMstrPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
