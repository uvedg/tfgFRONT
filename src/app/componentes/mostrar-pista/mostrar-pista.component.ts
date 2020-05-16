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

  constructor(private activateRoute: ActivatedRoute, private router: Router, private http: HttpClient) { 
   this.activateRoute.queryParams.subscribe(params => {
            //this.products = [
            //{"date": params["date"], "horainicioPartida": params["horainicioPartida"],
            //"horafinPartida": params["horafinPartida"],
            //"direccion": params["direccion"],"disponibilidad": params["disponibilidad"] }
            //];
            
            //Token y httpheaders
             var token = localStorage.getItem("AuthToken");
             const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
               })
             };
            
            this.http.post('http://localhost:3000/api/obtenerPista', params, httpOptions).subscribe(
            data => {
                //this.products = data["web_1"];
                
                let size = Object.keys(data).length;
                for(let i = 1; i < size + 1; i++){
                     for(let j = 0; j < data["web_" + i].length; j++){
                         this.products.push(data["web_" + i][j]);
                    }
                }
                },
       ( error : any) => {
           window.alert(error.error.err);
        });
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
    //var token = localStorage.getItem("AuthToken");
    //const httpOptions = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    'Authorization': 'Bearer ' + token
    //  })
    //};

    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    // this.scrapingService.mostrarPistasService()
    //   .subscribe(res => {
    //     this.pistas = res;
    //     console.log(res);
        
    //     //traer respues de obtenerPista
    //   })
  }

}
