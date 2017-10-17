import { Component } from '@angular/core';
import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent   {

  estaSobre:boolean=false;
  permiteCargar:boolean=true;
  archivos:FileItem[]=[];

  constructor(public _cis:CargaImagenesService) { }

  archivoSobreDropZone(e:boolean){//En este metodo recibe lo que la directiva le manda y modifica el valor de esta Sobre
    this.estaSobre=e;
  }

  cargarImagenesFirebase(){
    this.permiteCargar= false;
    this._cis.cargar_imagenes_firebase(this.archivos);
  }

  limpiarArchivos(){
    this.archivos=[];
    this.permiteCargar= true;
  }







}
