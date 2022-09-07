import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardousProductsComponent } from './hazardous-products.component';

describe('HazardousProductsComponent', () => {
  let component: HazardousProductsComponent;
  let fixture: ComponentFixture<HazardousProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardousProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardousProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
