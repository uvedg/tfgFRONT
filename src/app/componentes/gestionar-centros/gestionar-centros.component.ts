import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestionar-centros',
  templateUrl: './gestionar-centros.component.html',
  styleUrls: ['./gestionar-centros.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})
export class GestionarCentrosComponent implements OnInit {

  uri = 'http://localhost:3000/api';
  
 public paises = [];
 public ciudades = [];
 public centros = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  mostrarPaisForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm() {
    this.mostrarPaisForm = this.formBuilder.group({
      pais: ['', Validators.required]
    });
  }

  private initForm() {
    this.mostrarPaisForm = new FormGroup({
      pais: new FormControl()
    });
  }


     mostrarPaises() {
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get('http://localhost:3000/api/pais',httpOptions).subscribe(
      (data: any) => {
          for (let j = 0; j < data.length; j++) {
               this.paises.push({
                   "pais": data[j]["pais"],
               });
          }
      },
      (error: any) => {
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
      });
  }
  
  mostrarCiudades() {
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get('http://localhost:3000/api/ciudad',httpOptions).subscribe(
      (data: any) => {
          for (let j = 0; j < data.length; j++) {
               this.ciudades.push({
                   "ciudad": data[j]["ciudad"],
               });
          }
      },
      (error: any) => {
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
      });
  }
  
  mostrarCentros() {
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get('http://localhost:3000/api/centro',httpOptions).subscribe(
      (data: any) => {
          for (let j = 0; j < data.length; j++) {
               this.centros.push({
                   "centro": data[j]["centro"],
                   "ciudad": "Valencia",
                   "contacto": data[j]["contacto"],
                   "url": data[j]["url"],
               });
          }
      },
      (error: any) => {
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
      });
  }
  
  anadirPais() {
    var token = localStorage.getItem("AuthToken");
    const pais = this.mostrarPaisForm.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.post(this.uri + '/pais', pais, httpOptions).subscribe(
      (data: any) => {
        document.getElementById('dialog').innerHTML = data;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
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
        //window.alert(error.error.err);
      });
  }
}
