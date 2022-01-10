import { take } from 'rxjs/operators';
import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { catchError, EMPTY, Observable, tap, Subject, switchMap } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos!: Curso[]
  cursos$!: Observable<Curso[]> //pipe Async - responsavel por inscrever/desinscrever
  error$ = new Subject<boolean>(); //objeto que consegue emitir valores

  //Modal
  bsModalRef!: BsModalRef;
  deleteModalRef!: BsModalRef
  @ViewChild('deleteModal') deleteModal:any;

  //remocaoDoCurso
  cursoSelecionado!: Curso

  constructor(
    private cursosService: Cursos2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.cursosService.list().subscribe(response => this.cursos = response)
    this.onRefresh()
  }


  onRefresh() {
    this.cursos$ = this.cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error)
          this.handleError()
          // this.error$.next(true)
          return EMPTY //retorna um observable
        }

        )
      );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // //Aqui ficam as input properties para o alert-modal
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = ' Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(idCurso: number) {
    this.router.navigate(['editar', idCurso], { relativeTo: this.route })
  }

  onDelete(curso: Curso):void{
    this.cursoSelecionado = curso
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
    const result$ = this.alertModalService.showConfirm('Confirmação','Tem certeza que deseja remover esse curso?')
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.cursosService.delete(curso.id) : EMPTY)
    ).subscribe(
      {
        next: (v) => {
          this.onRefresh()

         },
        error: () => {this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
       }
      }
    )
  }

  onConfirmDelete(){
    this.cursosService.delete(this.cursoSelecionado.id)
    .subscribe(
           {
             next: (v) => {
               this.onRefresh()
               this.onDeclineDelete()

              },
             error: () => {this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
             this.onDeclineDelete()
            }
           }
    )

  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }


}
