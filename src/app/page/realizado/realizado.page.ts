import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-realizado',
  templateUrl: './realizado.page.html',
  styleUrls: ['./realizado.page.scss'],
})
export class RealizadoPage {

  constructor(private navCtrl: NavController) {}
  goToHomeSimulacion(){
    this.navCtrl.navigateForward('/home-simulacion')
  }
}
