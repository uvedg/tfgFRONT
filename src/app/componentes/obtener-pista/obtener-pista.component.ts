import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrapingService } from '../../scraping.service';

@Component({
  selector: 'app-obtener-pista',
  templateUrl: './obtener-pista.component.html',
  styleUrls: ['./obtener-pista.component.scss'],
  styles: [`.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }`]
})

export class ObtenerPistaComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private scrapingService: ScrapingService) { }

  ubicacion: string;
  fecha: string;
  inicioHora: string;
  finHora: string;

  obtenerPistaForm: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.initForm();
    //this.http.get('http://localhost:3000/api/backend').subscribe((data: any) => console.log(data));
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

    //Comprobaciones 
    console.log("Pista a continuacion: ");
    console.log(pista);
    console.log("Obtener pista a continuacion: ");
    console.log(this.obtenerPistaForm);

    //Token y httpheaders
    var token = localStorage.getItem("AuthToken");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.post('http://localhost:3000/api/obtenerPista', pista, httpOptions).subscribe(
    data => {
      console.log(data)
      this.navigate('/api/mostrarPista');
    });
    
    // this.scrapingService.mostrarPistasService()
    //   .subscribe(res => {
    //     this.scrapingService.pistas = res as any;
    //     console.log(res);

    //   })

  }

}
