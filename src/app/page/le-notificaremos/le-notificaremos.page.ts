import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-le-notificaremos',
  templateUrl: './le-notificaremos.page.html',
  styleUrls: ['./le-notificaremos.page.scss'],
})
export class LeNotificaremosPage{

  constructor(private navCtrl: NavController) {}
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }
}
