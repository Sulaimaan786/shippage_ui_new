import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandscapeLoaderComponent } from './landscape-loader.component';

describe('LandscapeLoaderComponent', () => {
  let component: LandscapeLoaderComponent;
  let fixture: ComponentFixture<LandscapeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandscapeLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandscapeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
