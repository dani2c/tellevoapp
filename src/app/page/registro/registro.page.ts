import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  constructor(private navCtrl: NavController) { }

  goToLogin(){
    this.navCtrl.navigateForward('/login')
  }
  goToRegistrado(){
    this.navCtrl.navigateForward('/registrado')
  }
}
