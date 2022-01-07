
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

export abstract class BaseFormComponent  {

  formulario!: FormGroup;


  constructor() { }



  abstract submit():boolean;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  // verificaValidacoesForm(formGroup: FormGroup | FormArray) {
  //   Object.keys(formGroup.controls).forEach(campo => {
  //     console.log(campo);
  //     let controle = formGroup.get(campo);
  //     controle.markAsDirty();
  //     controle.markAsTouched();
  //     if (controle instanceof FormGroup || controle instanceof FormArray) {
  //       this.verificaValidacoesForm(controle);
  //     }
  //   });
  // }

  verificaValidacoesForm(formGroup: FormGroup | FormArray){
      Object.keys(formGroup.controls).forEach(campo => {
      let controle = formGroup.get(campo)
      controle?.markAsTouched()

      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidacoesForm(controle)
      }
    })
  }

  resetar() {
    this.formulario.reset();
  }

  // verificaValidTouched(campo: string) {
  //   return (
  //     !this.formulario.get(campo).valid &&
  //     (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
  //   );
  // }

  verificaValidTouched(campo:string) : boolean {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched as boolean
  }

  // verificaRequired(campo: string) {
  //   return (
  //     this.formulario.get(campo).hasError('required') &&
  //     (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
  //   );
  // }

  // verificaEmailInvalido() {
  //   const campoEmail = this.formulario.get('email');
  //   if (campoEmail.errors) {
  //     return campoEmail.errors['email'] && campoEmail.touched;
  //   }
  // }

    verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
        return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  aplicaCSSdeErro(campo:string){
    return {
      // 'has-error': this.verificaValidTouched(campo),
      'is-invalid': this.verificaValidTouched(campo)
    }
  }
  // aplicaCssErro(campo: string) {
  //   return {
  //     'has-error': this.verificaValidTouched(campo),
  //     'has-feedback': this.verificaValidTouched(campo)
  //   };
  // }

  getCampo(c:string){
    return this.formulario.get(c) as FormArray
  }

  // getCampoAbstractControl(c:string){
  //   return this.formulario.get(c) as AbstractControl
  // }

  temErro(){
    return (this.formulario.get('endereco.cep') as FormArray).hasError('cepInvalido')
  }

  temErroEmail(){
    return (this.formulario.get('confirmarEmail') as FormArray).hasError('emailInvalido')
  }


}
