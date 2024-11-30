import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        this.firebaseService.obtenerUsuario(user.uid).subscribe(usuarioData => {
          if (usuarioData) {
            this.usuario = {
              nombre: usuarioData.nombre,
              apellido: usuarioData.apellido,
              correo: user.email,
              telefono: usuarioData.telefono,
            };
          } else {
            console.error('No se encontraron datos para este usuario.');
          }
        });
      } else {
        console.error('No hay un usuario autenticado.');
      }
    });
  }
}

