import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-pista',
  templateUrl: './mostrar-pista.component.html',
  styleUrls: ['./mostrar-pista.component.scss']
})

export class MostrarPistaComponent implements OnInit {
    
   public  products = [];

  constructor(private activateRoute: ActivatedRoute, private router: Router) { 
   this.activateRoute.queryParams.subscribe(params => {
            this.products = [
            {"date": params["date"], "horainicioPartida": params["horainicioPartida"],
            "horafinPartida": params["horafinPartida"],
            "direccion": params["direccion"],"disponibilidad": params["disponibilidad"] }
            ];
        });
  }

   //   products = [
   // {"date":"sasdasd","horainicioPartida":"asdasdasd","horafinPartida":"asasdasd",
   // "direccion":"170.00","disponibilidad":"22"},
//];

  ngOnInit() {
    this.mostrarPistas();
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
