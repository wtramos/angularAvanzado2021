import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivexComponent } from './reactivex.component';

describe('ReactivexComponent', () => {
  let component: ReactivexComponent;
  let fixture: ComponentFixture<ReactivexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
