/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendserviceService } from 'src/app/services/backendservice.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage implements OnInit {
  public order = {
    number: '999012',
    item: 'Power',
    price: 'Rs.160',
    rating: 4,
    imageUrl: 'assets/flames.jpg', // Add the path to your image
    status: 4,
  };
  @ViewChild('map', { static: false }) mapElement: any; // Replace 'googleMap' with the actual reference used in your google-map component
  orderForm: FormGroup;

  private marker: google.maps.Marker | null = null;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555,
  };
  zoom = 15;
  durationInMinutes: any;
  private secondMarker: google.maps.Marker | null = null;
  us: any | null = localStorage.getItem('user');
  users: any | null = JSON.parse(this.us);
  order_data: any;
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
      user_id: '',
      provider_id: '',
      price: '',
      total_cost: 1,
    });
  }
  redMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

  ngOnInit() {
    this.getorderdetails();
    this.initMap();

  }
  getorderdetails() {
    let params = new HttpParams();
    const id = this.route.snapshot.params['id'];;

    if (id) {
      params = params.set('order_id', id);
    }
    this.backendservices.getorder(params).subscribe((response: any) => {
      this.order_data = response.result[0];
      console.log(this.order_data);

      var coordinatesString = this.order_data.route_name;
      var coordinatesArray = coordinatesString
        .split(',')
        .map(function (coordinate: any) {
          return parseFloat(coordinate.trim());
        });

      this.center = {
        lat: coordinatesArray[0],
        lng: coordinatesArray[1],
      };

      if (this.order_data.delivery_status == 4) {
        setTimeout(() => {
          this.initMap();
        }, 5000); // 5000 milliseconds (5 seconds)
      }
    });

  }
  addSecondMarker(): void {
    var coordinatesString = this.order_data.delivery_route_loc;
      var coordinatesArray = coordinatesString
        .split(',')
        .map(function (coordinate: any) {
          return parseFloat(coordinate.trim());
        });

        const secondLocation = {
        lat: coordinatesArray[0],
        lng: coordinatesArray[1],
      };


    this.secondMarker = new google.maps.Marker({
      position: secondLocation,
      map: this.mapElement.googleMap,
      title: 'Second Location',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Set the icon for the second marker
    });
    this.getDirectionsAndTime()
  }
  private getDirectionsAndTime(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Set up directionsRenderer to display the route on the map
    directionsRenderer.setMap(this.mapElement.googleMap);

    // Set up request for directions
    const request: google.maps.DirectionsRequest = {
      origin: this.center, // Starting location
      destination: this.secondMarker?.getPosition()!, // Ending location (use ! to assert non-null)
      travelMode: google.maps.TravelMode.DRIVING, // You can change this to other travel modes
    };
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        // Display the directions on the map
        directionsRenderer.setDirections(response);
        // Get the estimated duration (in seconds)
        const durationInSeconds = response?.routes[0].legs[0]?.duration?.value || 0;

        // Convert seconds to minutes
        const durationInMinutes = Math.ceil(durationInSeconds / 60);
        this.durationInMinutes = durationInMinutes;

        console.log('Estimated Duration:', durationInMinutes, 'minutes');
      } else {
        console.error('Error getting directions:', status);
      }
    });
  }

  initMap(): void {
    console.log('====================================');
    console.log(this.mapElement);
    console.log('====================================');
    if (!this.mapElement || !this.mapElement.googleMap) {
      return;
    }
    this.addSecondMarker()

    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: 20,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#222222' }],
        },
        // Add more style rules as needed
      ],
    };

    if (this.marker) {
      this.marker.setPosition(this.center);
    } else {
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.mapElement.googleMap,
        title: 'Delivery Location',
        draggable: true,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });
    }
  }
  getCurrentLocation(): void {
    console.log(navigator.geolocation);
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
          } else {
            this.marker = new google.maps.Marker({
              position: this.center,
              map: this.mapElement.googleMap,
              title: 'Delivery Location',
              draggable: true,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            });
          }

          this.ngZone.run(() => {
            this.orderForm.controls['route_name'].setValue(
              `${this.center.lat}, ${this.center.lng}`
            );
          });
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
    this.zoom = 20;
    console.log(this.orderForm.value, 'orderForm');
    if (event.latLng != null) {
      console.log('Map Element:', this.mapElement.googleMap);
      console.log('Event LatLng:', event.latLng);

      this.center = event.latLng.toJSON();

      // Update the delivery location in the form
      this.ngZone.run(() => {});
      console.log(this.marker, 'this.marker');
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.zoom = 15; // Set a higher zoom level for better visibility
    }
  }
  // Helper function to generate an array representing the number of stars for rating
  getStarsArray(rating: number): any[] {
    return new Array(rating).fill(0).map((_, index) => index + 1);
  }

  // Additional helper function to generate the empty stars for the rating
  getEmptyStars(rating: number): any[] {
    return new Array(5 - rating).fill(0).map((_, index) => index + 1);
  }
}
