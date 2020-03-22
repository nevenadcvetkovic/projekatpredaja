import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';


interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string;
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //get game points where date
  getDayGamePointsDateCondition(data, limit): Observable<any> {
    let url = `${this.baseUri}/getLast/${limit}`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
  )
  }

  //Insert played day game
  insertDayGamePoints(data): Observable<any> {
    let url = `${this.baseUri}/insertDayGamePoints`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }
  //get a played game by userId and date
  getDayGamePoints(data): Observable<any> {
    let url = `${this.baseUri}/getDayGamePoints`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Insert day game
  insertDayGame(data): Observable<any> {
    let url = `${this.baseUri}/insertDayGame`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get all games
  getDayGames() {
    return this.http.get(`${this.baseUri}/getDayGames`);
  }

  //get a game
  getDayGame(data): Observable<any> {
    let url = `${this.baseUri}/getDayGame`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Insert goblet
  insertGoblet(data): Observable<any> {
    let url = `${this.baseUri}/insertGoblet`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get all goblets
  getGoblets() {
    return this.http.get(`${this.baseUri}/getGoblets`);
  }

  // Get goblet
  getGoblet(id): Observable<any> {
    let url = `${this.baseUri}/getGoblet/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Insert table55
  insertTable55(data): Observable<any> {
    let url = `${this.baseUri}/insertTable55`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get random table 55
  getRTable55() {
    return this.http.get(`${this.baseUri}/getRTable55`).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    );
  }

  //Insert into geography
  insertGeoWord(data): Observable<any> {
    let url = `${this.baseUri}/insertGeography`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }
  //check does row exist
  async getGeographyRow(data) {
    let url = `${this.baseUri}/getGeoRow`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    ).toPromise();
  }

  //Insert into geography
  async insertGeoWordSupervize(data) {
    let url = `${this.baseUri}/insertGeographyS`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    ).toPromise();
  }
  //check does row exist
  async getGeographyRowSupervized(data) {
    let url = `${this.baseUri}/getGeoRowS`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    ).toPromise()
  }
  getGeoRowsSupervized() {
    return this.http.get(`${this.baseUri}/getGeoRowsS`);
  }

  deleteGeoRowSupervized(id): Observable<any> {
    let url = `${this.baseUri}/deleteGeoSup/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Insert anagram
  insertAnagram(data): Observable<any> {
    console.log('caocao');
    let url = `${this.baseUri}/insertAnagram`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get all anagrams
  getAnagrams() {
    return this.http.get(`${this.baseUri}/getAnagrams`);
  }

  // Get anagram
  getAnagram(id): Observable<any> {
    let url = `${this.baseUri}/getAnagram/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  //check user password
  getUserByUsernamePass(data): Observable<any> {
    let url = `${this.baseUri}/login`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Get all employees
  getUsers() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  updatePassword(username, data): Observable<any> {
    let url = `${this.baseUri}/updatep/${username}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  // Delete employee
  deleteUser(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  private saveToken(token: string, name: string): void {
    localStorage.setItem(name, token);
    this.token = token;
  }

  private getToken(name: string): string {
    if (!this.token) {
      this.token = localStorage.getItem(name);
    }
    return this.token;
  }

  public getUserDetails(name: string): User {
    const token = this.getToken(name);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(name: string): boolean {
    const user = this.getUserDetails(name);
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public deleteToken(name: string) {
    this.token = '';
    window.localStorage.removeItem(name);


  }
}
