import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootprintAnalyticsComponent } from './footprint-analytics.component';

describe('FootprintAnalyticsComponent', () => {
  let component: FootprintAnalyticsComponent;
  let fixture: ComponentFixture<FootprintAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FootprintAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FootprintAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
