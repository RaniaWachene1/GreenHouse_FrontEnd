import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalGasModalComponent } from './natural-gas-modal.component';

describe('NaturalGasModalComponent', () => {
  let component: NaturalGasModalComponent;
  let fixture: ComponentFixture<NaturalGasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaturalGasModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaturalGasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
