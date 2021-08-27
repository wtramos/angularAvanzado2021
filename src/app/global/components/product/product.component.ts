import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  action:string;
  local_data:any;
  product: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product) {

    this.local_data = {...data};
    this.action = this.local_data.action;
    this.product = new FormGroup({
      "brand": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
      "amount": new FormControl('', Validators.required),
      "currencyType": new FormControl('', Validators.required)
    });
    if (this.action == 'Product Registration'){
      this.product.controls.brand.setValue('');
      this.product.controls.name.setValue('');
      this.product.controls.description.setValue('');
      this.product.controls.image.setValue('');
      this.product.controls.amount.setValue(0);
      this.product.controls.currencyType.setValue('');
    } else if (this.action == 'Product Update' || this.action == 'Product Delete'){
      this.product.controls.brand.setValue(data.brand);
      this.product.controls.name.setValue(data.name);
      this.product.controls.description.setValue(data.description);
      this.product.controls.image.setValue(data.image);
      this.product.controls.amount.setValue(data.price.amount);
      this.product.controls.currencyType.setValue(data.price.currencyType);
      console.log(data);
    }
  }

  ngOnInit(): void {
  }

  doAction(){
    if (this.product.invalid){
      return;
    }
    this.dialogRef.close({event:this.action,data:this.product.value});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}