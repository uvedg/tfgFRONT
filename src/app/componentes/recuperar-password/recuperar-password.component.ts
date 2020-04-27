import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class RecuperarPasswordComponent implements OnInit {

  uri = 'http://localhost:3000/api';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  email: string;

  recuperarForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any)=> console.log(data));
  }

  private buildForm() {
    this.recuperarForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email]
    });
  }

  private initForm() {
    this.recuperarForm = new FormGroup({
      email: new FormControl()
    });
  }

  public recuperarPassword() {
    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get(this.uri + '/recuperarPassword').subscribe((data: any)=> console.log(data));
  }

}
