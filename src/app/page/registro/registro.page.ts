import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit{

  usr:usuarioLog={
    username:'',
    correo:'',
    clave:'',
    nombre:'',
    apellido:''
  }
  constructor(private navCtrl: NavController,
    private db: LocaldbService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El usuario ingresado ya existe',
      duration: 1500,
      position: position,
      color: 'danger',
      header: 'Error!',
      cssClass: 'textoast',
    });
    await toast.present();
  }

  registro() {
    let buscado = this.db.obtener(this.usr.username)
   
    buscado.then(datos => {
      if (datos === null) {
        this.db.guardar(this.usr.username, this.usr);
        //this.router.navigate(['/login'])
        this.presentAlert();
      } else {
        this.presentToast('top');
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usted se ha registrado con éxito',
      subHeader: '',
      message: 'Bienvenido a TeLlevoApp',
      buttons: [{
        text:'Continuar',
        handler:()=>{
          
          this.router.navigate(['/login']);
        }
      }]
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
