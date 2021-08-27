import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  // { path: "home", loadChildren:() => import('./views/home/home.module').then(m => m.HomeModule) }
  { path: "home-shoppingcart", loadChildren:() => import('./views/home-shoppingcart/home-shoppingcart.module').then(m => m.HomeShoppingcartModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
