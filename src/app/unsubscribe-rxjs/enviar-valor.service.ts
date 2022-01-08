import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  //serviço que emite String

  //emissor do rxjs
  private emissor$ = new Subject<string>();

  //enviar para os outros
  emitirValor(valor: string) {
    this.emissor$.next(valor);
  }

  //retorna um observable, logo vc precisa fazer uma inscricao (subscribe())
  getValor() {
    return this.emissor$.asObservable();
  }

}
