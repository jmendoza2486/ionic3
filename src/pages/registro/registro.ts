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
  identificacion: string = "";
  usuario: string = "";
  contrasena: string = "";
  conf_contrasena: string = "";
  email: string = "";
  conf_email: string = "";

  objUsuario : object = {
    nombre: '',
    identificacion:'',
    usuario: '',
    contrasena: '',
    email: '',
    tipo:''
  };

  msj_obligatorio: string = "Campo obligatorio";
  msj_confirmacion: string = "No coinciden los valores";
  msj_existeUsuario : string = "Este usuario ya existe";
  alertas: boolean[] = [false,false,false,false,false,false,false,false];
  registro: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public servApi : ServicioApiProvider) {
    //this.nombre = this.navParams.get('nombre');
  }

  reiniciaEstadosAlertas(){
    this.alertas = [false,false,false,false,false,false,false,false,false];    
    this.registro = true;
  }

  validaRegistro(){
    if(this.nombre == ""){
      this.alertas[0]=true;
      this.registro = false;
    }
    if(this.identificacion == ""){
      this.alertas[8]=true;
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

      this.objUsuario['nombre']=this.nombre;
      this.objUsuario['identificacion']=this.identificacion;
      this.objUsuario['usuario']=this.usuario;
      this.objUsuario['contrasena']=this.contrasena;
      this.objUsuario['email']=this.email;
      this.objUsuario['tipo']='Civil';


      //console.log("OBJETO DEL USUARIO: ",this.objUsuario)

      this.servApi.existeUsuario(this.usuario).then( existe =>{
        if(existe == true){
          console.log("YA EXISTE ESTE USUARIO EN BD");
          this.alertas[7]=true;
          this.registro = false;
        }
        else {
          console.log("NO EXISTE ESTE USUARIO EN BD");    

          this.servApi.registroUsuario(this.objUsuario).then(data => {
            console.log("creado el usuario: ", data);
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
      })
      
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

  cancelar(){
    this.navCtrl.pop();
  }
}
