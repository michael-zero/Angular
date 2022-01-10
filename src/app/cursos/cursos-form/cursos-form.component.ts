import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup
  submitted:boolean = false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    })
  }

  hasError(field:string){
    return this.form.get(field)?.errors as ValidationErrors
  }

  onSubmit(){
    this.submitted = true;

    console.log(this.form)

    if(this.form.valid){
      console.log("submitted")
    }
  }

  onCancel(){
    this.submitted = false
    this.form.reset()

  }

}
