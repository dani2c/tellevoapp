import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent {
  @Input() mostrarBotonVolver: boolean = false; // Controla si se muestra el botón de "Volver atrás"

  constructor(private navCtrl: NavController) {}

  volverAtras() {
    this.navCtrl.back(); // Navega hacia la ventana anterior
  }

  goToPerfil() {
    this.navCtrl.navigateForward('/perfil'); // Redirige al perfil del usuario
  }

  cerrarSesion() {
    // Aquí puedes agregar lógica adicional para cerrar sesión si es necesario
    console.log('Sesión cerrada');
    this.navCtrl.navigateRoot('/login'); // Redirige al login tras cerrar sesión
  }
}
