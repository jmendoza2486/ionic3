import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  nombre: string;
  data: object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre = this.navParams.get('nombre');
    this.data = this.navParams.get('data');
    console.log("Recibe: ",this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
