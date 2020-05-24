import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { ObtenerPistaComponent } from './componentes/obtener-pista/obtener-pista.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { MenuNavegadorComponent } from './componentes/menu-navegador/menu-navegador.component';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { MostrarPistaComponent } from './componentes/mostrar-pista/mostrar-pista.component';
import { ValorarComponent } from './componentes/valorar/valorar.component';
import { PopupComponent } from './componentes/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    RecuperarPasswordComponent,
    ObtenerPistaComponent,
    BuscarComponent,
    MenuComponent,
    EditarComponent,
    MenuNavegadorComponent,
    MostrarPistaComponent,
    ValorarComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TokenStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
