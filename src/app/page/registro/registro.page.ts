import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit{

  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async registro() {
    const userData = { nombre: this.nombre, apellido: this.apellido };
    try {
      await this.firebaseService.registrarUsuario(this.email, this.password, userData);
      this.presentAlert('Registro exitoso', 'Bienvenido a TeLlevoApp');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Error al registrar usuario. Inténtelo de nuevo.');
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Usted se ha registrado con éxito',
      message: 'Bienvenido a TeLlevoApp',
      buttons: [{
        text:'Continuar',
        handler:()=>{
          
          this.router.navigate(['/login']);
        }
      }],
    });
    await alert.present();
  }


  goToLogin(){
    this.navCtrl.navigateForward('/login')
  }
  goToRegistrado(){
    this.navCtrl.navigateForward('/registrado')
  }
}
