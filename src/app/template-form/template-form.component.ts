import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any = {
    nome:  null,
    email: null
  }

  constructor() { }

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

}
