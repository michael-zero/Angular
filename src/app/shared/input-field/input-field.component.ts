import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCSS: any;
  @Input() id!: string;
  @Input() label!: string;
  @Input() type = "text";
  @Input() control: any;

  private innerValue:any;

  get value(){
    return this.innerValue
  }

  set value(v:any){
    //o evento dispara para valores diferentes , se n for, n precisa ue
    if(v !== this.innerValue){
        this.innerValue = v;
        this.onChangeCb(v)

    }
  }


  onChangeCb:  (_:any) => void = () => {}
  onTouchedCb: (_:any) => void = () => {}

  writeValue(v: any): void {
    this.value = v
  //   if(v !== this.innerValue){
  //     this.innerValue = v;
  //     this.onChangeCb(v)
  // }
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn
  }

}
