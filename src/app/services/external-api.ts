import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalApiService {
  constructor(private http: HttpClient) {}
  getIngredient(): Observable<any> {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    return this.http.get(endpoint);
  }
}
