import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectEncodingOptions } from 'fs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  readonly baseUrl = "http://localhost:5137/api/Estudiante"
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any>
  {
    return this.http.get(this.baseUrl);
  }
  getEstudianteId(id: number):Observable<any>
  {
    return this.http.get(this.baseUrl+"/"+`${id}`);
  }
  getEstudiantesMateria(id: number):Observable<any>
  {
    return this.http.get(this.baseUrl+"/"+"editar"+"/"+`${id}`);
  }
  crearEstudiante(estudiante: any): Observable<any> {
    return this.http.post(this.baseUrl, estudiante);
  }
  actualizarEstudiante(id:number,estudiante: any): Observable<any>
  {
    return this.http.put(this.baseUrl+"/modificar/"+`${id}`, estudiante);
  }
  eliminarEstudiante(id:number):Observable<any>
  {
    return this.http.delete(this.baseUrl+"/"+`${id}`);
  }
}
