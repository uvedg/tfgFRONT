import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { ObtenerPistaComponent } from './componentes/obtener-pista/obtener-pista.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MostrarPistaComponent } from './componentes/mostrar-pista/mostrar-pista.component';
import { ValorarComponent } from './componentes/valorar/valorar.component';

const routes: Routes = [{
  path: 'api/registrar',
  component: RegistrarComponent
}, {
  path: 'api/login',
  component: LoginComponent
},{
  path: '',
  component: LoginComponent
}, {
  path: 'api/editar',
  component: EditarComponent
}, {
  path: 'api/password',
  component: RecuperarPasswordComponent
}, {
  path: 'api/menu',
  component: MenuComponent
}, {
  path: 'api/obtenerpista',
  component: ObtenerPistaComponent
}, {
  path: 'api/buscar',
  component: BuscarComponent
}, {
  path: 'api/mostrarPista',
  component: MostrarPistaComponent
}, {
  path: 'api/valorar',
  component: ValorarComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
