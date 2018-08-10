import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicioApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioApiProvider {

  base : string = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello ServicioApiProvider Provider');
  }
  
  inicioSesion(usuario): Promise<any> {
      return this.http.get(this.base + '/usuarios/findOne?filter=%7B%22name%22%3A%22'+usuario+'%22%7D')
          .toPromise()
          .then(response => {
              return response;
          })
          .catch(err => err);
  }
}
