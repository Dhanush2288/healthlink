import { Component, OnInit } from '@angular/core';

interface Order {
  id: string;
  number: string;
  item: string;
  price: string;
  status: 'new' | 'accepted' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.page.html',
  styleUrls: ['./delivery-partner.page.scss'],
})
export class DeliveryPartnerPage implements OnInit {
  public orders: Order[] = [
    // Populate this array with your order objects
    // Example:
    { id: '001', number: '999012', item: 'Power', price: 'Rs.160', status: 'new' },
    // ... other orders
  ];
  acceptOrder(orderId: string) {
    // Implement order acceptance logic
  }

  completeOrder(orderId: string) {
    // Implement order completion logic
  }

  cancelOrder(orderId: string) {
    // Implement order cancellation logic
  }

  constructor() { }

  ngOnInit() {
  }

}
