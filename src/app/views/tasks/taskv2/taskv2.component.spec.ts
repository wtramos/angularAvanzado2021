import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskv2Component } from './taskv2.component';

describe('Taskv2Component', () => {
  let component: Taskv2Component;
  let fixture: ComponentFixture<Taskv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Taskv2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Taskv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
