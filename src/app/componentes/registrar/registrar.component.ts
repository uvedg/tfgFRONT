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
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
  }

  public leerCondiciones(){
    //Mostrar mensaje de texto con las condiciones a las que se le da permiso.
    window.alert("Si marca la casilla de PERMISO da consentimiento para aparecer en las búsqueda realizadas por otros usuarios y recibir/realizar valoraciones. No se puede efectuar el registro SIN ACEPTAR el permiso. Ley Orgánica de Protección de datos.");
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

  //No funciona, prueba uno
  public registrar() {
     const user = this.registrarForm.value;

    this.http.post('http://localhost:3000/api/createUser', user).subscribe
    (res => {
      console.log(res);
      window.alert("El usurio se ha creado con exito");
      this.router.navigate(['./']);
      },
       ( error : any) => {
           window.alert(error.error.err);
    });
  }
  
}
