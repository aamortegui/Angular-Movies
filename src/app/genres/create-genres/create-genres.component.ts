import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { firstLetterShouldBeUpperCase } from '../../shared/functions/validations';
import { GenreCreationDTO } from '../genres-model';
import { GenresFormComponent } from "../genres-form/genres-form.component";
import { GenresService } from '../genres.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { DisplayErrorsComponent } from "../../shared/components/display-errors/display-errors.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CreateEntityComponent } from "../../shared/components/create-entity/create-entity.component";

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [GenresFormComponent, DisplayErrorsComponent, CreateEntityComponent],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.css',
  providers:[{
    provide: CRUD_SERVICE_TOKEN, useClass: GenresService
  }]
})
export class CreateGenresComponent {

genresForm = GenresFormComponent;
}
