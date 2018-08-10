import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { InicioPage } from './../inicio/inicio';
import { RegistroPage } from './../registro/registro';
import {ServicioApiProvider} from '../../providers/servicio-api/servicio-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario : string = "";
  contrasena : string = "";
  iniciar : boolean = true;
  msj_obligatorio : string = "Campo obligatorio";
  alertas: boolean[] = [false,false];
  sesion : boolean = false;

  paginaInicio = InicioPage;
  paginaRegistro = RegistroPage;

  constructor(private NavParams: NavParams ,private navCtrl: NavController, public alertCtrl: AlertController, public servApi :ServicioApiProvider) {

  }

  validaInicio(){
    this.iniciar = true;
    this.alertas = [false,false];
    if(this.usuario == ""){
      this.iniciar = false;
      this.alertas[0] = true;
    }
    if(this.contrasena == ""){
      this.iniciar = false;
      this.alertas[1] = true;
    }
  }

  AlertInicio() {
    this.validaInicio();
    if(this.iniciar){
      this.servApi.inicioSesion(this.usuario, this.contrasena).then(data => {
        if(typeof data !== 'undefined'){
          console.log("INICIO EN PAGE: ",data[0].nombre);
          this.sesion = true;
          this.navCtrl.push(this.paginaInicio,{'nombre':data[0].nombre, 'data':data[0]});
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Sesión error!',
            subTitle: 'Usuario o contraseña inválidos'
          })
          alert.present();  
        }
      })

      /*if(!this.sesion){
        let alert = this.alertCtrl.create({
          title: 'Sesión error!',
          subTitle: 'Usuario o contraseña inválidos'
        })
        alert.present();
      }*/
    }    
  }

  AlertRegistro() {
    this.navCtrl.push(this.paginaRegistro,{ 'nombre':this.usuario });    
    console.log('recibe: ' + this.usuario);
  }

  showAlertRecuperar() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      subTitle: 'Escribe tu correo para recuperar tu contraseña.',
      inputs : [{
          placeholder: 'Correo electrónico'
        }
      ],
      buttons: [
        {
          text: 'Enviar correo',
          handler: data => {
            console.log(data);
            this.showAlertConfirmaRecuperar(data);
          }
        }
      ]
    });
    alert.present();
  }

  showAlertConfirmaRecuperar(data) {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      subTitle: 'Acabamos de enviarte un mensaje a tu correo: ' + data[0],
      buttons: ['OK']
    });
    alert.present();
  }
}
