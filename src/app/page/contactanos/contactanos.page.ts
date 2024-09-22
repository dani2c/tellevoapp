import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage{

  constructor(private navCtrl: NavController) {}
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }

}
