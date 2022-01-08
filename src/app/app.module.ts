import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';
import { UnsubscribeRxjsComponent } from './unsubscribe-rxjs/unsubscribe-rxjs.component';


@NgModule({
  declarations: [	
    AppComponent,
    CursosListaComponent,
      UnsubscribeRxjsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
