import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureLogRegComponent } from './structure-log-reg.component';

describe('StructureLogRegComponent', () => {
  let component: StructureLogRegComponent;
  let fixture: ComponentFixture<StructureLogRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureLogRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructureLogRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
