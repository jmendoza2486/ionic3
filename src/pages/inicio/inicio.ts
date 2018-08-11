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

import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class InicioPage {
  nombre: string;
  data: object;
  map: GoogleMap;

  paginaPerfil = PerfilPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private googleMaps: GoogleMaps) {
    this.nombre = this.navParams.get('nombre');
    this.data = this.navParams.get('data');
    console.log("Recibe: ",this.data);
  }

  
  ionViewDidLoad(){
    this.loadMap();
  }

  //VER Y EDITAR PERFIL
  verPerfil(){
    console.log("Pefil: ", this.data);
    this.navCtrl.push(this.paginaPerfil,{'data': this.data});

    /*let alert = this.alertCtrl.create({
      title: 'Perfil SeoK',
      subTitle: 'Manten tus datos acutalizados ;)',
      inputs : [
        {
          label : 'Nombre',
          placeholder: this.data[0].nombre
        },
        {
          label : 'Usuario',
          placeholder: this.data[0].usuario
        }
      ],
      buttons: [
        {
          text: 'Enviar correo',
          handler: data => {
            console.log(data);
            this.guardarPerfil(data);
          }
        }
      ]
    });
    alert.present();*/
  }

  guardarPerfil(data){
    console.log("Guardar datos bd");
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
