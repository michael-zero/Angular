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
        this.http.get("https://viacep.com.br/ws/"+ cep +"/json")
        .subscribe(dado => this.popularDadosForm(dado, form))
      }
    }
  }

  popularDadosForm(dados: any, form: NgForm){
    form.setValue( {
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: dados.cep,
        numero: '' ,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

}
