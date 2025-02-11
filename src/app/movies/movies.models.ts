import { ActorAutoCompleteDto } from "../actors/actors.models";
import { GenreDTO } from "../genres/genres-model";
import { TheaterDto } from "../theaters/theaters.models";

export interface MovieDto{
    id: number,
    title: string;
    releaseDate: Date;
    trailer: string;
    poster?: string; 
    genres? : GenreDTO[];
    theaters? : TheaterDto[];
    actors?: ActorAutoCompleteDto[];
    averageRate: number;
    userVote: number;
}

export interface MovieCreationDto{    
    title: string;
    releaseDate: Date;
    trailer: string;
    poster?: File; 
    genresIds? : number[];
    theatersIds? : number[];
    actors?: ActorAutoCompleteDto[];
}

export interface MoviesPostGetDTO{
    genres: GenreDTO[];
    theaters: TheaterDto[];
}

export interface MoviesPutGetDTO{
    movie: MovieDto;
    selectedGenres: GenreDTO[];
    nonSelectedGenres: GenreDTO[];
    selectedTheaters: TheaterDto[];
    nonSelectedTheaters: TheaterDto[];
    actors: ActorAutoCompleteDto[];
}

export interface LandingDTO{
    upcomingReleases: MovieDto[];
    inTheaters: MovieDto[];
}