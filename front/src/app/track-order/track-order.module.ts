import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackOrderPageRoutingModule } from './track-order-routing.module';

import { TrackOrderPage } from './track-order.page';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackOrderPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [TrackOrderPage]
})
export class TrackOrderPageModule {}
