import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router} from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  email: string;

  recuperarForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
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

    const email = this.recuperarForm.value;

    this.http.post(this.uri + '/recuperarPassword', email).subscribe(
    (data: any)=> {
        
    document.getElementById('dialog').innerHTML = "La contraseña es: " + data.password;
    
    let myDialog:any = <any>document.getElementById("myDialog");
    myDialog.showModal();
    
    var cancelButton = document.getElementById('aceptar');
     cancelButton.addEventListener('click', function() {
        myDialog.close('');
      });
        this.router.navigate(['./']);
        
     },
       ( error : any) => {
           document.getElementById('dialog').innerHTML = error.error.err;
    
        let myDialog:any = <any>document.getElementById("myDialog");
        myDialog.showModal();
    
        var cancelButton = document.getElementById('aceptar');
            cancelButton.addEventListener('click', function() {
         myDialog.close('');
        });
  });
  }

}
