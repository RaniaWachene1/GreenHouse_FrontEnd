import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesAddComponent } from './vehicles-add.component';

describe('VehiclesAddComponent', () => {
  let component: VehiclesAddComponent;
  let fixture: ComponentFixture<VehiclesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
