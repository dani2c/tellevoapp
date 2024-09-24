import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController) { }

  goToRegistro(){
      this.navCtrl.navigateForward('/registro')
  }

  goToCodigoclave(){
    this.navCtrl.navigateForward('/codigoclave')
  }
    /**async confirmarSolicitud(conductor: string) {
      const confirmAlert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas solicitar viajar con ${conductor}?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Solicitud cancelada');
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              this.solicitarViaje(conductor);
            }
          }
        ]
      });**/
}

