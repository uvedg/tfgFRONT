import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
//import { runInThisContext } from 'vm';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  email: string;

  buscarForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
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
    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const email = this.buscarForm.value;
    this.http.post(this.uri + '/findUser', email, httpOptions).subscribe((data: any)=> {
      console.log(data);
      //this.usuarios = data;
      this.usuarios = [
            {"nombre": data["nombre"], "apellidos": data["apellidos"]}
            ];
      console.log(data);
    });
  }

  irValorar() {
    this.navigate('/api/valorar');
  }


  
}
