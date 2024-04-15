import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  private apiUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
  signup(data: any): Observable<any> {
    const credentials =data;
    return this.http.post(`${this.apiUrl}/user/signup`, credentials);
  }
  login(data: any): Observable<any> {
    const credentials =data;
    return this.http.post(`${this.apiUrl}/user/login`, credentials);
  }
  createorder(data: any): Observable<any> {
    const credentials =data;
    return this.http.post(`${this.apiUrl}/user/createorder`, credentials);
  }

  getUserRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/roles`);
  }
  getorder(data?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/getorders?${data}`);
  }
  getprices(data?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/getFuelPrices?${data}`);
  }

}
