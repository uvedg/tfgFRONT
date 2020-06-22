import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class BuscarComponent implements OnInit {

  uri = 'http://localhost:3000/api';

  usuarios: any;
  public valoraciones = [];
  public emailId = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  email: string;

  buscarForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm() {
    this.buscarForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email]
    });
  }

  private initForm() {
    this.buscarForm = new FormGroup({
      email: new FormControl()
    });
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  buscar() {
    var token = localStorage.getItem("AuthToken");
    const email = this.buscarForm.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.post(this.uri + '/findUser', email, httpOptions).subscribe(
      (data: any) => {
          this.emailId = data["_id"].toString();;
        this.usuarios = [{
          "nombre": data["nombre"],
          "apellidos": data["apellidos"]
        }];
        
        this.http.get(this.uri + '/mostrarValoraciones/' + this.emailId, httpOptions).subscribe(
            (data: any) => {
                      for (let j = 0; j < data.length; j++) {
                        this.valoraciones.push({
                        "puntuacion": data[j]["puntuacion"],
                        "comentario": data[j]["comentario"],
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
        //window.alert(error.error.err);
      });
      },
      (error: any) => {
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');
        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
        //window.alert(error.error.err);
      });
  }

  irValorar() {
      const email = this.buscarForm.value;
    this.router.navigate(['/api/valorar'], {
      queryParams: {"emailId": this.emailId}
    });
  }
  
  volver() {
    this.navigate('/api/menu');
  }
  
  mostrarValoraciones() {
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get('http://localhost:3000/api/mostrarValoraciones/' + this.emailId,httpOptions).subscribe(
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
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');

        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
      });
  }
}