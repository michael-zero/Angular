import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(() => {
        bsModalRef.hide()
      }, dismissTimeout)
    }

  }

  showAlertDanger(message:string):void{
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message:string):void{
    this.showAlert(message, AlertTypes.SUCCESS, 2000)
  }

  showConfirm(msg: string, title:string, okTxt?:string, cancelTxt?:string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.msg = msg;
    bsModalRef.content.title = title;

    if(okTxt){
      bsModalRef.content.okTxt = okTxt;
    }
    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult

  }
}
