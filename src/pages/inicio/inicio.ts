import { Component } from '@angular/core';
import { ViewController, AlertController, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import {ServicioApiProvider} from '../../providers/servicio-api/servicio-api';

import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class InicioPage {
  data: object;
  map: GoogleMap;
  objReporte : [{}] = [{}];
  posicion : any;

  paginaPerfil = PerfilPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private servApi : ServicioApiProvider,
    private googleMaps: GoogleMaps) {
    this.data = this.navParams.get('data');
    console.log("Recibe: ",this.data);
  }

  ionViewWillEnter(){
    console.log("REGRESO A PAGINA INICIO");
    //Se actualiza en objeto los datos del usuario como estan en BD
    let alert = this.alertCtrl.create({
      title: 'Error - Retomando Usuario',
      subTitle: 'Usuario no retornado',
      buttons: [{
          text: 'OK'
      }]
    });
    
    this.servApi.consultaUsuario(this.data['id']).then(data => {
        console.log("ACTUALIZO USUARIO: ",data['nombre']);
        this.data = data;
        console.log("Retoma datos usuario: ", this.data);
    }).catch(function (err) {
        console.log("USUARIO NO REGISTRADO EN BD");        
        alert.present();
    })
  }
  
  ionViewDidLoad(){
    this.loadMap();
  }

  //REPORTAR
  
  generarReporte(tipo){

    this.objReporte.push({
      idUsuario: this.data['id'], 
      tipo: tipo, 
      posicionUsuario : this.posicion,
      idAgente : '',
      posicionAgente : ''
    });

    let alert = this.alertCtrl.create({
      title: 'Error - Registro reporte',
      subTitle: 'No se pudo registrar el reporte',
      buttons: [{
          text: 'OK'
      }]
    });
    
    this.servApi.registroReporte(this.objReporte[1]).then(data => {
      let alert = this.alertCtrl.create({
        title: 'Reporte',
        subTitle: 'Tu reporte ha sido enviado',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
    }).catch(function (err) {
        console.log("ERROR REGISTRANDO USUARIO");        
        alert.present();
    });
  }

  reportar(){
    console.log("ENTRA REPORTAR");
    let alert = this.alertCtrl.create({
      title: 'Reportar',
      subTitle: 'Elige el tipo de reporte',
      buttons: [
        {
          text: 'Robo',
          handler: data => {
            console.log("Reportaron Robo");
            this.generarReporte('robo');
          }
        },
        {
          text: 'Accidente',
          handler: data => {
            console.log("Reportaron Accidente");
            this.generarReporte('accidente');
          }
        },
        {
          text: 'Riña',
          handler: data => {
            console.log("Reportaron Riña");
            this.generarReporte('riña');
          }
        }
      ]
    });
    alert.present();
  }

  //VER Y EDITAR PERFIL
  verPerfil(){
    console.log("Pefil: ", this.data);
    this.navCtrl.push(this.paginaPerfil,{'data': this.data});
  }

  //FUNCIONES GOOGLE MAPS
  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });

      this.posicion = response;
      console.log("POSICION GUARDADA", this.posicion);

      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

}
