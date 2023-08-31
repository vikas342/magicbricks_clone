import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWhishlistComponent } from './user-whishlist.component';

describe('UserWhishlistComponent', () => {
  let component: UserWhishlistComponent;
  let fixture: ComponentFixture<UserWhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWhishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
