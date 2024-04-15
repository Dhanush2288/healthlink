/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendserviceService } from 'src/app/services/backendservice.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
  orderForm: FormGroup;
  fuelTypes: { [key: string]: string } = {
    '0': 'Petrol',
    '1': 'Diesel',
    '2': 'Gas'
  };
    @ViewChild('map', { static: false }) mapElement: any; // Replace 'googleMap' with the actual reference used in your google-map component

  private marker: google.maps.Marker | null = null;
   us: any | null = localStorage.getItem('user');
   users:any | null=JSON.parse(this.us);

  constructor(
    private backendservices: BackendserviceService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      route_name: ['', Validators.required],
      fuel_type_id: [null, Validators.required],
      user_id:"",
      provider_id:"",
      total_cost:''
    });
  }

  ngOnInit(): void {

    // Call initMap directly
    this.initMap();
    this.getCurrentLocation();
    this.getorderdetails()

  }
  getFuelTypeKeys() {
    return Object.keys(this.fuelTypes);
  }
  getorderdetails(){
    let params = new HttpParams();
    const id = this.route.snapshot.params['id'];

    if (id) {
      params = params.set('price_id', id);
    }
    this.backendservices.getprices(params).subscribe((response: any) => {
      console.log(response.result[0]);
    // Patch the form with the response data
    var result= response.result[0]
    this.orderForm.patchValue({
      fuel_type_id: result.fuel_type_id,
      user_id:this.users.user_id ,
      provider_id: result.provider_id,
      total_cost:result.price,

    });
    console.log(this.orderForm.value)
    });
  }

  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 15;
   redMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';


  initMap(): void {
    if (!this.mapElement || !this.mapElement.googleMap) {
      return;
    }

    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom,
    };


    if (this.marker) {
      this.marker.setPosition(this.center);
    }else{ this.marker = new google.maps.Marker({
      position: this.center,
      map: this.mapElement.googleMap,
      title: 'Delivery Location',
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',

    });}


    // Update the form control with the marker position on dragend
    this.marker.addListener('dragend', (markerEvent: any) => {
      this.ngZone.run(() => {
        this.orderForm.controls['route_name'].setValue(
          `${markerEvent.latLng.lat()}, ${markerEvent.latLng.lng()}`
        );
      });
    });
  }
  create(){
    this.backendservices.createorder(this.orderForm.value).subscribe(
      (response: any) => {

        console.log(response)
        this.router.navigate(['/track-order']);
      })

  }
  getCurrentLocation(): void {

    console.log(navigator.geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.zoom = 15; // Set a higher zoom level for better visibility
          if (this.marker) {
            this.marker.setPosition(this.center);
          }else{ this.marker = new google.maps.Marker({
            position: this.center,
            map: this.mapElement.googleMap,
            title: 'Delivery Location',
            draggable: true,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',

          });}

          this.ngZone.run(() => {
            this.orderForm.controls['route_name'].setValue(
              `${this.center.lat}, ${this.center.lng}`
            );
          });
          console.log('====================================');
          console.log(this.marker);
          console.log('====================================');

          this.initMap(); // Initialize the map with the current location
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(this.orderForm.value,"orderForm")
    if (event.latLng != null) {
      console.log('Map Element:', this.mapElement.googleMap);
      console.log('Event LatLng:', event.latLng);

      this.center = event.latLng.toJSON();

      // Update the delivery location in the form
      this.ngZone.run(() => {
        this.orderForm.controls['route_name'].setValue(
          `${this.center.lat}, ${this.center.lng}`
        );
      });
console.log(this.marker,"this.marker");

      // Create or update the marker
      if (this.marker) {
        this.marker.setPosition(event.latLng);
      } else {
        this.marker = new google.maps.Marker({
          position: event.latLng,
          map: this.mapElement.googleMap,  // <-- Potential issue here
          title: 'Delivery Location',
          draggable: true,
          icon: this.redMarkerIcon, // Set the red marker icon

        });



        // Update the form control with the marker position on dragend
        this.marker.addListener('dragend', (markerEvent: any) => {
          this.ngZone.run(() => {
            this.orderForm.controls['route_name'].setValue(
              `${markerEvent.latLng.lat()}, ${markerEvent.latLng.lng()}`
            );
          });
        });
      }
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.zoom = 15; // Set a higher zoom level for better visibility
    }
  }
}
