import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})

@Injectable()
export class TemplateFormComponent implements OnInit {

  usuario:any = {
    nome:  null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleSubmit(f: NgForm){
    console.log(f)
    // console.log(this.usuario)
    this.http.post('https://httpbin.org/post', JSON.stringify(f.value))
    .subscribe(dados => console.log(dados))
  }

  verificaValidTouched(campo:any){
    return !campo.valid && campo.touched
  }

  aplicaCSSdeErro(campo:any){
    return {
      'has-error': this.verificaValidTouched(campo)
    }
  }

  consultarCEP(cep: any, form: NgForm){
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.resetaDadosForm(form)
        this.http.get("https://viacep.com.br/ws/"+ cep +"/json")
        .subscribe(dado => this.popularDadosForm(dado, form))
      }
    }
  }

  popularDadosForm(dados: any, formulario: NgForm){
    // formulario.setValue( {
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '' ,
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // })

  formulario.form.patchValue(
   {
     endereco: {
      complemento: dados.complemento,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
  }})

  }

  resetaDadosForm(formulario: NgForm){
    formulario.form.patchValue(
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
