import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderPage } from './create-order.page';

const routes: Routes = [
  {
    path: ':id',
    component: CreateOrderPage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrderPageRoutingModule {}
