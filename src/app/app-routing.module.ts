import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './views/payments/payments.component';
import { ReactivexComponent } from './views/reactivex/reactivex.component';

const routes: Routes = [
  { path: "", loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  { path: "home", loadChildren:() => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: "home-shoppingcart", loadChildren:() => import('./views/home-shoppingcart/home-shoppingcart.module').then(m => m.HomeShoppingcartModule) },
  { path: "payment", component: PaymentsComponent },
  { path: "reactivex", component: ReactivexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
