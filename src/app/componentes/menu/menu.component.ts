import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  irObtenerPista() {
    this.navigate('/api/obtenerpista');
  }

  irBuscar() {
    this.navigate('/api/buscar');
  }
  
  editarUsuario() {
    this.navigate('/api/editar');
  }
}
