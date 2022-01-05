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
    email: null,
    curso: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(f: NgForm){
    console.log(f)
    console.log(this.usuario)
  }

}
