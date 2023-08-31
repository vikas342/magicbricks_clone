import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermoduleStructureComponent } from './usermodule-structure.component';

describe('UsermoduleStructureComponent', () => {
  let component: UsermoduleStructureComponent;
  let fixture: ComponentFixture<UsermoduleStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermoduleStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermoduleStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
