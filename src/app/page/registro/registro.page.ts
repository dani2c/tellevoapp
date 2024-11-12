import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async registro() {
    const userData = { nombre: this.nombre, apellido: this.apellido };
    try {
      // Llamada a Firebase para registrar el usuario
      await this.firebaseService.registrarUsuario(this.email, this.password, userData);

      // Mostrar un mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Usuario registrado exitosamente',
        duration: 2000,
        color: 'success',
      });
      await toast.present();

      // Navegar a la página de inicio de sesión después de registrarse
      this.router.navigate(['/login']);

    } catch (error: any) {
      // Manejo de errores: el mensaje de error se obtiene y muestra de manera segura
      const errorMessage = error?.message || 'Error desconocido al registrar usuario';
      const toast = await this.toastController.create({
        message: `Error al registrar usuario: ${errorMessage}`,
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


