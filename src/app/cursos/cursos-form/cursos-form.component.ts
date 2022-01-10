import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Cursos2Service } from '../cursos2.service';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted: boolean = false

  constructor(private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    //Obtendo params sem refatoracao
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     const curso$ = this.service.loadById(id)
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso)
    //     })
    //   }
    // )
    //##############################################

    //Obtendo params COM refatoracao
    // this.route.params
    // .pipe(
    //   map(params => params['id']),
    //   switchMap((id:number) => this.service.loadById(id)) //outro observable
    // )
    // .subscribe((curso) => this.updateForm(curso))

    //##############################################

    const curso = this.route.snapshot.data['curso']


    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    })

    console.log(curso)

  }

  hasError(field: string) {
    return this.form.get(field)?.errors as ValidationErrors
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      let msgSucesso = 'Curso criado com sucesso.'
      let msgErro = 'Erro ao criar curso, tente novamente!'

      if(this.form.value.id){
        msgSucesso = 'Curso atualizado com sucesso.'
        msgErro = 'Erro ao atualizar curso, tente novamente!'
      }

      this.service.save(this.form.value)
      .subscribe({
        next: (v) => {
          this.modal.showAlertSuccess(msgSucesso)
          this.location.back()
        },
        error: (e) => this.modal.showAlertDanger(msgErro)
      })

      // if(this.form.value.id){
      //   //edit
      //   this.service.update(this.form.value)
      //   .subscribe({
      //     next: (v) => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso.')
      //       this.location.back()
      //     },
      //     error: (e) => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
      //     complete: () => console.info('update complete')
      //   })


      // }else{
      //   //create
      //   this.service.create(this.form.value)
      //   .subscribe({
      //     next: (v) => {
      //       this.modal.showAlertSuccess('Criado com sucesso.')
      //       this.location.back()
      //     },
      //     error: (e) => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
      //     complete: () => console.info('complete')
      //   })
      // }
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()

  }


  // updateForm(curso: any){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

}
