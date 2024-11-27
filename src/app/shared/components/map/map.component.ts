import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import {LeafletModule} from '@bluehalo/ngx-leaflet'
import { Coordinate } from './Coordinate.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  @Input()
  initialCoordinates: Coordinate[] = [];
  @Output()
  coordinateSelected = new EventEmitter<Coordinate>();

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map(value => {
      return marker([value.latitud,value.longitude], this.markerOptions);
    })
  }


  markerOptions ={
    icon:icon({
      iconSize:[25,41],
      iconAnchor:[13,41],
      iconUrl:'assets/marker-icon.png',
      iconRetinaUrl:'assets/marker-icon-2x.png',
      shadowUrl:'assets/marker-shadow.png'
    })
  }
  options ={
    layers:[
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:18,
        attribution:'...'
      })
    ],
    zoom:14,
    center:latLng(4.605645820161022, -74.10648830629728)
  }

  layers: Marker<any>[] = [];

  handleClick(event: LeafletMouseEvent){
    const latitud = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({latitud,longitude});

    this.layers =[];
    this.layers.push(marker([latitud, longitude], this.markerOptions));
    this.coordinateSelected.emit({latitud,longitude});
  }
}
