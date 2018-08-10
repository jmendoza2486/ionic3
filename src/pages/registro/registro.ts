import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import {ServicioApiProvider} from '../../providers/servicio-api/servicio-api';

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

  objUsuario : [{}] = [{}];
    /*nombre: '',
    apellido: '',*/
    //usuario: '',
    //contrasena: ''/*,
    //email: ''*/
  //}];

  msj_obligatorio: string = "Campo obligatorio";
  msj_confirmacion: string = "No coinciden los valores";
  alertas: boolean[] = [false,false,false,false,false,false,false];
  registro: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public servApi : ServicioApiProvider) {
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
    
    let alert = this.alertCtrl.create({
      title: 'Error - Registro usuario',
      subTitle: 'No se pudo registrar el usuario',
      buttons: [{
          text: 'OK'
      }]
    });

    if(this.registro){

      this.objUsuario.push({nombre: this.nombre, 
                            usuario:this.usuario, 
                            contrasena:this.contrasena,
                            apellido: this.apellido,
                            email : this.email
                          });

      console.log("OBJETO DEL USUARIO: ",this.objUsuario)

      this.servApi.registroUsuario(this.objUsuario[1]).then(data => {
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
      }).catch(function (err) {
          console.log("ERROR REGISTRANDO USUARIO");        
          alert.present();
      });

      
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
