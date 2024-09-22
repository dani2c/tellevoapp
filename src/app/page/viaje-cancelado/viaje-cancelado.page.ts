import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-viaje-cancelado',
  templateUrl: './viaje-cancelado.page.html',
  styleUrls: ['./viaje-cancelado.page.scss'],
})
export class ViajeCanceladoPage {

  constructor(private navCtrl: NavController) {}
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }
}
