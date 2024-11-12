import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.firebaseService.iniciarSesion(this.email, this.password);
      const toast = await this.toastController.create({
        message: 'Inicio de sesión exitoso',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/home']);
    } catch (error: any) {
      const errorMessage = error?.message || 'Error desconocido al iniciar sesión';
      const toast = await this.toastController.create({
        message: `Error: ${errorMessage}`,
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


