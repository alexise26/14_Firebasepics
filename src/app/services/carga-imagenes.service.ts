import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {FileItem} from '../models/file-item';

import * as firebase from "firebase";

@Injectable()
export class CargaImagenesService {
  private CARPETA_IMAGENES:string ='img';

  constructor(public af: AngularFirestore) { }


  listaUltimasImagenes(numeroImagenes:number):Observable<any[]>{

    return this.af.collection(`/${this.CARPETA_IMAGENES}`,ref=>(
                      ref.limit(numeroImagenes)
                    )).valueChanges();
  }

  cargar_imagenes_firebase(archivos:FileItem[]){
    console.log(archivos);
    let storageRef = firebase.storage().ref();
    for(let item of archivos){
      item.estaSubiendo = true;
      let uploadTask:firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot:any)=> item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes)*100,
        (error)=> console.error("error al subir ", error),
        ()=>{
          item.url= uploadTask.snapshot.downloadURL;
          item.estaSubiendo=false;
          this.guardarImagen({nombre: item.nombreArchivo, url: item.url});
        }
      )

    }
  }

  private guardarImagen(imagen:any){
    this.af.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }

}
