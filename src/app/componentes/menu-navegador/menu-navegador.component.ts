import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-menu-navegador',
  templateUrl: './menu-navegador.component.html',
  styleUrls: ['./menu-navegador.component.scss']
})
export class MenuNavegadorComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  public logout() {
    this.authService.logout();
    this.navigate('/api/login');
  }
}
