import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user = {
    name: 'Kiddo',
    location: 'NYC',
    phone: '9843000012',
    region: 'USA',
    postalCode: 'NSW (44600)',
    profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg', // Replace with your image path
  };


  constructor() { }

  ngOnInit() {
  }

}
