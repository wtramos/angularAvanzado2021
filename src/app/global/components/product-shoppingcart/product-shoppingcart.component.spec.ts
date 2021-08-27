import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShoppingcartComponent } from './product-shoppingcart.component';

describe('ProductShoppingcartComponent', () => {
  let component: ProductShoppingcartComponent;
  let fixture: ComponentFixture<ProductShoppingcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShoppingcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
