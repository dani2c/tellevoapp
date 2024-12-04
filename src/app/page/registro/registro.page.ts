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
  telefono: string = ''; // Campo para el teléfono

  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async registro() {
    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono, // Agregamos el teléfono al objeto de datos del usuario
    };

    try {
      await this.firebaseService.registrarUsuario(this.email, this.password, userData);
      const toast = await this.toastController.create({
        message: navigator.onLine
          ? 'Usuario registrado exitosamente en Firebase.'
          : 'Usuario guardado localmente. Se sincronizará cuando haya conexión.',
        duration: 3000,
        color: 'success',
      });
      await toast.present();

      // Redirigir al login después de registrar
      this.router.navigate(['/login']);
    } catch (error: any) {
      const errorMessage = error?.message || 'Error desconocido al registrar usuario';
      const toast = await this.toastController.create({
        message: `Error al registrar usuario: ${errorMessage}`,
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}



