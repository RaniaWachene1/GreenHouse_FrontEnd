import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scope3Component } from './scope3.component';

describe('Scope3Component', () => {
  let component: Scope3Component;
  let fixture: ComponentFixture<Scope3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Scope3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Scope3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
