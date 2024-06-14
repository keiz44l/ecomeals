import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMealComponent } from './generate-meal.component';

describe('GenerateMealComponent', () => {
  let component: GenerateMealComponent;
  let fixture: ComponentFixture<GenerateMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
