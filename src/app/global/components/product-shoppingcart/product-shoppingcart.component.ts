import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-shoppingcart',
  templateUrl: './product-shoppingcart.component.html',
  styleUrls: ['./product-shoppingcart.component.scss']
})
export class ProductShoppingcartComponent implements OnInit {
  @Input() product!: Product | undefined;

  constructor(
    public dialogRef: MatDialogRef<ProductShoppingcartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {

    this.product = {...data};
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}