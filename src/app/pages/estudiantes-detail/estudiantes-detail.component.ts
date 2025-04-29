import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-estudiantes-detail',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './estudiantes-detail.component.html',
  styleUrls: ['./estudiantes-detail.component.css']
})
export class EstudiantesDetailComponent implements OnInit {
  estudianteForm!: FormGroup;
  estudiante: any;
  materiasAux: any[] = [];
  materiasDisponibles: any[] = [];
  totalCreditos: number = 0;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private materiaService:MateriaService,
    private fb: FormBuilder
  ) {}

  get materiasFormArray(): FormArray {
    return this.estudianteForm.get('materias') as FormArray;
  }

  ngOnInit(): void {
    const estudianteId = this.route.snapshot.params['id'];

    // Cargar datos del estudiante
    this.estudianteService.getEstudianteId(estudianteId).subscribe({
      next: (data) => {
        this.estudiante = data;
        this.initForm(); // Inicializa el formulario sin materias aún
        this.cargarMateriasDisponibles(); // Se carga y sincroniza con las materias seleccionadas
      },
      error: (err) => {
        alert(err.error.text);
      }
    });

    // Cargar materias asociadas (auxiliares)
    this.estudianteService.getEstudiantesMateria(estudianteId).subscribe({
      next: (data) => {
        this.materiasAux = data;
      },
      error: (err) => {
        alert(err.error.text);
      }
    });
  }

  initForm() {
    this.estudianteForm = this.fb.group({
      nombre: [this.estudiante?.nombre || ''],
      correo: [this.estudiante?.correo || ''],
      materias: this.fb.array([]) // Se llena luego al tener materias disponibles
    });
  }

  cargarMateriasDisponibles() {
    this.materiaService.getMaterias().subscribe({
      next: (data) => {
        this.materiasDisponibles = data;

        // Limpiar por si acaso ya había algo
        this.materiasFormArray.clear();

        // Inicializar el FormArray con checkboxes marcados si ya las tiene
        this.materiasDisponibles.forEach((materia: any) => {
          const seleccionada = this.estudiante.materias?.some(
            (mat: any) => mat.id === materia.id
          );
          this.materiasFormArray.push(new FormControl(seleccionada));
        });
      },
      error: (err) => {
        console.error("Error cargando materias: ", err);
      }
    });
  }

  getFormControlAt(index: number): FormControl {
    return this.materiasFormArray.at(index) as FormControl;
  }

  calcularCreditos(): void {
    const materiasSeleccionadas = this.materiasFormArray.controls
      .map((control, i) => control.value ? this.materiasDisponibles[i].creditos : 0);

    this.totalCreditos = materiasSeleccionadas.reduce((acc, curr) => acc + curr, 0);
  }

  actualizarEstudiante() {
    const materiasSeleccionadas = this.materiasDisponibles
      .filter((_, i) => this.materiasFormArray.at(i).value)
      .map(m => ({ materiaId: m.id }));

    this.totalCreditos = materiasSeleccionadas.length * 3;
    const estudianteActualizado = {
      nombre: this.estudianteForm.value.nombre,
      correo: this.estudianteForm.value.correo,
      totalCreditos: materiasSeleccionadas.length * 3,
      estudiantesMaterias: materiasSeleccionadas
    };

    this.estudianteService.actualizarEstudiante(this.estudiante.id, estudianteActualizado).subscribe({
      next: () => alert("Estudiante actualizado con éxito "),
      error: (err) => alert("Error actualizando  " + err.error?.text)
    });
  }

  eliminarEstudiante() {
    if (confirm("¿Estás segur@ que quieres eliminar este estudiante? ")) {
      this.estudianteService.eliminarEstudiante(this.estudiante.id).subscribe({
        next: () => alert("Estudiante eliminado con éxito"),
        error: (err) => alert("Error al eliminar" + err.error?.text)
      });
    }
  }
}
