import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FitserviceService {
  private clientId = '424503699626-m0i5m711lp2ulhmdf5efr597dq32rfjo.apps.googleusercontent.com';
  private redirectUri = 'http://localhost:8100/';
  private clientSecret='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'
  private tokenUrl = 'https://oauth2.googleapis.com/token';
  private scope = 'https://www.googleapis.com/auth/fitness.activity.read';
  private responseType = 'token';
  constructor(private http: HttpClient) { }
  authenticate(code:any): Promise<string> {
    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      code:code,
      grant_type: 'authorization_code'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.tokenUrl, this.serialize(body), { headers })
      .toPromise()
      .then(response => response.access_token)
      .catch(error => {
        console.error('Authentication error:', error);
        throw error;
      });
  }

  private serialize(obj: any): string {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
  }


  getAccessToken(): string | null {
    var a=new URLSearchParams(window.location.hash.substring(1)).get('access_token');
    console.log('====================================');
    console.log(a);
    console.log('====================================');
    return new URLSearchParams(window.location.hash.substring(1)).get('access_token');
  }

  async getSteps(accessToken: string) {
    const baseUrl = 'https://www.googleapis.com/fitness/v1/users/me/datasets:aggregate';
    const startTime = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';
    const endTime = new Date().toISOString();

    const body = {
      aggregateBy: [{
        dataTypeName: 'com.google.step_count.delta',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
      }],
      bucketByTime: { durationMillis: 86400000 }, // Daily bucket
      startTimeMillis: Date.parse(startTime),
      endTimeMillis: Date.parse(endTime),
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    try {
      const response = await this.http.post(baseUrl, body, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching steps:', error);
      throw error; // Re-throw for error handling in component
    }
  }
}
