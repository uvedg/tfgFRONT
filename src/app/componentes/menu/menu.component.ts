import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
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

}
