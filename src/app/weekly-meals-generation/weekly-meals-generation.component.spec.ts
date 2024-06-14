import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMealsGenerationComponent } from './weekly-meals-generation.component';

describe('WeeklyMealsGenerationComponent', () => {
  let component: WeeklyMealsGenerationComponent;
  let fixture: ComponentFixture<WeeklyMealsGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyMealsGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyMealsGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
