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
  datos : object;

  constructor(public http: HttpClient) {
    console.log('Hello ServicioApiProvider Provider');
  }
  
  inicioSesion(usuario,contrasena): Promise<any> {
      return this.http.get(this.base + '/usuarios/?filter[where][and][0][usuario]='+usuario+'&filter[where][and][1][contrasena]='+contrasena)
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("INICIO EN API",response[0]);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }
}
