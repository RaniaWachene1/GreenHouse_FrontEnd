import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityUsageAddComponent } from './electricity-usage-add.component';

describe('ElectricityUsageAddComponent', () => {
  let component: ElectricityUsageAddComponent;
  let fixture: ComponentFixture<ElectricityUsageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectricityUsageAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectricityUsageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
