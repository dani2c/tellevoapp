import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-encabezado2',
  templateUrl: './encabezado2.component.html',
  styleUrls: ['./encabezado2.component.scss'],
})
export class Encabezado2Component {
  @Input() mostrarBotonVolver: boolean = false;

  constructor(private navCtrl: NavController) { }

  volverAtras() {
    this.navCtrl.back(); // Navega hacia la ventana anterior
  }

  ngOnInit() {}

}
