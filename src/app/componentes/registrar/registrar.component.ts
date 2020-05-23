import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class RegistrarComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) { }

  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  confirmarPassword: string;
  permiso: boolean;

  registrarForm: FormGroup;

  public ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  public leerCondiciones(){
      document.getElementById('dialog').innerHTML =
     "Si marca la casilla de PERMISO da consentimiento <br>" +
     "para aparecer en las búsqueda realizadas por otros <br>" +
     "usuarios y recibir/realizar valoraciones. <br><br>" +
    "Puede efectuar el registro SIN ACEPTAR el permiso. <br> " +
    "Ley Orgánica de Protección de datos.";
    
    let myDialog:any = <any>document.getElementById("myDialog");
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
    this.registrarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required,this.confirmarPasswords, Validators.minLength(4)],
      confirmarPassword: ['', Validators.required],
      permiso: [false]
    });
    //Falta comprobar las validaciones
    //Falta validar que los campos de password y confirmarPassword coinciden, además de asegurar la contraseña (hash)
  }

  private initForm() {
    this.registrarForm = new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmarPassword: new FormControl(),
      permiso: new FormControl(false)
    });
  }

  public registrar() {
     const user = this.registrarForm.value;

    this.http.post('http://localhost:3000/api/createUser', user).subscribe
    (res => {
      console.log(res);
       document.getElementById('dialog').innerHTML = "El usuario se ha creado con exito";
      this.router.navigate(['./']);
      },
       ( error : any) => {
           document.getElementById('dialog').innerHTML = error.error.err;
    });
  }
  
}
