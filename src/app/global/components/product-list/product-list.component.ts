import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() product!: Product | undefined;
  @Output() readonly edit = new EventEmitter();
  @Output() readonly delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}