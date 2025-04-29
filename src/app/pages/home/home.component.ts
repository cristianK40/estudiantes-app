import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EstudianteService } from '../../services/estudiante.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterLink,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  estudiantes:any[] = [];

  constructor(private estudianteService: EstudianteService){}

  ngOnInit(): void {
     this.estudianteService.getEstudiantes().subscribe({
       next: (data)=> {
        this.estudiantes = data;
        console.log(data);
       },
       error: (err) => {
        console.log('Error al obtener Estudiantes', err);
       }
     });
  }
}
