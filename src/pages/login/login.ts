import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
import { AlertController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor( public navCtrl: NavController,
              public alertCtrl: AlertController,
               public loadingCtrl: LoadingController ) {
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

    //es un venta que nos muestra que esta verificando si username existe
    setTimeout(() =>{
      loading.dismiss();
    }, 3000);

  }

}
