import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {ServicioApiProvider} from '../../providers/servicio-api/servicio-api';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  image: string = null;
  nombre : string = '';
  email : string = '';
  alertas: boolean[] = [false,false];
  registro: boolean = true;
  msj_obligatorio: string = "Campo obligatorio";

  data: object;
  objUsuario : [{}] = [{}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private camera: Camera,
    public servApi : ServicioApiProvider
  ) {
    this.data = this.navParams.get('data');    
    console.log("DATOS USER EN PERFIL: ",this.data['nombre'])
    this.nombre = this.data['nombre'];
    this.email = this.data['email'];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  tomarFoto(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
    console.log("Foto tomada: ", this.image);
  }

  validaDatos(){
    if(this.nombre == ""){
      this.alertas[0]=true;
      this.registro = false;
    }
    if(this.email == ""){
      this.alertas[1]=true;
      this.registro = false;
    }
    return this.registro;
  }

  actualizar(){

    let alert = this.alertCtrl.create({
      title: 'Error - Registro usuario',
      subTitle: 'No se pudo registrar el usuario',
      buttons: [{
          text: 'OK'
      }]
    });

    if(this.validaDatos()){
      this.objUsuario.push({
        nombre: this.nombre, 
        usuario:this.data['usuario'], 
        contrasena:this.data['contrasena'],
        email : this.email
      });
      
      console.log("Datos para acutalizar: ",this.data['id'],this.objUsuario[1] );

      this.servApi.actualizaUsuario(this.data['id'],this.objUsuario[1]).then(data => {
        let alert = this.alertCtrl.create({
          title: 'Actualización Perfil',
          subTitle: 'Actualización exitosa.',
          buttons: [
            {
              text: 'Ok',
              handler:()=>{
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }).catch(function (err) {
          console.log("ERROR actualizando USUARIO");        
          alert.present();
      });
    }
  }

  cancelar(){
    this.navCtrl.pop();
  }
}
