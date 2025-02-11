import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GenreDTO } from '../../genres/genres-model';
import { MoviesListComponent } from "../movies-list/movies-list.component";
import { MoviesSearchDto } from './movies-search.models';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { GenresService } from '../../genres/genres.service';
import { MovieDto } from '../movies.models';
import { MoviesService } from '../movies.service';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatCheckboxModule, MoviesListComponent, MatPaginatorModule],
  templateUrl: './movies-search.component.html',
  styleUrl: './movies-search.component.css'
})
export class MoviesSearchComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  location = inject(Location);
  genresService = inject(GenresService);
  moviesService = inject(MoviesService);
  pagination: PaginationDTO ={page: 1, recordsPerPage: 5};
  totalRecordsCount!: number;

  ngOnInit(): void {

    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;

      this.readValuesFromURL();
      this.filterMovies(this.form.value as MoviesSearchDto);
      this.form.valueChanges
      .pipe(
        //pipe and debounceTime are used to avoid making a request to the server every time the user types a letter
        debounceTime(500)
      )
      .subscribe(values => {        
        this.filterMovies(values as MoviesSearchDto);
        this.writeParametersInTheUrl();
      });  
    })  
  }

  readValuesFromURL(){
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      let object: any ={}
      if(params.title){
        object.title = params.title;
      }
      if(params.genreId){
        object.genreId = Number(params.genreId);
      }
      if(params.upcomingReleases){
        object.upcomingReleases = params.upcomingReleases;
      }
      if(params.inTheaters){
        object.inTheaters = params.inTheaters;
      }

      this.form.patchValue(object);
    })
  }

  writeParametersInTheUrl(){
    let queryStrings =[];

    const valuesOfForm = this.form.value as MoviesSearchDto;

    if(valuesOfForm.title){
      queryStrings.push(`title=${encodeURIComponent(valuesOfForm.title)}`);
    }
    if(valuesOfForm.genreId !== 0){
      queryStrings.push(`genreId=${valuesOfForm.genreId}`);
    }
    if(valuesOfForm.upcomingReleases){
      queryStrings.push(`upcomingReleases=${valuesOfForm.upcomingReleases}`);
    }
    if(valuesOfForm.inTheaters){
      queryStrings.push(`inTheaters=${valuesOfForm.inTheaters}`);
    }

    this.location.replaceState('movies/search', queryStrings.join('&'));
  }

  filterMovies(values : MoviesSearchDto){
    values.page = this.pagination.page;
    values.recordsPerPage = this.pagination.recordsPerPage;
    this.moviesService.filter(values).subscribe(response =>{
      this.movies = response.body as MovieDto[];
      const header = response.headers.get('total-records-count') as string;
      this.totalRecordsCount = parseInt(header,10);      
    });
  }

  handlePagination(data: PageEvent){
    this.pagination ={ page: data.pageIndex + 1, recordsPerPage: data.pageSize};
    this.filterMovies(this.form.value as MoviesSearchDto);
  }

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title:'',
    genreId:0,
    upcomingReleases:false,
    inTheaters:false
  })

  genres!: GenreDTO[];
   
  movies! : MovieDto[];

  
  clear(){
    this.form.patchValue({
      title:'',
      genreId:0,
      upcomingReleases:false,
      inTheaters:false
    })
  }
}
