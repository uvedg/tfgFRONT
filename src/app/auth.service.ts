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
          //this.setUser(data.user);
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
    // localStorage.removeItem('token');
    // console.log("Token eliminado, sesion cerrada.")
    //this.router.navigate([this.uri]);
    this.token.signOut();
    // this.setUser(null);
    // delete (<any>window).user;
  }

  registrarAuth(nombre : string, apellidos: string, email : string, password : string, confirmarPassword : string, permiso : boolean)  : Observable <any> {
    console.log("Estoy en registrar auth");
    return Observable.create(observer => {
      this.http.post(this.uri + '/createUser', {
        nombre,
        apellidos,
        email,
        password,
        confirmarPassword,
        permiso
      }).subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token, data.user);
        observer.complete();
      },
       ( error : any) => {
           window.alert(error.error.err);
      })
    });
  }

  //Comprobar
  editarAuth(nombre : string, apellidos: string, email : string, password : string, confirmarPassword : string, permiso : boolean)  : Observable <any> {
    console.log("Estoy en editar auth");
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return Observable.create(observer => {
      this.http.post(this.uri + '/editUser',  {
        nombre,
        apellidos,
        email,
        password,
        confirmarPassword,
        permiso
      }, httpOptions).subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token, data.user);
        observer.complete();
        },
       ( error : any) => {
           window.alert(error.error.err);
      })
    });
  }

  setUser(user): void {
    if (user) user.isAdmin = (user.roles.indexOf('admin') > -1);
    this.$userSource.next(user);
    (<any>window).user = user;
  }
}
