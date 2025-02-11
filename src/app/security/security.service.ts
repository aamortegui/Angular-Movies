import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationResponseDTO, UserCredentialsDTO, UserDTO } from './security.models';
import { Observable, tap } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { buildQueryParams } from '../shared/functions/buildQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }
  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/users';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration';

  register(credentials: UserCredentialsDTO): Observable<AuthenticationResponseDTO>{
    return this.http.post<AuthenticationResponseDTO>(`${this.baseURL}/register`, credentials)
    //.pipe() es una función de RxJS (una librería muy usada en Angular y otras aplicaciones JavaScript 
    // para manejar flujos de datos asíncronos). Lo que hace es encadenar una o varias operaciones sobre 
    // un observable.Es un método que permite transformar y manejar los valores emitidos por el observable
    .pipe(
      tap(authenticationResponse => this.storeToken(authenticationResponse))
    )    
  }

  login(credentials: UserCredentialsDTO): Observable<AuthenticationResponseDTO>{
    return this.http.post<AuthenticationResponseDTO>(`${this.baseURL}/login`, credentials)
    .pipe(
      tap(authenticationResponse => this.storeToken(authenticationResponse))
    )    
  }

  makeAdmin(email:string){
    return this.http.post(`${this.baseURL}/makeadmin`, {email});
  }

  removeAdmin(email:string){
    return this.http.post(`${this.baseURL}/removeadmin`, {email});
  }

  getUsersPaginated(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>>{
    let queryParams = buildQueryParams(pagination);
    return this.http.get<UserDTO[]>(`${this.baseURL}/usersList`,{params: queryParams, observe: 'response'});
  }

  storeToken(authenticationResponse: AuthenticationResponseDTO){
    localStorage.setItem(this.keyToken, authenticationResponse.token);
    localStorage.setItem(this.keyExpiration, authenticationResponse.expiration.toString());
  }


  isLoggedIn(): boolean{
    const token = this.getJWTToken();
    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.keyExpiration)!;
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      return false;
    }

    return true;
  }

  getJWTClaim(field: string): string{
    const token = this.getJWTToken();
    if(!token){
      return '';
    }   
//atob() es una función de JavaScript que decodifica una cadena de datos que ha sido codificada en base64
//.split(.) divide la cadena en un array de 3 elementos, y [1] selecciona el segundo elemento debido a que el
//JWT tiene la siguiente estructura: header.payload.signature y necesitamos el payload.
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout(){
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }

  getJWTToken(): string | null{
    return localStorage.getItem(this.keyToken);
  }

  getRole(): string{
    const isAdmin = this.getJWTClaim('isadmin');
    if(isAdmin){
      return 'admin';
    }
    return '';
  }
}
