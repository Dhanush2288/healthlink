import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FitserviceService } from 'src/app/services/fitservice.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.page.html',
  styleUrls: ['./vitals.page.scss'],
})

export class VitalsPage implements OnInit {

  constructor(private authService: FitserviceService,private http: HttpClient,private route: ActivatedRoute) { }
  private clientSecret='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'
  private clientId = '424503699626-m0i5m711lp2ulhmdf5efr597dq32rfjo.apps.googleusercontent.com';
  private authScope = 'https://www.googleapis.com/auth/fitness.body.read';
  private discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'];

  accessToken: any
  user: any = null;

  ngOnInit() {
    GoogleAuth.initialize({
      clientId: '424503699626-m0i5m711lp2ulhmdf5efr597dq32rfjo.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

  }


  async signInWithGoogle() {
    try {
      const googleUser = await GoogleAuth.signIn();
      console.log('Google User:', googleUser);
      this.user =  googleUser
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }
}



