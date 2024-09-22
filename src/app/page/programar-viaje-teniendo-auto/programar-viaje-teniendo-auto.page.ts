import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-programar-viaje-teniendo-auto',
  templateUrl: './programar-viaje-teniendo-auto.page.html',
  styleUrls: ['./programar-viaje-teniendo-auto.page.scss'],
})
export class ProgramarViajeTeniendoAutoPage{

  constructor(private navCtrl: NavController) {}
  goToLeNotificaremos(){
    this.navCtrl.navigateForward('/le-notificaremos')
  }
}
