import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateOrderPageRoutingModule } from './create-order-routing.module';
import { CreateOrderPage } from './create-order.page';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreateOrderPageRoutingModule,
    GoogleMapsModule

  ],
  declarations: [CreateOrderPage]
})
export class CreateOrderPageModule {}
