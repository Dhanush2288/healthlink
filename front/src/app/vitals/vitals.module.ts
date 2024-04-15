import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitalsPageRoutingModule } from './vitals-routing.module';

import { VitalsPage } from './vitals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalsPageRoutingModule
  ],
  declarations: [VitalsPage]
})
export class VitalsPageModule {}
