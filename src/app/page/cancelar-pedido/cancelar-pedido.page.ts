import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancelar-pedido',
  templateUrl: './cancelar-pedido.page.html',
  styleUrls: ['./cancelar-pedido.page.scss'],
})
export class CancelarPedidoPage {

  constructor(private navCtrl: NavController) {}
  goToHomeSimulado(){
    this.navCtrl.navigateForward('/home-simulacion')
  }
  goToViajeCancelado(){
    this.navCtrl.navigateForward('/viaje-cancelado')  
  }
  
}