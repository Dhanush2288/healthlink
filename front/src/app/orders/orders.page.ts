import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders = [
    {
      id: '999012',
      dateTime: '20-Dec-2019, 3:00 PM',
      deliveryStatus: 'Estimated Delivery on 21 Dec',
      rating: 3,
      image: '',
    },
    // ... other orders
  ];

  constructor() {}

  ngOnInit() {}

  getStars(rating:number) {
    return new Array(rating);
  }

}
