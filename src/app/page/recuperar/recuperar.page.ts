import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController
  ) {}

  async enviarRecuperacion() {
    try {
      await this.firebaseService.recuperarContrasena(this.email);
      const toast = await this.toastController.create({
        message: 'Correo de recuperación enviado.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al enviar el correo de recuperación.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}


