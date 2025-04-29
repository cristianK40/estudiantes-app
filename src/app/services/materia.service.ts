import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  readonly baseUrl = 'https://bwz1pfmx-7115.use2.devtunnels.ms/api/Materias';

  constructor(private http: HttpClient) {}

  getMaterias(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}

