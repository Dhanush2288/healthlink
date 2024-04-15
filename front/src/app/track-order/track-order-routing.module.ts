import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackOrderPage } from './track-order.page';

const routes: Routes = [
  {
    path: ':id',
    component: TrackOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackOrderPageRoutingModule {}
