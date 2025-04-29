import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  estudianteForm!: FormGroup;
  nombre!: FormControl;
  correo!: FormControl;
  materiasDisponibles: any[] = [];
  totalCreditos: number = 0;

  constructor(private fb: FormBuilder, private materiaService: MateriaService, private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.nombre = new FormControl('');
    this.correo = new FormControl('');

    this.estudianteForm = this.fb.group({
      nombre: this.nombre,
      correo: this.correo,
      materias: this.fb.array([]) // se rellena después de la consulta
    });

    this.materiaService.getMaterias().subscribe({
      next: (data) => {
        this.materiasDisponibles = data;

        // Creamos el FormArray con los controles
        const controles = this.materiasDisponibles.map(() => this.fb.control<boolean>(false));
        this.estudianteForm.setControl('materias', this.fb.array(controles));

        this.calcularCreditos(); // inicializa si acaso hay algo ya
      },
      error: (err) => {
        console.error('Error al obtener materias 🥲:', err);
      }
    });
  }

  get materiasFormArray(): FormArray<FormControl<boolean>> {
    return this.estudianteForm.get('materias') as FormArray<FormControl<boolean>>;
  }

  calcularCreditos(): void {
    const materiasSeleccionadas = this.materiasFormArray.controls
      .map((control, i) => control.value ? this.materiasDisponibles[i].creditos : 0);

    this.totalCreditos = materiasSeleccionadas.reduce((acc, curr) => acc + curr, 0);
  }

  onSubmit(): void {
    if (this.estudianteForm.valid) {
      const materiasSeleccionadas = this.materiasFormArray.controls
        .map((control, i) => control.value ? this.materiasDisponibles[i] : null)
        .filter((materia) => materia !== null);
  
      const estudiantesMaterias = materiasSeleccionadas.map((materia: any) => ({
        materiaId: materia.id,
        profesorId: materia.profesorId
      }));
  
      const nuevoEstudiante = {
        nombre: this.nombre.value,
        correo: this.correo.value,
        totalCreditos: this.totalCreditos,
        estudiantesMaterias: estudiantesMaterias
      };
  
      this.estudianteService.crearEstudiante(nuevoEstudiante).subscribe({
        next: (res) => {
          console.log('Estudiante creado exitosamente 🎉', res);
          alert('Estudiante registrado con éxito');
          this.estudianteForm.reset();
          this.totalCreditos = 0;
        },
        error: (err) => {
          console.log(err);
          alert(err.error.text);
        }
      });
    }
  }
  
}
