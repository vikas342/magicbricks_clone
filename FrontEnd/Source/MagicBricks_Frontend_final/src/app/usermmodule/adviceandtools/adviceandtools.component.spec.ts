import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceandtoolsComponent } from './adviceandtools.component';

describe('AdviceandtoolsComponent', () => {
  let component: AdviceandtoolsComponent;
  let fixture: ComponentFixture<AdviceandtoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceandtoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviceandtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
