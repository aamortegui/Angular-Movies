import { Component, numberAttribute, Input } from '@angular/core';
import { MovieCreationDto, MovieDto } from '../movies.models';
import { MoviesFormComponent } from "../movies-form/movies-form.component";
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { ActorAutoCompleteDto } from '../../actors/actors.models';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MoviesFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent {

  @Input({transform:numberAttribute})
  id!:number;

  model: MovieDto = {id:1, title:'Spider-Man', releaseDate: new Date('2019-07-22'), 
    trailer:'abcd', poster:'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'}

    nonSelectedGenres: MultipleSelectorDTO[] =[
      {key: 1, description:'Drama'},
      {key: 2, description:'Action'},      
    ]
  
    selectedGenres: MultipleSelectorDTO[] = [
      {key: 3, description:'Comedy'}
    ];  

    nonSelectedTheaters: MultipleSelectorDTO[] =[
      {key: 1, description:'Acropolis'}      
    ]
  
    selectedTheaters: MultipleSelectorDTO[] = [
      {key: 2, description:'Agora Mall'}
    ];

    selectedActors: ActorAutoCompleteDto[] = [
      {id:2, name:'Tom Hanks', character:'Forrest Gump', picture:'https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'}
    ];

  saveChanges(movie: MovieCreationDto){
    console.log('editing the movie', movie);
  }
  
}
