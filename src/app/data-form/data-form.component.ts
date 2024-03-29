import { Cidade } from './../shared/models/cidade';
import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/Form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EMPTY, empty, map, Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  // formulario!: FormGroup
  estados!: EstadoBr[]
  cidades!: Cidade[]
  // estados!: Observable<EstadoBr[]>
  cargos!: any[]
  tecnologias!: any[]
  newsletterOp!: any[]
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificarEmailService: VerificaEmailService
    ) {
      super()
     }

    ngOnInit(){

    // this.estados = this.dropdownService.getEstadosBr()
    this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados)

    this.cargos  = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
    this.newsletterOp = this.dropdownService.getNewsletter()

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [FormValidations.equalsTo("email")], [this.validarEmail.bind(this)]],

      endereco: this.formBuilder.group(
       {
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, [Validators.required]],
        complemento:[null] ,
        rua:[null,Validators.required],
        bairro:[null,Validators.required] ,
        cidade:[null,Validators.required] ,
        estado:[null,Validators.required]
       })
       ,
       cargo: [null],
       tecnologias: [null],
       newsletter: ['s'],
       termos: [null, Validators.pattern('true')],
       frameworks: this.buildFrameworks()
    })

    //validacoes assincronas
    this.formulario.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ?  this.cepService.consultarCEP(this.formulario.get("endereco.cep")?.value) :
      EMPTY )
    )
    .subscribe(dados => dados ? this.popularDadosForm(dados) : {})

    this.formulario.get('endereco.estado')?.valueChanges
    .pipe(
      tap(estado => console.log("Novo estado ", estado)),
      map(estado => this.estados.filter((e) => e.sigla === estado )),
      map(estados => estados && estados.length > 0 ? estados[0].id : EMPTY),
      switchMap((estadoId) => this.dropdownService.getCidades(estadoId as number)),
      tap(console.log)
    )
    .subscribe(cidades => this.cidades = cidades)
  }

  // getCampo(c:string){
  //   return this.formulario.get(c) as FormArray
  // }

  getCampoAbstractControl(c:string){
    return this.formulario.get(c) as AbstractControl
  }

  // temErro(){
  //   return (this.formulario.get('endereco.cep') as FormArray).hasError('cepInvalido')
  // }

  // temErroEmail(){
  //   return (this.formulario.get('confirmarEmail') as FormArray).hasError('emailInvalido')
  // }

  confirmarEmail() {
   let form = this.formulario.get('confirmarEmail') as FormArray;
   if(form.hasError('equalsTo')){
     return true
   }

   return false
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.minSelectedCheckboxes(1));
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }


  // verificaValidacoesForm(formGroup: FormGroup){
  //   Object.keys(formGroup.controls).forEach(campo => {
  //     let controle = formGroup.get(campo)
  //     controle?.markAsTouched()

  //     if(controle instanceof FormGroup){
  //       this.verificaValidacoesForm(controle)
  //     }
  //   })
  // }

  // verificaValidTouched(campo:string) : boolean {
  //   return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched as boolean
  // }

  // verificaRequired(campo:string) : boolean {
  //   return (
  //     !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  //   )
  //   // return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched as boolean
  // }

  // verificaEmailInvalido(){
  //   let campoEmail = this.formulario.get('email')
  //   if(campoEmail?.errors){
  //       return campoEmail.errors['email'] && campoEmail.touched
  //   }
  // }

  // aplicaCSSdeErro(campo:string){
  //   return {
  //     // 'has-error': this.verificaValidTouched(campo),
  //     'is-invalid': this.verificaValidTouched(campo)
  //   }
  // }

  // resetar(){
  //   this.formulario.reset()
  // }

  consultarCEP(){
    let campoCEP = this.formulario.get('endereco.cep')
    let cep = campoCEP?.value

    if (cep != null && cep !== "") {
      this.cepService.consultarCEP(cep)
      ?.subscribe(dados => this.popularDadosForm(dados))
    }
  }

  popularDadosForm(dados: any){
    // console.log(dados)
    this.formulario.patchValue(
    {
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }})

    this.formulario.get('nome')?.setValue("robot exe")

  }

  resetaDadosForm(){
    this.formulario.patchValue(
      {
        endereco: {
         complemento: null,
         rua: null,
         bairro:null,
         cidade: null,
         estado: null
     }})
  }

  setarCargo(){
    let cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: { nome: any; nivel: any; }, obj2: { nome: any; nivel: any; }) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  compararTecnologias(){

  }

  setarTecnologias() {
    let campoTec = this.formulario.get('tecnologias')
    campoTec?.setValue(['java', 'javascript', 'php']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }


  // handleSubmit(){
  //   let valueSubmit = Object.assign({}, this.formulario.value);
  //   valueSubmit = Object.assign(valueSubmit, {
  //     frameworks: valueSubmit.frameworks
  //     .map((v:any, i:number) => v ? this.frameworks[i] : null)
  //     .filter((v:any) => v !== null)
  //   });

  //   if(this.formulario.valid){
  //     this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
  //     .subscribe(dados => {
  //       console.log(dados)
  //     })
  //   }else{
  //     console.log("Formulário inválido.")
  //     this.verificaValidacoesForm(this.formulario)
  //   }
  // }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v:any, i:number) => v ? this.frameworks[i] : null)
      .filter((v:any) => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .subscribe(dados => {
      console.log(dados)
    })
  }
}
