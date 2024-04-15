/* eslint-disable @angular-eslint/use-lifecycle-interface */
// login.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/services/backendservice.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private backendservices:BackendserviceService, private router: Router) {}
  ngOnInit() {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this.redirectToTab();
    }
  }
  login() {
    this.backendservices.login(this.loginData).subscribe(
      (response: any) => {
        // Handle successful login response
        console.log('Login successful:', response);

        // For demonstration purposes, assume the API returns a token
        const token = response.token;
        const user= response.user
        // Store the token in local storage or use your preferred storage mechanism
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        const us: any | null = localStorage.getItem('user');
        const users:any | null=JSON.parse(us);

        // Get the user's role from local storage
      const expectedRole = 0
      const userRoleString: any | null = users.role_id
      if (userRoleString === 1) {
        this.router.navigate(['/tabs/tab2']); // Replace 'tab1' with the desired tab route for Admin
      } else if (userRoleString === 2) {
        this.router.navigate(['/tabs/tab1']); // Replace 'tab2' with the desired tab route for User
      } else if (userRoleString === 2) {
        this.router.navigate(['/tabs/tab3']); // Replace 'tab1' or 'tab2' with the desired tab route for the specific role
      }
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
}
private redirectToTab() {
  const userRoleString: any | null = JSON.parse(localStorage.getItem('user') || '').role_id;

  if (userRoleString === 1) {
    this.router.navigate(['/tabs/tab2']); // Replace 'tab2' with the desired tab route for Admin
  } else if (userRoleString === 2) {
    this.router.navigate(['/tabs/tab1']); // Replace 'tab1' with the desired tab route for User
  } else if (userRoleString === 3) {
    this.router.navigate(['/tabs/tab3']); // Replace 'tab3' with the desired tab route for the specific role
  }
}}
