import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPreferencesComponent } from './meal-preferences.component';

describe('MealPreferencesComponent', () => {
  let component: MealPreferencesComponent;
  let fixture: ComponentFixture<MealPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealPreferencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
