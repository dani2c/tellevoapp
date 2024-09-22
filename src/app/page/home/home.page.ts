import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}
  goToPidiendoAuto(){
    this.navCtrl.navigateForward('/pidiendo-auto')
  }
  goToContactanos(){
    this.navCtrl.navigateForward('/contactanos')
  }
}
