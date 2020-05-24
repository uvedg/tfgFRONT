import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  email: string;
  password: string;

  loginForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(4)]
    });
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  irRegistrar() {
    this.navigate('api/registrar');
  }

  irRecuperarPassword() {
    this.navigate('api/password');
  }

  public login() {
    const credenciales = this.loginForm.value;
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.authService.loginAuth(credenciales.email, credenciales.password).subscribe(
    data => {
      this.navigate('/api/menu');
    });
  }

}
