import { Component, Input, numberAttribute } from '@angular/core';
import { TheaterCreationDto, TheaterDto } from '../theaters.models';
import { TheatersFormComponent } from "../theaters-form/theaters-form.component";

@Component({
  selector: 'app-edit-theater',
  standalone: true,
  imports: [TheatersFormComponent],
  templateUrl: './edit-theater.component.html',
  styleUrl: './edit-theater.component.css'
})
export class EditTheaterComponent {
  @Input({transform:numberAttribute})
  id!:number;

  model: TheaterDto = {name:'Acropolis', id:1, latitude:4.602358977858119, longitude:-74.11484252993566}

  saveChanges(theater: TheaterCreationDto){
    console.log('editing the theater', theater);
  }
}
