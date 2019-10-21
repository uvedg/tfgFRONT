import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  uri = 'http://localhost:3000/api';

  pistas = [];

  constructor(private http: HttpClient) { }

  mostrarPistasService() {
    return this.http.get(this.uri + '/obtenerPista');
  }
}
