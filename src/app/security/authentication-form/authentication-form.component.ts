import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentialsDTO } from '../security.models';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authentication-form',
  imports: [MatButtonModule,RouterLink,MatFormField,ReactiveFormsModule, MatInputModule],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email:['',{validators:[Validators.required, Validators.email]}],
    password:['',{validators:[Validators.required]}]
  })

  @Input({required: true})
  title!: string;

  @Output()
  postForm = new EventEmitter<UserCredentialsDTO>();

  getErrorMessagesForEmail(): string{
    let field = this.form.controls.email;

    if(field.hasError('required')){
      return 'The field Email is required';
    }

    if(field.hasError('email')){
      return 'The Email is not valid';
    }

    return '';
  }

  getErrorMessagesForPassword(): string{
    let field = this.form.controls.password;

    if(field.hasError('required')){
      return 'The field Password is required';
    }

    if(field.hasError('password')){
      return 'The Password is not valid';
    }

    return '';
  }

  saveChanges(){
    const credentials = this.form.value as UserCredentialsDTO;
    this.postForm.emit(credentials);
  }
}
