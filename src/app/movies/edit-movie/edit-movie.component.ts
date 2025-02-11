import { Component, numberAttribute, Input, OnInit, inject } from '@angular/core';
import { MovieCreationDto, MovieDto } from '../movies.models';
import { MoviesFormComponent } from "../movies-form/movies-form.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { ActorAutoCompleteDto } from '../../actors/actors.models';
import { MoviesService } from '../movies.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MoviesFormComponent, LoadingComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent implements OnInit {

  @Input({transform:numberAttribute})
  id!:number;

  model?: MovieDto;
  nonSelectedGenres: MultipleSelectorDTO[] =[];  
  selectedGenres: MultipleSelectorDTO[] = [];  
  nonSelectedTheaters: MultipleSelectorDTO[] =[];  
  selectedTheaters: MultipleSelectorDTO[] = [];
  selectedActors: ActorAutoCompleteDto[] = [];
  errors: string[] = [];
  
  movieService = inject(MoviesService);
  router = inject(Router);

  ngOnInit(): void {
  this.movieService.putGet(this.id).subscribe(response => {
    this.model = response.movie;
    
    this.selectedGenres = response.selectedGenres.map(genre => {
      return <MultipleSelectorDTO>{key: genre.id, description: genre.name};
    });

    this.nonSelectedGenres = response.nonSelectedGenres.map(genre => {
      return <MultipleSelectorDTO>{key: genre.id, description: genre.name};
    });

    this.selectedTheaters = response.selectedTheaters.map(theater => {
      return <MultipleSelectorDTO>{key: theater.id, description: theater.name};
    });

    this.nonSelectedTheaters = response.nonSelectedTheaters.map(theater => {
      return <MultipleSelectorDTO>{key: theater.id, description: theater.name};
    });

    this.selectedActors = response.actors;
  });  
  }  

  saveChanges(movie: MovieCreationDto){
    this.movieService.update(this.id, movie).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err =>{
        const error = extractErrors(err);
        this.errors = error;
      }
    })
  }
  
}
