import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendserviceService } from 'src/app/services/backendservice.service'

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})
export class SignupPage {
  signupData = {
    name:"",
    role_id:"",
    email: '',
    password: ''
  };

  constructor(private backendservices:BackendserviceService, private router: Router) {}


  signup() {
      this.backendservices.signup(this.signupData).subscribe(
        (response: any) => {
          this.router.navigate(['/login']); // Replace 'dashboard' with your desired page
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
        }
      );
    }
}
