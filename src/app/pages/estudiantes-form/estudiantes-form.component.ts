import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';

@Component({
  selector: 'app-estudiantes-form',
  imports: [HeaderComponent,FormularioComponent,HeaderComponent],
  templateUrl: './estudiantes-form.component.html',
  styleUrl: './estudiantes-form.component.css'
})
export class EstudiantesFormComponent {

}
