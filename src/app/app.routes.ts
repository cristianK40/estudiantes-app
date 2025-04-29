import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { EstudiantesFormComponent } from './pages/estudiantes-form/estudiantes-form.component';
import { EstudiantesDetailComponent } from './pages/estudiantes-detail/estudiantes-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'formulario', component: EstudiantesFormComponent},
    {path: ':id', component:EstudiantesDetailComponent}

];
