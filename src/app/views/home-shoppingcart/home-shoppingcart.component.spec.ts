import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShoppingcartComponent } from './home-shoppingcart.component';

describe('HomeShoppingcartComponent', () => {
  let component: HomeShoppingcartComponent;
  let fixture: ComponentFixture<HomeShoppingcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShoppingcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
