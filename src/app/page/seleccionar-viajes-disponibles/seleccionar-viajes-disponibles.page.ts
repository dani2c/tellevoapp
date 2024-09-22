import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-viajes-disponibles',
  templateUrl: './seleccionar-viajes-disponibles.page.html',
  styleUrls: ['./seleccionar-viajes-disponibles.page.scss'],
})
export class SeleccionarViajesDisponiblesPage{

  constructor(private navCtrl: NavController) {}
  goToRealizado(){
    this.navCtrl.navigateForward('/realizado')
  }
  goToProgramarViajeConAuto(){
    this.navCtrl.navigateForward('/programar-viaje-con-auto')
  }
}
