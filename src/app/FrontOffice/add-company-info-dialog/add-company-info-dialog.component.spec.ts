import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyInfoDialogComponent } from './add-company-info-dialog.component';

describe('AddCompanyInfoDialogComponent', () => {
  let component: AddCompanyInfoDialogComponent;
  let fixture: ComponentFixture<AddCompanyInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCompanyInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCompanyInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
