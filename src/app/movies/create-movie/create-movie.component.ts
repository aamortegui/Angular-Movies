import { Component, inject } from '@angular/core';
import { MovieCreationDto } from '../movies.models';
import { MoviesFormComponent } from "../movies-form/movies-form.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { ActorAutoCompleteDto } from '../../actors/actors.models';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions/extractErrors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [MoviesFormComponent, LoadingComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {

  nonSelectedGenres: MultipleSelectorDTO[] =[];
  selectedGenres: MultipleSelectorDTO[] = [];
  nonSelectedTheaters: MultipleSelectorDTO[] =[];
  selectedTheaters: MultipleSelectorDTO[] = [];
  selectedActors: ActorAutoCompleteDto[] = [];
  
  moviesService = inject(MoviesService);
  errors: string[] = [];
  router = inject(Router);
/*in this part is used the constructor because is necessary to load information from the backend and not from angular(components)*/
  constructor(){
    this.moviesService.postGet().subscribe(model =>{
      this.nonSelectedGenres = model.genres.map(genre =>{
        return <MultipleSelectorDTO>{key: genre.id, description: genre.name}
      });
      this.nonSelectedTheaters = model.theaters.map(theater =>{
        return <MultipleSelectorDTO>{key: theater.id, description: theater.name}
      });
    });
  }

  saveChanges(movie : MovieCreationDto){
    this.moviesService.create(movie).subscribe({
      next: () =>{
        this.router.navigate(['/']);
      },
      error: err =>{
        const error = extractErrors(err);
        this.errors = error;
      }
    })
  }
}
