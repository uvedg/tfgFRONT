import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-obtener-pista',
  templateUrl: './obtener-pista.component.html',
  styleUrls: ['./obtener-pista.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class ObtenerPistaComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ubicacion: string;
  fecha: string;
  inicioHora: string;
  finHora: string;

  obtenerPistaForm: FormGroup;
  
  products: any;
  
  ngOnInit() {
    this.buildForm();
    this.initForm();
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any) => console.log(data));
  }

  buildForm() {
    this.obtenerPistaForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      fecha: ['', Validators.required],
      inicioHora: ['', Validators.required],
      finHora: ['', Validators.required]
    });
  }

  initForm() {
    this.obtenerPistaForm = new FormGroup({
      ubicacion: new FormControl(),
      fecha: new FormControl(),
      inicioHora: new FormControl(),
      finHora: new FormControl()
    })
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  public obtenerPista() {
    const pista = this.obtenerPistaForm.value;

    //Comprobaciones 
    console.log("Pista a continuacion: ");
    console.log(pista);
    console.log("Obtener pista a continuacion: ");
    console.log(this.obtenerPistaForm);

    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.post('http://localhost:3000/api/obtenerPista', pista, httpOptions).subscribe(
    data => {
      //console.log(data);
     /* for (let web in data){
          for (let pista in data[web]){
            date = console.log(data[web][pista]["date"]);
            horainicioPartida = console.log(data[web][pista]["horainicioPartida"]);
            horafinPartida = console.log(data[web][pista]["horafinPartida"]);
            direccion = console.log(data[web][pista]["direccion"]);
            disponibilidad = console.log(data[web][pista]["disponibilidad"]);
       }
      }*/
      
       let navigationExtras: NavigationExtras = {
            queryParams: {
                "date": data["web_1"][0].date,
                "horainicioPartida": data["web_1"][0].horainicioPartida,
                 "horafinPartida": data["web_1"][0].horafinPartida,
                 "direccion": data["web_1"][0].direccion,
                 "disponibilidad": data["web_1"][0].disponibilidad
            }
        };
      this.router.navigate(['/api/mostrarPista'], navigationExtras);
    });
  }

}
