import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async registro() {
    const userData = { nombre: this.nombre, apellido: this.apellido };
    try {
      await this.firebaseService.registrarUsuario(this.email, this.password, userData);
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/login']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al registrar el usuario',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
