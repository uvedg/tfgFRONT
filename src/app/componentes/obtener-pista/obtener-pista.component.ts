import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-obtener-pista',
  templateUrl: './obtener-pista.component.html',
  styleUrls: ['./obtener-pista.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class ObtenerPistaComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ubicacion: string;
  fecha: string;
  inicioHora: string;
  finHora: string;

  obtenerPistaForm: FormGroup;
  
  products: any;
  
  ngOnInit() {
    this.buildForm();
    this.initForm();
  }

  buildForm() {
    this.obtenerPistaForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      fecha: ['', Validators.required],
      inicioHora: ['', Validators.required],
      finHora: ['', Validators.required]
    });
  }

  initForm() {
    this.obtenerPistaForm = new FormGroup({
      ubicacion: new FormControl(),
      fecha: new FormControl(),
      inicioHora: new FormControl(),
      finHora: new FormControl()
    })
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  public obtenerPista() {
    const pista = this.obtenerPistaForm.value;

    this.router.navigate(['/api/mostrarPista'], {queryParams: pista});
  }

}
