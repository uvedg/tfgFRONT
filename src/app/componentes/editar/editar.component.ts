import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class EditarComponent implements OnInit {

  uri = 'http://localhost:3000/api';

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  confirmarPassword: string;
  permiso: boolean;

  editarForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  public leerCondiciones() {
    document.getElementById('dialog').innerHTML =
      "Si marca la casilla de PERMISO da consentimiento <br>" +
      "para aparecer en las búsqueda realizadas por otros <br>" +
      "usuarios y recibir/realizar valoraciones. <br><br>" +
      "Puede efectuar el registro SIN ACEPTAR el permiso. <br> " +
      "Ley Orgánica de Protección de datos.";

    let myDialog: any = < any > document.getElementById("myDialog");
    myDialog.showModal();

    var cancelButton = document.getElementById('aceptar');
    cancelButton.addEventListener('click', function() {
      myDialog.close('');
    });
  }

  confirmarPasswords(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  private buildForm() {
    this.editarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(4)],
      confirmarPassword: ['', Validators.required],
      permiso: [false]
    });
    //Falta comprobar las validaciones
    //Falta validar que los campos de password y confirmarPassword coinciden, además de asegurar la contraseña (hash)
  }

  private initForm() {
    this.editarForm = new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmarPassword: new FormControl(),
      permiso: new FormControl(false)
    });
  }

  public editar() {
    const user = this.editarForm.value;
    // console.log(user);
    // console.log(this.editarForm);

    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    var userId = localStorage.getItem("User_Id");
    this.http.put(this.uri + '/updateUser/' + userId, user, httpOptions).subscribe((data: any) => {
        // window.alert("El usuario se ha guardado con exito");
        document.getElementById('dialog').innerHTML = "El usuario se ha guardado con exito.";

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');
        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
        this.router.navigate(['/api/menu']);
      },
      (error: any) => {
        //window.alert(error.error.err);
        document.getElementById('dialog').innerHTML = error.error.err;

        let myDialog: any = < any > document.getElementById("myDialog");
        myDialog.showModal();

        var cancelButton = document.getElementById('aceptar');
        cancelButton.addEventListener('click', function() {
          myDialog.close('');
        });
      })
  }

  public eliminar() {
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    var userId = localStorage.getItem("User_Id");
    this.http.delete('http://localhost:3000/api/deleteUser/' + userId, httpOptions).subscribe(res => {
        window.alert("El usuario se ha borrado con exito");
        this.router.navigate(['/api/login']);
      },
      (error: any) => {
        window.alert(error.error.err);
      });
  }

}