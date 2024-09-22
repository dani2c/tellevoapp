import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-simulacion',
  templateUrl: './home-simulacion.page.html',
  styleUrls: ['./home-simulacion.page.scss'],
})
export class HomeSimulacionPage {

  constructor(private navCtrl: NavController) {}
  goToCancelarPedido(){
    this.navCtrl.navigateForward('/cancelar-pedido')
  }
}
