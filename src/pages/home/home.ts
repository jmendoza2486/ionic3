import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController  } from 'ionic-angular';

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
  
  objUsuario : [{}] = [{
    nombre: 'jaime',
    usuario: 'jmendoza',
    contrasena: 'jmendoza',
    email: 'email@email.com'
  }];

  paginaInicio = InicioPage;
  paginaRegistro = RegistroPage;

  constructor(
    private NavParams: NavParams ,
    private navCtrl: NavController,
    public alertCtrl: AlertController, 
    public servApi :ServicioApiProvider,
    public loadingCtrl : LoadingController ) {
      
  }

  ionViewCanEnter(){
    this.usuario = "";
    this.contrasena = "";
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
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.validaInicio();

    let alert = this.alertCtrl.create({
      title: 'Error - Inicio de Sesión',
      subTitle: 'Usuario o contraseña invalidos',
      buttons: [{
          text: 'OK'
      }]
    });

    if(this.iniciar){
      /*this.servApi.inicioSesion(this.usuario, this.contrasena).then(data => {
          console.log("INICIO EN PAGE: ",data[0].nombre);
          this.navCtrl.push(this.paginaInicio,{'nombre':data[0].nombre, 'data':data[0]});
      }).catch(function (err) {
          loader.dismiss();
          console.log("USUARIO NO REGISTRADO EN BD");        
          alert.present();
      });*/
      
      this.navCtrl.push(this.paginaInicio,{'nombre':this.usuario, 'data': this.objUsuario[0]});
      
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
