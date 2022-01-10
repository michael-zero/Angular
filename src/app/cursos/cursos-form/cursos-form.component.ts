import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted: boolean = false

  constructor(private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     const curso$ = this.service.loadById(id)
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso)
    //     })
    //   }
    // )

    this.route.params
    .pipe(
      map(params => params['id']),
      switchMap((id:number) => this.service.loadById(id))
    )
    .subscribe((curso) => this.updateForm(curso))

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors as ValidationErrors
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value)
        .subscribe({
          next: (v) => {
            this.modal.showAlertSuccess('Criado com sucesso.')
            this.location.back()
          },
          error: (e) => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
          complete: () => console.info('complete')
        })
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()

  }

  updateForm(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

}
