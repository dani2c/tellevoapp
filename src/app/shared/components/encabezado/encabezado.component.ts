import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent {
  constructor(private navCtrl: NavController, private firebaseService: FirebaseService) {}

  async cerrarSesion() {
    console.log('Intentando cerrar sesión...');
    try {
      await this.firebaseService.cerrarSesion();
      console.log('Sesión cerrada correctamente.');
      this.navCtrl.navigateRoot('/login'); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  goToPerfil() {
    console.log('Navegando al perfil...');
    this.navCtrl.navigateForward('/perfil'); // Navegar a la página de perfil
  }
}

