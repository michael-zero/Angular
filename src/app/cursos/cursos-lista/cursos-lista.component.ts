import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos!: Curso[]

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursosService.list().subscribe(response => this.cursos = response)
  }


}
