import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { HttpParams } from '@angular/common/http';

import { BackendserviceService } from 'src/app/services/backendservice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  constructor(
    private backendservices: BackendserviceService,
    private modalController: ModalController
  ) {
    this.name = '';
  }

  orders: any = [];
  images: any = {
    1: 'assets/p.jpg',
    2: 'assets/d.png',
    3: 'assets/g.jpg'
  };  async openModal() {
    const modal = await this.modalController.create({
      component: Tab1Page, // replace with the component you want to present
      componentProps: {
        name: this.name,
      },
    });

    return await modal.present();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
  getallprices(fuelType?:any,price_id?: any) {
    let params = new HttpParams();
    if (fuelType) {
      params = params.set('fuelType', fuelType);
    }
    if (price_id) {
      params = params.set('price_id', price_id);
    }
    this.backendservices.getprices(params).subscribe((response: any) => {
      this.orders = response.result;
    });
  }

  confirm() {
    this.modalController.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  ngOnInit() {
    this.getallprices();
  }
}
