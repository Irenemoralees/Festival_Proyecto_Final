import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festival } from '../interfaces/festival';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
  private url = 'http://localhost:3000/api/festivals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const user = this.authService.getUser();
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Festival[]> {
    return this.http.get<Festival[]>(this.url, { headers: this.getAuthHeaders() });
  }

  getById(id: string): Observable<Festival> {
    return this.http.get<Festival>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  addFestival(vehicle: Festival): Observable<Festival> {
    return this.http.post<Festival>(this.url, vehicle, { headers: this.getAuthHeaders() });
  }

  updateFestival(id: string, festival: Festival): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, festival, { headers: this.getAuthHeaders() });
  }

  deleteFestival(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }
}
