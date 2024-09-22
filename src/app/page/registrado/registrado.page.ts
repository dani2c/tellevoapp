import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-registrado',
  templateUrl: './registrado.page.html',
  styleUrls: ['./registrado.page.scss'],
})
export class RegistradoPage {

  constructor(private navCtrl: NavController) { }

  goToLogin(){
    this.navCtrl.navigateForward('/login')
  }

}
