import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';

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

  constructor(private alertctrl:AlertController, private router:Router) { }

  ngOnInit() {
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
      this.alerta()
    }
  } 
  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Acceso denegado',
      subHeader: 'usuario y/o password incorrecto',
      message: 'eso!!',
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
  
  

}
