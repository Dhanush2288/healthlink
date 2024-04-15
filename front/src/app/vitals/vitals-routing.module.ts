import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitalsPage } from './vitals.page';

const routes: Routes = [
  {
    path: '',
    component: VitalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitalsPageRoutingModule {}
