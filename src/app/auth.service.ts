import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router, private token: TokenStorage) { }

  public $userSource = new Subject<any>();

  loginAuth(email: string, password: string) : Observable <any> {
    console.log("Estoy en login auth");
    return Observable.create(observer => {
      this.http.post(this.uri + '/login', {
        email,
        password
      }).subscribe(
      ( data : any) => {
           observer.next({user: data.user});
          this.token.saveToken(data.token, data.user._id);
           observer.complete();
      },
       ( error : any) => {
            document.getElementById('dialog').innerHTML = error.error.err;
            
            let myDialog:any = <any>document.getElementById("myDialog");
            myDialog.showModal();
    
            var cancelButton = document.getElementById('aceptar');
             
             cancelButton.addEventListener('click', function() {
             myDialog.close('');
            });
            //window.alert(error.error.err);
        })
    });
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  logout() {
    this.token.signOut();
  }
}
