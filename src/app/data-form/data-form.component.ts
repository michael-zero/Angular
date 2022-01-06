import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup
  estados!: EstadoBr[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit(): void {

    // Buscando estados
    this.dropdownService.getEstadosBr()
    .subscribe(dados => console.log(dados))

    // this.formulario = new FormGroup({
    //   nome : new FormControl(null),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group(
       {
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento:[null] ,
        rua:[null,Validators.required],
        bairro:[null,Validators.required] ,
        cidade:[null,Validators.required] ,
        estado:[null,Validators.required]
       })
    })
  }

  handleSubmit(){
    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        console.log(dados)
      })
    }else{
      console.log("Formulário inválido.")
      this.verificaValidacoesForm(this.formulario)


    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      let controle = formGroup.get(campo)
      controle?.markAsTouched()

      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle)
      }
    })
  }

  verificaValidTouched(campo:string) : boolean {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched as boolean
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
        return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  aplicaCSSdeErro(campo:string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  resetar(){
    this.formulario.reset()
  }

  consultarCEP(){
    let campoCEP = this.formulario.get('endereco.cep')
    let cep = campoCEP?.value

    if (cep != null && cep !== "") {
      this.cepService.consultarCEP(cep)
      ?.subscribe(dados => this.popularDadosForm(dados))
    }
  }

  popularDadosForm(dados: any){
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


}
