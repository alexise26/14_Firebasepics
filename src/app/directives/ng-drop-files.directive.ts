import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import {FileItem} from '../models/file-item';

@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos:FileItem[]=[];
  @Output() archivoSobre:EventEmitter<any>= new EventEmitter();


  constructor(public elemento:ElementRef) {}

  @HostListener('dragenter',['$event']) //Este evento emite un true cuando el mouse esté sobre la caja
  public onDragEnter(event:any){
    this.archivoSobre.emit(true);//emite true cuando esté sobre
  }
  @HostListener('dragleave',['$event']) //Este evento emite un false cuando el mouse salga de la caja
  public onDragLeave(event:any){
    this.archivoSobre.emit(false);//emite false cuando sale
  }

  @HostListener('dragover',['$event']) //Este evento emite un false cuando el mouse salga de la caja
  public onDragover(event:any){
    let transferencia=this.getTrasferencia(event);
    transferencia.dropEffect='copy';

    this.archivoSobre.emit(true);//emite false cuando sale
    this._prevenirYdetener(event);
  }

  @HostListener('drop',['$event'])
  public onDrop(event:any){

    let transferencia=this.getTrasferencia(event);

    if (!transferencia) {
        return;
    }
    this._agregarArchivos(transferencia.files);
    this.archivoSobre.emit(false);//Quitar lo azul después de soltar archivos
    this._prevenirYdetener(event);
  }

  private getTrasferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos(archivosLista:FileList){

    for(let propiedad in Object.getOwnPropertyNames(archivosLista)){
      let archTemp = archivosLista[propiedad];

      if (this._archivoPuedesercargado(archTemp)) {
          let nuevoArchivo = new FileItem(archTemp);
          this.archivos.push(nuevoArchivo);

      }
    }
    //console.log(this.archivos);
  }

  private _archivoPuedesercargado(archivo:File){
    if (!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)  ) {
      return true
    }
    else{return false}
  }

  private _prevenirYdetener(event:any){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDropeado(nombreArchivo:string):boolean{

    for(let i in this.archivos){
      let arch = this.archivos[i];

      if (arch.archivo.name == nombreArchivo) {
          console.log("Archivo ya existe en la lista", nombreArchivo);
          return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo:string):boolean{
    return(tipoArchivo == '' || tipoArchivo == undefined) ? false : tipoArchivo.startsWith("image");
  }

}
