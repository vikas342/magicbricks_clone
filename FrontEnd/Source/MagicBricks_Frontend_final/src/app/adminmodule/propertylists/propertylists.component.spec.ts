import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertylistsComponent } from './propertylists.component';

describe('PropertylistsComponent', () => {
  let component: PropertylistsComponent;
  let fixture: ComponentFixture<PropertylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertylistsComponent]
    });
    fixture = TestBed.createComponent(PropertylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
