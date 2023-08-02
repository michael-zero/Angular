import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class FormValidations {

  static minSelectedCheckboxes(min:number = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }


  // static requiredMinCheckbox(min = 1) {
  //   const validator = (formArray: FormArray) => {
  //     /* const values = formArray.controls;
  //     let totalChecked = 0;
  //     for (let i = 0; i < values.length; i++) {
  //       if (values[i].value) {
  //         totalChecked += 1;
  //       }
  //     } */
  //     const totalChecked = formArray.controls
  //       .map(v => v.value)
  //       .reduce((total, current) => current ? total + current : total, 0);
  //     return totalChecked >= min ? null : { required: true };
  //   };
  //   return validator;
  // }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      // const validacep = /^[0-9]{5}-[0-9]{3}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      //campo  e formulario nao esta prontos para ser validado
      //.controls lista todos os campos do formulário
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      //se existe o campo, entao obtem o outro //pegando o group
      //o parent seria o campo acima definido no form
      const field = (<FormGroup>formControl.root).get(otherField);

      //se o campo informado n for valido
      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      //se possuem valores diferentes
      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null; //campovalido
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: any = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };

    return config[validatorName];
  }
}
