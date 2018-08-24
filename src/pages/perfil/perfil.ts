import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { Base64 } from '@ionic-native/base64';

import {ServicioApiProvider} from '../../providers/servicio-api/servicio-api';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  image: string = null;
  nombre : string = '';
  identificacion : string = '';
  email : string = '';
  civil : boolean = true;
  alertas: boolean[] = [false,false];
  registro: boolean = true;
  msj_obligatorio: string = "Campo obligatorio";

  data: object;
  objUsuario : object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private camera: Camera,
    //private base64: Base64,
    public servApi : ServicioApiProvider
  ) {
      this.data = this.navParams.get('data');    
      console.log("DATOS USER EN PERFIL: ",this.data['nombre'])
      this.nombre = this.data['nombre'];
      this.email = this.data['email'];
      this.identificacion = this.data['identificacion'];
      this.image = this.data['foto'];
      if(this.data['tipo'] == 'Agente'){
        this.civil = false;
      }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  activarAgente(){
    let alert = this.alertCtrl.create({
      title: 'Perfil SeoK',
      subTitle: 'Activar modo Agente',
      inputs : [{
          placeholder: 'Código de activación'
        }
      ],
      buttons: [
        {
          text: 'Validar',
          handler:(codigo)=>{
            this.validarAgente(codigo);
          }
        }
      ]
    });
    alert.present();
  }

  validarAgente( codigo ){
    console.log("Inicia proceso activar agente: ",codigo[0]);
    
    let alert = this.alertCtrl.create({
      title: 'Error - Activar Agente',
      subTitle: 'No se pudo activar el modo Agente',
      buttons: [{
          text: 'OK'
      }]
    });

    this.servApi.consultaCodigoAgente(this.data['id'],codigo[0]).then(data => {
      console.log("Coincidio codigo:", data[0].codigo);
      
      this.objUsuario = this.data;
      this.objUsuario['nombre']=this.nombre;
      this.objUsuario['identificacion']=this.identificacion;
      this.objUsuario['email']=this.email;
      this.objUsuario['tipo']='Agente';
      this.objUsuario['foto'] = this.image;

      console.log("Objeto",this.objUsuario);

      this.servApi.actualizaUsuario(this.data['id'],this.objUsuario).then(data => {
        let alert = this.alertCtrl.create({
          title: 'Perfil SeoK',
          subTitle: 'Modo Agente Activado',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        alert.present();
      
      }).catch(function (err) {
          console.log("ERROR actualizando USUARIO");        
          alert.present();
      });
      
    }).catch(function (err) {
        console.log("ERROR codigo invalido para Agente");        
        alert.present();
    });
  }

  tomarFoto(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options ).then(imageData => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.image = data:image/jpeg;base64,${imageData};
      this.image = base64Image;
      console.log('FOTO EN MEMORIA: ', base64Image);
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
    if(this.identificacion == ""){
      this.alertas[2]=true;
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
     
      this.objUsuario = this.data;
      this.objUsuario['nombre']=this.nombre;
      this.objUsuario['identificacion']=this.identificacion;
      this.objUsuario['email']=this.email;
      this.objUsuario['foto'] = this.image;
      
      console.log("Datos para acutalizar: ",this.data['id'],this.objUsuario );

      this.servApi.actualizaUsuario(this.data['id'],this.objUsuario).then(data => {
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
