import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { firstLetterShouldBeUpperCase } from '../../shared/functions/validations';
import { GenreCreationDTO } from '../genres-model';
import { GenresFormComponent } from "../genres-form/genres-form.component";

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [GenresFormComponent],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.css'
})
export class CreateGenresComponent {

  router = inject(Router);

  saveChanges(genre: GenreCreationDTO){
    //Save changes    
    console.log(genre);
    this.router.navigate(['/genres']);
  }
}
