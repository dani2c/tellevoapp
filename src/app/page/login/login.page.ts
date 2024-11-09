import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { LocaldbService } from 'src/app/services/localdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mensaje: string = "";

  usr: usuarioLog = {
    username: '',
    correo: '',
    clave: '',
    nombre: '',
    apellido: ''
  };

  constructor(
    private db: LocaldbService, 
    private router: Router, 
    private toastController: ToastController, 
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El usuario o la clave ingresada no son las correctas',
      duration: 1500,
      position: position,
      color: 'danger',
      header: 'Error',
      cssClass: 'textoast',
    });
    await toast.present();
  }

  async login() {
    const busqueda = await this.db.obtener(this.usr.username);

    if (busqueda !== null) {
      if (busqueda.username === this.usr.username && busqueda.clave === this.usr.clave) {
        // Guardar el username del usuario activo
        await this.db.guardar('usuarioActivo', this.usr.username);
        this.router.navigate(['/home']);
      } else {
        this.presentToast('top');
      }
    } else {
      this.presentToast('top');
    }
  }

  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  goToRecuperar() {
    this.navCtrl.navigateForward('/recuperar');
  }
}
