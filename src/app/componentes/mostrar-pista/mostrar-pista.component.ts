import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrapingService } from '../../scraping.service';

@Component({
  selector: 'app-mostrar-pista',
  templateUrl: './mostrar-pista.component.html',
  styleUrls: ['./mostrar-pista.component.scss']
})

export class MostrarPistaComponent implements OnInit {

  pistas: any;

  constructor(private router: Router, private scrapingService: ScrapingService) { }

  ngOnInit() {
    //this.mostrarPistas();
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  volver() {
    this.navigate('/api/obtenerpista');
  }

  public mostrarPistas() {
    console.log("estoy en mostrar pistas");

    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    // this.scrapingService.mostrarPistasService()
    //   .subscribe(res => {
    //     this.pistas = res;
    //     console.log(res);
        
    //     //traer respues de obtenerPista
    //   })
  }

}
