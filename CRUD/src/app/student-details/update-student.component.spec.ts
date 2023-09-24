import { ComponentFixture, TestBed } from '@angular/core/testing';

import { studentDetailsComponent } from './update-student.component';

describe('studentDetailsComponent', () => {
  let component: studentDetailsComponent;
  let fixture: ComponentFixture<studentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ studentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(studentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
