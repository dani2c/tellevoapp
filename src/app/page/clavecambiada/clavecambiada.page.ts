import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-clavecambiada',
  templateUrl: './clavecambiada.page.html',
  styleUrls: ['./clavecambiada.page.scss'],
})
export class ClavecambiadaPage {

  constructor(private navCtrl: NavController) { }

  goToLogin(){
    this.navCtrl.navigateForward('/login')
  }

}
