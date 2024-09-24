import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-codigoclave',
  templateUrl: './codigoclave.page.html',
  styleUrls: ['./codigoclave.page.scss'],
})
export class CodigoclavePage  {

  constructor(private alertController: AlertController,
    private navCtrl: NavController) { }

    goToRegistro(){
      this.navCtrl.navigateForward('/registro')
  }
    goToClaveolvidada(){
    this.navCtrl.navigateForward('/claveolvidada')
  }
   
  alertButtons = ['Aceptar'];
  
}
