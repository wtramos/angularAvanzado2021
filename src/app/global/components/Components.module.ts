import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from 'ngx-lottie';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from './loader/loader.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListShoppingcartComponent } from './product-list-shoppingcart/product-list-shoppingcart.component';
import { ProductShoppingcartComponent } from './product-shoppingcart/product-shoppingcart.component';

export function playerFactory(){
    return import('lottie-web');
  }

@NgModule({
  declarations: [
    LoaderComponent,
    ProductComponent,
    ProductListComponent,
    ProductListShoppingcartComponent,
    ProductShoppingcartComponent  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    LottieModule.forRoot({
        player: playerFactory
      }),
  ],
  exports:[
      LoaderComponent,
      ProductComponent,
      ProductListComponent,
      ProductListShoppingcartComponent
  ]
})
export class ComponentsModule { }
