import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pidiendo-auto',
  templateUrl: './pidiendo-auto.page.html',
  styleUrls: ['./pidiendo-auto.page.scss'],
})
export class PidiendoAutoPage {

  constructor(private navCtrl: NavController) {}
  goToProgamarViajeConAuto(){
    this.navCtrl.navigateForward('/programar-viaje-con-auto')
  }
  goToProgramarViajeTeniendoAuto(){
    this.navCtrl.navigateForward('/programar-viaje-teniendo-auto')
  }
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }
}