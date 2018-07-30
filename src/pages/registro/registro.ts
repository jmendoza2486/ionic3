import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  nombre: string = "";
  apellido: string = "";
  usuario: string = "";
  contrasena: string = "";
  conf_contrasena: string = "";
  email: string = "";
  conf_email: string = "";
  msj_obligatorio: string = "Campo obligatorio";
  msj_confirmacion: string = "No coinciden los valores";
  alertas: boolean[] = [false,false,false,false,false,false,false];
  registro: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    //this.nombre = this.navParams.get('nombre');
  }

  reiniciaEstadosAlertas(){
    this.alertas = [false,false,false,false,false,false,false];    
    this.registro = true;
  }

  validaRegistro(){
    if(this.nombre == ""){
      this.alertas[0]=true;
      this.registro = false;
    }
    if(this.apellido == ""){
      this.alertas[1]=true;
      this.registro = false;
    }
    if(this.usuario == ""){
      this.alertas[2]=true;
      this.registro = false;
    }
    if(this.contrasena == ""){
      this.alertas[3]=true;
      this.registro = false;
    }
    if(this.conf_contrasena == "" || this.contrasena !== this.conf_contrasena){
      this.alertas[4]=true;
      this.registro = false;
    }
    if(this.email == ""){
      this.alertas[5]=true;
      this.registro = false;
    }
    if(this.conf_email == "" || this.email !== this.conf_email){
      this.alertas[6]=true;
      this.registro = false;
    }    
  }

  confirmaRegistro(){
    if(this.registro){
      let alert = this.alertCtrl.create({
        title: 'Registro exitoso!',
        subTitle: 'Bienvenido ' + this.nombre.toUpperCase() + ', ya puedes iniciar sesión.',
        buttons: [
          {
            text: 'Iniciar',
            handler:()=>{
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
  }

  creaRegistro(){
    this.reiniciaEstadosAlertas();
    this.validaRegistro();
    this.confirmaRegistro();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
