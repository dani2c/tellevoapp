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
      if (navigator.onLine) {
        // **Inicio de sesión con conexión a Internet**
        const userCredential = await this.firebaseService.iniciarSesion(this.email, this.password);
        const user = userCredential.user; // Ahora 'userCredential' tiene la propiedad 'user'
  
        if (user) {
          // Guardar datos en Local Storage
          const usuarioData = {
            email: this.email,
            password: this.password, // Nota: solo almacenar contraseñas encriptadas si es necesario
          };
          localStorage.setItem('usuario', JSON.stringify(usuarioData));
  
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso',
            duration: 2000,
            color: 'success',
          });
          await toast.present();
  
          this.router.navigate(['/home']);
        }
      } else {
        // **Inicio de sesión offline**
        const usuarioLocal = JSON.parse(localStorage.getItem('usuario') || '{}');
  
        if (usuarioLocal.email === this.email && usuarioLocal.password === this.password) {
          const toast = await this.toastController.create({
            message: 'Inicio de sesión offline exitoso',
            duration: 2000,
            color: 'success',
          });
          await toast.present();
  
          this.router.navigate(['/home']);
        } else {
          throw new Error('Credenciales no válidas en modo offline');
        }
      }
    } catch (error: any) {
      const errorMessage = this.obtenerMensajeError(error?.code || error.message);
      const toast = await this.toastController.create({
        message: `Error: ${errorMessage}`,
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }
  

  obtenerMensajeError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No se encontró un usuario con ese correo.';
      case 'auth/wrong-password':
        return 'La contraseña ingresada es incorrecta.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'Credenciales no válidas en modo offline':
        return 'No se encontraron credenciales locales válidas.';
      default:
        return 'Algo salió mal. Por favor, verifica tus datos.';
    }
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}






