import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T  extends { id?: number }>{

  API: any;

  constructor(
    protected http: HttpClient,
    private API_URL: string
  ) { }


  list(){
    return this.http.get<T[]>(this.API_URL)
    .pipe(
      delay(1000),
      tap(console.log)
    )
  }

  loadById(id:number){
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(
      take(1) //so vai no server 1 vez e finaliza
    )
  }

  private create(record: T){
    return this.http.post(this.API_URL, record)
    .pipe(
      take(1)
    )
  }

  private update(record: T){
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(
      take(1)
    )
  }

  public save(record: T){
    if(record.id){
      return this.update(record)
    }
    return this.create(record)
  }

  public delete(id: number){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      take(1)
    )
  }
}
