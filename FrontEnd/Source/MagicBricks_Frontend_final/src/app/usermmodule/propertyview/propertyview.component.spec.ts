import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyviewComponent } from './propertyview.component';

describe('PropertyviewComponent', () => {
  let component: PropertyviewComponent;
  let fixture: ComponentFixture<PropertyviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
