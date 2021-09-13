import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ComponentsModule } from 'src/app/global/components/Components.module';
import { FakeifDirective } from 'src/app/global/directives/fakeif.directive';

@NgModule({
  declarations: [
    HomeComponent,
    FakeifDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    ComponentsModule
  ]
})
export class HomeModule { 
  constructor(library: FaIconLibrary) {
     // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas);
  }
}
