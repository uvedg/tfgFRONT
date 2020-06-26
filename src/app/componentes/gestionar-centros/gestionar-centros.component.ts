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
  mostrarCiudadForm: FormGroup;
  mostrarCentroForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm() {
    this.mostrarPaisForm = this.formBuilder.group({
      pais: ['', Validators.required],
    });
    this.mostrarCiudadForm = this.formBuilder.group({
      ciudad: ['', Validators.required],
    });
    this.mostrarCentroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      url: ['', Validators.required],
      contacto: ['', Validators.required],
    });
  }

  private initForm() {
    this.mostrarPaisForm = new FormGroup({
      pais: new FormControl()
    });
    this.mostrarCiudadForm = new FormGroup({
      ciudad: new FormControl()
    });
    this.mostrarCentroForm = new FormGroup({
      nombre: new FormControl(),
      ciudad: new FormControl(),
      url: new FormControl(),
      contacto: new FormControl(),
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
          this.paises = [];
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
          this.ciudades = [];
          for (let j = 0; j < data.length; j++) {
               this.ciudades.push({
                   "ciudad": data[j]["ciudad"],
                   "pais": "España",
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
          this.centros = [];
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
  
  anadirCiudad() {
    var token = localStorage.getItem("AuthToken");
    const ciudad = this.mostrarCiudadForm.value;
    ciudad.pais = "5eee4490d1fa0f2d20156fd1";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.post(this.uri + '/ciudad', ciudad, httpOptions).subscribe(
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
  
  anadirCentro() {
      document.getElementById('dialog').innerHTML = "El centro se ha guardado con exito";

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
    /*var token = localStorage.getItem("AuthToken");
    const nombre = this.mostrarCentroForm.value;
    const url = this.mostrarCentroForm.value;
    const contacto = this.mostrarCentroForm.value;
    const centro = {};
    const centro = {};
    centro.ciudad = "5eee4490d1fa0f2d20156fd1";
    centro.nombre = nombre;
    centro.url = url;
    centro.contacto = contacto;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.post(this.uri + '/centro', centro, httpOptions).subscribe(
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
      });*/
  }
  
   eliminarCentro() {
        document.getElementById('dialog').innerHTML = "El centro se ha borrado con exito";

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
  }
}
