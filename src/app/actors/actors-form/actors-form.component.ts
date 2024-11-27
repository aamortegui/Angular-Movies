import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActorCreationDTO, ActorDTO } from '../actors.models';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { dateCannotBeInTheFuture } from '../../shared/functions/validations';
import { InputImgComponent } from "../../shared/components/input-img/input-img.component";
import moment from 'moment';

@Component({
  selector: 'app-actors-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, InputImgComponent],
  templateUrl: './actors-form.component.html',
  styleUrl: './actors-form.component.css'
})
export class ActorsFormComponent implements OnInit{

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name:['', {validators:[Validators.required]}],
    dateOfBirth: new FormControl<Date | null>(null, {validators:[Validators.required, dateCannotBeInTheFuture()]}),
    picture: new FormControl<null | File | string>(null)
  })

  @Input()
  model?: ActorDTO;

  @Output()
  postForm = new EventEmitter<ActorCreationDTO>();

  ngOnInit(): void {
    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  getErrorMessageForName():string{

    let field = this.form.controls.name;
    if(field.hasError('required')){
      return 'The name field is required';
    }
    return '';
  }

  getErrorMessageForDateOfBirth():string{

    let field = this.form.controls.dateOfBirth;
    if(field.hasError('required')){
      return 'The date of birth field is required';
    }
    if(field.hasError('dateCannotBeInTheFuture')){
      return field.getError('dateCannotBeInTheFuture').message;
    }
    return '';
  }

  saveChanges(){
    const actor = this.form.value as ActorCreationDTO
    actor.dateOfBirth = moment(actor.dateOfBirth).toDate();
    //This validation apply in case that if the picture was not modified o edited, don't send to the server or webapi the same picture again
    if(typeof actor.picture === "string"){
      actor.picture = undefined;
    }

    this.postForm.emit(actor);
  }

  handleFileSelection(file:File){
    this.form.controls.picture.setValue(file);
  }
}
