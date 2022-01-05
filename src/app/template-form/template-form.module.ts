import { SharedModule } from './../shared/shared.module';
import { CampoControlErroComponent } from '../shared/campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from '../shared/form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class TemplateFormModule { }
