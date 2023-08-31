import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateGuideComponent } from './realestate-guide.component';

describe('RealestateGuideComponent', () => {
  let component: RealestateGuideComponent;
  let fixture: ComponentFixture<RealestateGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealestateGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealestateGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
