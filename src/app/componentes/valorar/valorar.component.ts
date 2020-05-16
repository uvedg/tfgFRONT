import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valorar',
  templateUrl: './valorar.component.html',
  styleUrls: ['./valorar.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})
export class ValorarComponent implements OnInit {

  uri = 'http://localhost:3000/api';

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) { }

  puntuacion: number;
  comentario: string;

  valoracionForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
  }

  private buildForm() {
    this.valoracionForm = this.formBuilder.group({
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
      valorado_por: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  private initForm() {
    this.valoracionForm = new FormGroup({
      puntuacion: new FormControl(),
      comentario: new FormControl(),
      valorado_por: new FormControl(),
      user: new FormControl(),
    });
  }

navigate(link) {
    this.router.navigate([link]);
  }
  
  enviarValoracion() {
    const valoracion = this.valoracionForm.value;

    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    console.log(valoracion);
    console.log((<any>window).user);
    this.http.post(this.uri + '/enviarValoracion', valoracion, httpOptions).subscribe(
    (data : any) => {
        window.alert("El comentario se ha guardado con exito");
        this.navigate('/api/menu');
        },
       ( error : any) => {
           window.alert(error.error.err);
        });
  }

  mostrarValoreaciones() {

    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get('http://localhost:3000/api/mostrarValoraciones').subscribe(
    (data: any)=> {console.log(data)
    },
       ( error : any) => {
           window.alert(error.error.err);
  });
}
}
