import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpropComponent } from './editprop.component';

describe('EditpropComponent', () => {
  let component: EditpropComponent;
  let fixture: ComponentFixture<EditpropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
