import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeShoppingcartComponent } from './home-shoppingcart.component';
import { HomeShoppingcartRoutingModule } from './home-shoppingcart.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ComponentsModule } from 'src/app/global/components/Components.module';

@NgModule({
    declarations: [
      HomeShoppingcartComponent
    ],
    imports: [
      CommonModule,
      HomeShoppingcartRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      FontAwesomeModule,
      MatButtonModule,
      MatIconModule,
      MatOptionModule,
      MatSelectModule,
      MatSnackBarModule,
      ComponentsModule,
      MatCarouselModule.forRoot(),
      MatToolbarModule
    ]
  })
  export class HomeShoppingcartModule { 
    constructor(library: FaIconLibrary) {
       // Add an icon to the library for convenient access in other components
      library.addIconPacks(fas);
    }
  }