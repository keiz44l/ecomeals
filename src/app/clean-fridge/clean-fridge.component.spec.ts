import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanFridgeComponent } from './clean-fridge.component';

describe('CleanFridgeComponent', () => {
  let component: CleanFridgeComponent;
  let fixture: ComponentFixture<CleanFridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleanFridgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleanFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
