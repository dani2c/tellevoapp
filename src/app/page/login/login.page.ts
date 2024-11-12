import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async login() {
    try {
      await this.firebaseService.iniciarSesion(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Usuario o contraseña incorrectos',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
