import { NgModule } from '@angular/core';
import { HomeShoppingcartComponent } from './home-shoppingcart.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/global/guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeShoppingcartComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeShoppingcartRoutingModule {}