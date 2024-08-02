import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUsageModelComponent } from './vehicle-usage-model.component';

describe('VehicleUsageModelComponent', () => {
  let component: VehicleUsageModelComponent;
  let fixture: ComponentFixture<VehicleUsageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleUsageModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleUsageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
