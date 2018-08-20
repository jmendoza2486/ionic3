import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicioApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioApiProvider {

  base : string = 'https://api-seok.herokuapp.com/';//'http://localhost:3000/api';
  datos : object;

  constructor(public http: HttpClient) {
    console.log('Hello ServicioApiProvider Provider');
  }

  registroReporte(objReporte): Promise<any> {
    return this.http.post(this.base + '/reportes',
    objReporte
    )
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("REGISTRO EN API",response);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }
  
  actualizaUsuario(objId, objUsuario): Promise<any> {
    return this.http.put(this.base + '/usuarios/'+objId,
      objUsuario
    )
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("ACTUALIZA EN API",response);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }

  registroUsuario(objUsuario): Promise<any> {
    return this.http.post(this.base + '/usuarios',
      objUsuario
    )
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("REGISTRO EN API",response);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }

  consultaUsuario( userId ){
    console.log("ID A BUSCAR EN API", userId);
    return this.http.get(this.base + '/usuarios/'+userId)
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("Encontro usuario API: ", response);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }

  consultaCodigoAgente(idUsuario, codigo): Promise<any> {
    console.log("API - codigo agente", idUsuario, codigo);
    return this.http.get(this.base + '/codigosAgentes/?filter[where][and][0][idUsuario]='+idUsuario+'&filter[where][and][1][codigo]='+codigo)
        .toPromise()
        .then(response => {
          if(typeof response !== 'undefined'){
            console.log("CODIGO AGENTE EN API",response);
            return response;
          }
          else console.log("no existe - API");
        })
        .catch(err => err);
  }

  inicioSesion(usuario,contrasena): Promise<any> {
      return this.http.get(this.base + '/usuarios/?filter[where][and][0][usuario]='+usuario+'&filter[where][and][1][contrasena]='+contrasena)
          .toPromise()
          .then(response => {
              if(typeof response !== 'undefined'){
                console.log("INICIO EN API",response);
                return response;
              }
              else console.log("no existe - API");
          })
          .catch(err => err);
  }


}
