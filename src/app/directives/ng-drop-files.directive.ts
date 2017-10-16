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
    this.archivoSobre.emit(true);//emite false cuando sale
  }

}
