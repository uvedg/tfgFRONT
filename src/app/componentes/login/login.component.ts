import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
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

  public login() {
    //Turorial
    const credenciales = this.loginForm.value;
    // console.log(credenciales);
    // console.log(this.loginForm);
    // console.log(credenciales.email);
    // console.log(credenciales.password);
    this.authService.loginAuth(credenciales.email, credenciales.password).subscribe(data => {
      //reedirige a la vista del menu
      this.navigate('/api/menu');
    })
    
    // //Hecho previamente por mi
    // const credenciales = this.loginForm.value;
    // console.log(credenciales);
    // console.log(this.loginForm);
    // //this.http.post('http://localhost:3000/api/login', credenciales).subscribe(res => {console.log(res)});
    // this.http.post('http://localhost:3000/api/login', credenciales).subscribe(res => {this.navigate('/api/menu')});
    // //this.navigate('/api/menu');   
  }

}
