import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUsageComponent } from './vehicle-usage.component';

describe('VehicleUsageComponent', () => {
  let component: VehicleUsageComponent;
  let fixture: ComponentFixture<VehicleUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
