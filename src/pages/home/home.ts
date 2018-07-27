import { InicioPage } from './../inicio/inicio';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario : string = "";
  pagina = InicioPage;

  constructor(private NavParams: NavParams ,private navCtrl: NavController, public alertCtrl: AlertController) {

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Sesión iniciada...Hola: ' + this.usuario,
      buttons: [{
        text: 'Iniciar',
        handler: data => {
          console.log(data);
          this.navCtrl.push(this.pagina,{ 'nombre':this.usuario });
        }
      }]
    });
    console.log('recibe: ' + this.usuario);
    alert.present();
  }

  showAlertRecuperar() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      subTitle: 'Escribe tu correo para recuperar tu contraseña.',
      inputs : [{
          placeholder: 'Correo electrónico'
        },
        {
          placeholder: 'Correo electrónico2'
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
      subTitle: 'Acabamos de enviarte un mensaje a tu correo: ' + data[0] + ', ' + data[1],
      buttons: ['OK']
    });
    alert.present();
  }
}
