import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MovieDto } from '../movies.models';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapComponent } from "../../shared/components/map/map.component";
import { Coordinate } from '../../shared/components/map/Coordinate.model';
import { RatingService } from '../../rating/rating.service';
import Swal from 'sweetalert2';
import { RatingComponent } from "../../shared/components/rating/rating.component";

@Component({
  selector: 'app-movie-details',
  imports: [LoadingComponent, MatChipsModule, RouterLink, MapComponent, RatingComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent  implements OnInit {

  @Input({transform: numberAttribute})
  id!: number;
  movie!: MovieDto;
  trailerURL!: SafeResourceUrl;
  sanitizer = inject(DomSanitizer);
  movieService = inject(MoviesService);
  ratingService = inject(RatingService);
  coordinates: Coordinate[] = [];

  ngOnInit(): void {
    this.movieService.getById(this.id).subscribe(movie => {
      this.movie = movie;
      movie.releaseDate = new Date(movie.releaseDate);
      this.trailerURL = this.transformYoutubeURLToEmbedURL(movie.trailer);
      if(movie.theaters){
        this.coordinates = movie.theaters.map(theater => {
          return {latitude: theater.latitude, longitude: theater.longitude, text: theater.name};
        });
      }
    })
  }

  transformYoutubeURLToEmbedURL(url: string): SafeResourceUrl | string{
    if(!url){
      return '';      
    }
    //At this point, we should split the URL (like this one: https://www.youtube.com/watch?v=kyFrCYIEjlo) to get the video ID
    let videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition !== -1){
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  rate(rate: number){
    this.ratingService.rate(this.id, rate).subscribe(() =>{
      Swal.fire('Successful', 'Your rate has been received', 'success');
    });
  }

}
