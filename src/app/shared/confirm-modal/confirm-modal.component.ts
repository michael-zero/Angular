import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string
  @Input() msg!: string
  @Input() cancelTxt = 'Cancelar'
  @Input() okTxt = 'Sim'

  confirmResult!: Subject<boolean>

  constructor(private bsModalRef: BsModalRef) {
    this.confirmResult = new Subject()
  }

  ngOnInit(): void {
  }

  public onConfirm(){
    this.confirmAndClose(true)
  }

  public onClose(){
    this.confirmAndClose(false)
  }

  private confirmAndClose(valor:boolean){
    this.confirmResult.next(valor)
    this.bsModalRef.hide()
  }

}
