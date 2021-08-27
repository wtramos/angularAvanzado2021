import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListShoppingcartComponent } from './product-list-shoppingcart.component';

describe('ProductListShoppingcartComponent', () => {
  let component: ProductListShoppingcartComponent;
  let fixture: ComponentFixture<ProductListShoppingcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListShoppingcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
