import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { catchError, EMPTY, Observable, tap, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  //Modal
  bsModalRef?: BsModalRef;

  constructor(
    private cursosService: CursosService,
    // private modalService: BsModalService,
    private alertModalService: AlertModalService)
    { }

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
        this.handleError()
        // this.error$.next(true)
        return EMPTY //retorna um observable
      }

      )
    );
  }

  handleError(){
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // //Aqui ficam as input properties para o alert-modal
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.';
  }


}
