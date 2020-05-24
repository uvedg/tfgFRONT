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
  }

  navigate(link): void {
    this.router.navigate([link]);
  }
}
