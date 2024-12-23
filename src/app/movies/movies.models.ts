import { ActorAutoCompleteDto } from "../actors/actors.models";

export interface MovieDto{
    id: number,
    title: string;
    releaseDate: Date;
    trailer: string;
    poster?: string; 
    genresIds? : number[];
    theatersIds? : number[];
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