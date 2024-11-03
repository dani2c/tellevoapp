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

  mensaje:string=""

  usr:usuarioLog={
    username:'',
    correo:'',
    clave:'',
    nombre:'',
    apellido:''
  }

  constructor(private db:LocaldbService, private router:Router, private toastController:ToastController, private navCtrl: NavController) { }

  ngOnInit() {
  }

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

  /**async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Acceso denegado',
      message: 'usuario y/o password incorrecto',
      buttons: [{
        id:'aceptar del alert controller',
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler:()=>{
          console.log(event);
        }
      },{
        text:'Cancelar',
        cssClass:'color-cancelar'
      }],
    });

    await alert.present();
  }**/
  login(){

    let busqueda = this.db.obtener(this.usr.username)
    busqueda.then(datos => {
      if (datos !== null) {
        //clg(datos.username)
      if(datos.username===this.usr.username && datos.clave===this.usr.clave){
        this.router.navigate(['/home'])
      }

      } else {
        this.presentToast('top');

      }
    });
    /**console.log(this.usr);
    if(this.usr.correo=="a" && this.usr.clave=="a"){
      this.mensaje="Ok"
      this.usr.correo='';
      this.usr.clave=''
      this.router.navigate(['/home'])
    }
    else{
      this.mensaje="Acceso denegado"
    }**/
  } 
  
  goToRegistro(){
    this.navCtrl.navigateForward('/registro')
  }
  goToRecuperar(){
    this.navCtrl.navigateForward('/recuperar')
  }
}
