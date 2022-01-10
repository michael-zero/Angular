import { CursosService } from './../cursos.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';

type CursoNovo = {
  id: number | null,
  nome: string | null
}

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<CursoNovo> {

  constructor(private service: CursosService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CursoNovo> {
    //Edicao
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id'])
    }
    //Caso seja um novo curso
    return of({
      id: null,
      nome: null
    })
  }



}
