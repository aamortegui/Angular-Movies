import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TheaterCreationDto, TheaterDto } from '../theaters.models';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/Coordinate.model';

@Component({
  selector: 'app-theaters-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, MapComponent],
  templateUrl: './theaters-form.component.html',
  styleUrl: './theaters-form.component.css'
})
export class TheatersFormComponent implements OnInit{

  @Input()
  model?:TheaterDto;

  initialCoordinate: Coordinate[] =[];

  @Output()
  postForm = new EventEmitter<TheaterCreationDto>();

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name:['', {validators:[Validators.required]}],
    coordinate: new FormControl<Coordinate | null>(null,{validators:[Validators.required]})
  })

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
      const coordinate : Coordinate ={latitud: this.model.latitude, longitude: this.model.longitude};
      this.form.controls.coordinate.setValue(coordinate);
      this.initialCoordinate.push(coordinate);
    }

  }

  getErrorMessageForName():string{

    let field = this.form.controls.name;
    if(field.hasError('required')){
      return 'The name field is required';
    }
    return '';
  }
  handleCoordinateSelection(coordinate:Coordinate){
    this.form.controls.coordinate.setValue(coordinate);
  }
  saveChanges(){
    const theater = this.form.value as TheaterCreationDto;
    theater.latitude = this.form.controls.coordinate.value?.latitud as number;
    theater.longitude = this.form.controls.coordinate.value?.longitude as number;

    this.postForm.emit(theater);
  }
}


