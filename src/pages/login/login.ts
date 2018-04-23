import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
import { AlertController } from "ionic-angular";
import {UsuarioProvider} from "../../providers/usuario/usuario";
import { HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor( public navCtrl: NavController,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public _usuarioprov: UsuarioProvider ) {
  }

  //metodo que controla las pantallas de login para que usuario
  //sin poder registrarse no pase a otra pantalla
  ionViewDidLoad() {

    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;

  }

  //controla el loguin para poder añadir tu usuario
  mostrarInput(){

    this.alertCtrl.create({
      title: 'Ingrese el usuario',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },{
        text: 'Ingresar',
        handler: data =>{
          console.log(data);

          //esta comando lo que hace llamae a la funcion de
          //verificacion y pasa los datos que nos ingresa usuario
          this.verificarUsuario( data.username )
        }
      }]
    }).present();

  }

  // metodo que comprueba si nuestro usuario esta registrado
  // o no por la clave que va ingresar
  verificarUsuario( clave: string){
    let loading = this.loadingCtrl.create({
      content: 'Verificando'
    });

    //nos muestra que clave resibimos
    console.log(clave);
    loading.present();

    this._usuarioprov.verificaUsuario( clave )
      .then( existe =>{

        //es un venta que nos muestra que esta verificando si username existe
          loading.dismiss();

        if ( existe ){
          this.slides.lockSwipes(false);
          this.slides.freeMode = true;
          this.slides.slideNext();
          this.slides.lockSwipes(true);
          this.slides.freeMode = false;
        }else {
          this.alertCtrl.create( {
            title: 'Usuario incorecto',
            subTitle: 'Poner en contacto con administraddor o prueba de nuevo',
            buttons: ['Aceptar']
          }).present();
        }
      })

  }

  ingresar(){

    this.navCtrl.setRoot( HomePage );
  }

}
