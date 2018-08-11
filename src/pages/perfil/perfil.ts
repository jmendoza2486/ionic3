import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  character;
  data: object;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.data = this.navParams.get('data');    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
