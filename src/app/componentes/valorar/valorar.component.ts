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

  constructor(private activateRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {
      this.activateRoute.queryParams.subscribe(params => {
              // document.getElementById("usuario").innerText = params.emailId;
              this.emailId = params.emailId;
          });
      }

  puntuacion: number;
  comentario: string;
  public emailId = "";

  valoracionForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm() {
    this.valoracionForm = this.formBuilder.group({
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
      valorado_por: ['', Validators.required],
      usuario: ['', Validators.required]
    });
  }

  private initForm() {
    this.valoracionForm = new FormGroup({
      puntuacion: new FormControl(),
      comentario: new FormControl(),
      valorado_por: new FormControl(),
      usuario: new FormControl(),
    });
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  enviarValoracion() {
    const valoracion = this.valoracionForm.value;

    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    
    var userId = localStorage.getItem("User_Id");
    valoracion.valorado_por = userId;
    valoracion.usuario = this.emailId;
    
    this.http.post(this.uri + '/enviarValoracion', valoracion, httpOptions).subscribe(
      (data: any) => {
          let self = this;
        document.getElementById('dialog').innerHTML = "El comentario se ha guardado con exito.";

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');
        cancelButton.addEventListener('click', function() {
          myDialog.close('');
          self.navigate('/api/menu');
        });
      },
      (error: any) => {
        document.getElementById('dialog').innerHTML = error.error;

          let myDialog: any = < any > document.getElementById("myDialog");
          myDialog.showModal();

          var cancelButton = document.getElementById('aceptar');
          cancelButton.addEventListener('click', function() {
            myDialog.close('');
          });
      });
  }

  
  
  volver() {
    this.navigate('/api/buscar');
  }
}