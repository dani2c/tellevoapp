import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-programar-viaje-con-auto',
  templateUrl: './programar-viaje-con-auto.page.html',
  styleUrls: ['./programar-viaje-con-auto.page.scss'],
})
export class ProgramarViajeConAutoPage {

  constructor(private navCtrl: NavController) {}
  goToSeleccionarViajesDisponibles(){
    this.navCtrl.navigateForward('/seleccionar-viajes-disponibles')
  }
  goToPidiendoAuto(){
    this.navCtrl.navigateForward('/pidiendo-auto')
  }
}
