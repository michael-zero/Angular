import { CursoResolverGuard } from './guards/curso-resolver.guard';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CursosListaComponent},
  {path: 'novo', component: CursosFormComponent, resolve: {curso: CursoResolverGuard}},
  {path: 'editar/:id', component: CursosFormComponent, resolve: {curso: CursoResolverGuard}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule  { }
