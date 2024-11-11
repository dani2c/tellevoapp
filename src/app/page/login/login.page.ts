import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { LocaldbService } from 'src/app/services/localdb.service';
import { NavController } from '@ionic/angular';
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
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const userCredential = await this.firebaseService.iniciarSesion(this.email, this.password);
      const uid = userCredential.user?.uid;
      if (uid) {
        localStorage.setItem('usuarioActivo', uid); // Guardar UID en almacenamiento local
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.presentToast('Usuario o contraseña incorrectos');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: 'danger',
    });
    await toast.present();
  }

  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  goToRecuperar() {
    this.navCtrl.navigateForward('/recuperar');
  }
}
