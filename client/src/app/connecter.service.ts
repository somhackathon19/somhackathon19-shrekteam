import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ConnecterService {

  constructor(private httpClient: HttpClient) {
  }

  api = 'http://localhost:3000/api';

  async login(email: string, password: string) {
    this.httpClient.post(this.api + '/login', {email: email, password: password});
  }

  async signin(email: string, password: string, nom: string, cognoms: string, dni: string) {
    return this.httpClient.post(this.api + 'signin', {
      email: email,
      firstName: nom,
      secondName: cognoms,
      password: password,
      dni: dni
    });
  }

  async getPeople(): Promise<any> {
    // return this.httpClient.get(this.api + '/users');
    $.get( this.api + '/users', function( data ) {
      return data;
    });
  }

  getIncidencies() {
    var realData;
    // return this.httpClient.get(this.api + '/incidents');
    $.get( this.api + '/incidents', function( data ) {
      realData = data;
      
      console.log("DATA: ", realData);
      return realData;
    });
  }

  async afegirIncidencia(data: {}) {
    // this.httpClient.post(this.api + '/incidents', data);
    $.ajax({
      type: 'POST',
      url: this.api + '/incidents',
      data: data
    });
  }

  async afegirRute(data: {}) {
    // this.httpClient.post(this.api + '/routes', data);
    $.ajax({
      type: 'POST',
      url: this.api + '/routes',
      data: data
    });
  }
}
