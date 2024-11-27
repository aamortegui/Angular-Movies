import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstLetterShouldBeUpperCase } from '../../shared/functions/validations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { GenreCreationDTO, GenreDTO } from '../genres-model';

@Component({
  selector: 'app-genres-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './genres-form.component.html',
  styleUrl: './genres-form.component.css'
})
export class GenresFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name:['', {validators:[Validators.required, firstLetterShouldBeUpperCase()]}] //This array represent the default value for the field in the html template
  });
  
  @Input()
  model?:GenreDTO;

  @Output()
  postForm = new EventEmitter<GenreCreationDTO>();

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  getErrorMessageForName() : string{

    let field = this.form.controls.name;
    if(field.hasError('required')){
      return "The name field is required";
    }
    if(field.hasError('firstLetterShouldBeUpperCase')){
      return field.getError('firstLetterShouldBeUpperCase').message;
    }

    return "";
  }

  saveChanges(){
    //Save changes
    const genre = this.form.value as GenreCreationDTO;
    this.postForm.emit(genre);
  }
}
