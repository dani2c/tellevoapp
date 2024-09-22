import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mensaje:string=""

  usr:usuarioLog={
    correo:'',
    clave:''
  }

  constructor(private alertctrl:AlertController, private router:Router, private navCtrl: NavController) { }

  ngOnInit() {
  }
  async alerta(){
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
  }
  enviar(){

    console.log(this.usr);
    if(this.usr.correo=="hola@gmail.com" && this.usr.clave=="hola123"){
      this.mensaje="Ok"
      this.usr.correo='';
      this.usr.clave=''
      this.router.navigate(['/home'])
    }
    else{
      this.mensaje="Acceso denegado"
    }
  } 
  
  goToRegistro(){
    this.navCtrl.navigateForward('/registro')
  }
  goToRecuperar(){
    this.navCtrl.navigateForward('/recuperar')
  }
}
