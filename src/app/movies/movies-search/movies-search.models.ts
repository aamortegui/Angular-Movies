export interface MoviesSearchDto{
    title: string;
    genreId: number;
    upcomingReleases: boolean;
    inTheaters: boolean;
    page: number;
    recordsPerPage: number;
}