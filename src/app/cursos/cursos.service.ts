import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { delay, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`

  constructor(
    private http: HttpClient
  ) { }


  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(1000),
      tap(console.log)
    )
  }

  loadById(id:number){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1) //so vai no server 1 vez e finaliza
    )
  }

  create(curso: string){
    return this.http.post(this.API, curso)
    .pipe(
      take(1)
    )
  }

}
