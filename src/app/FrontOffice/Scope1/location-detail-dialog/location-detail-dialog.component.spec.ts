import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailDialogComponent } from './location-detail-dialog.component';

describe('LocationDetailDialogComponent', () => {
  let component: LocationDetailDialogComponent;
  let fixture: ComponentFixture<LocationDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
