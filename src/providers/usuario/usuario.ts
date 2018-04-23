import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Platform } from "ionic-angular";
import { Storage } from "@ionic/storage";
import {Pro} from "@ionic/pro";

@Injectable()
export class UsuarioProvider {

  clave: string;
  user: any = {};

  constructor( private afDB: AngularFirestore,
               private platform: Platform,
               private storage: Storage ) {
  }

  verificaUsuario( clave: string){

    //es por si la clave que ingresa y esta en mayuscula
    //convertir resto  en menuscula
    console.log("clave: " + clave)
    clave = clave.toLocaleLowerCase();
    console.log(clave)
    return new Promise( (resolve, reject) =>{

      this.afDB.doc(`/usuarios/${clave}`)
        .valueChanges().subscribe( data =>{
          console.log(data);
          if( data ) {
            // correcto
            this.clave = clave;
            this.user = data;
            this.guardarStorage();
            resolve(true);

          }else {
            //incorrectoc
            resolve(false);
          }
        })

    });

  }

  guardarStorage(){
    if ( this.platform.is('cordova') ){
      //Movil
      this.storage.set( 'clave', this.clave );
    }else {
      //navigador
      localStorage.setItem( 'clave', this.clave );
    }
  }

  cargarStorage(){

    return new Promise( (resolve, reject) =>{

      if (this.platform.is('cordova') ){
        //mobil

        this.storage.get( 'clave' ).then( val => {
          if ( val ){
            this.clave = val;
            resolve( true );
          }else{
            resolve( false );
          }
        })
      }else{
        //escritorio

        if (localStorage.getItem( 'clave' )){

          this.clave = localStorage.getItem( 'clave' );
          resolve(true);

        }else{
          resolve(false);
        }
      }

    });

  }

}
