import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { catchError, EMPTY, Observable, tap, Subject } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos!: Curso[]
  cursos$!: Observable<Curso[]> //pipe Async - responsavel por inscrever/desinscrever
  error$ =  new Subject<boolean>(); //objeto que consegue emitir valores

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    // this.cursosService.list().subscribe(response => this.cursos = response)
    this.onRefresh()
  }


  onRefresh(){
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(error =>
        {
        console.log(error)
        this.error$.next(true)
        return EMPTY //retorna um observable
      }

      )
    );
  }


}
