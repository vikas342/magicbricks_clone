import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomdationsComponent } from './recomdations.component';

describe('RecomdationsComponent', () => {
  let component: RecomdationsComponent;
  let fixture: ComponentFixture<RecomdationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomdationsComponent]
    });
    fixture = TestBed.createComponent(RecomdationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
