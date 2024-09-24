import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-claveolvidada',
  templateUrl: './claveolvidada.page.html',
  styleUrls: ['./claveolvidada.page.scss'],
})
export class ClaveolvidadaPage {

  constructor(private alertController: AlertController,
    private navCtrl: NavController) { }

  
  goToClaveolvidada(){
    this.navCtrl.navigateForward('/claveolvidada')
  }
  goToClavecambiada(){
    this.navCtrl.navigateForward('/clavecambiada')
  }
}
