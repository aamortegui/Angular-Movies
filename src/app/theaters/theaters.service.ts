import { inject, Injectable } from '@angular/core';
import { ICRUDService } from '../shared/interfaces/ICRUDService';
import { TheaterCreationDto, TheaterDto } from './theaters.models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { environment } from '../../environments/environment';
import { buildQueryParams } from '../shared/functions/buildQueryParams';

@Injectable({
  providedIn: 'root'
})
export class TheatersService implements ICRUDService<TheaterDto, TheaterCreationDto>{

  constructor() { }

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/theaters';

  getPaginated(pagination: PaginationDTO): Observable<HttpResponse<TheaterDto[]>> {
    
    let queryParams = buildQueryParams(pagination);
    return this.http.get<TheaterDto[]>(this.baseURL, { params: queryParams, observe: 'response' });
  }
  getById(id: number): Observable<TheaterDto> {
    return this.http.get<TheaterDto>(`${this.baseURL}/${id}`);
  }
  create(entity: TheaterCreationDto): Observable<any> {
    return this.http.post(this.baseURL, entity);
  }
  update(id: number, entity: TheaterCreationDto): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, entity);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
