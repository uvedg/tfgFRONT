import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit {
  
  title = 'AppWeb Pádel';

  constructor(private router: Router, private http: HttpClient) { }

  public ngOnInit() {
    this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  irLogin() {
    this.navigate('api/login');
  }

  irRegistrar() {
    this.navigate('api/registrar');
  }

  irRecuperarPassword() {
    this.navigate('api/password');
  }

}
