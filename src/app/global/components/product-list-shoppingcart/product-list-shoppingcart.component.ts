import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-product-list-shoppingcart',
  templateUrl: './product-list-shoppingcart.component.html',
  styleUrls: ['./product-list-shoppingcart.component.scss']
})
export class ProductListShoppingcartComponent implements OnInit {

  @Input() product!: Product | undefined;
  @Output() readonly consult = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
