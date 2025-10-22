import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
//import * as SignaturePad from 'signature_pad';

@Component({
  standalone: true,
  selector: 'app-signaturepad',
  templateUrl: './signaturepad.component.html',
  styleUrls: ['./signaturepad.component.scss'],
  imports: [ CommonModule ],
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting:  forwardRef(() => SignaturepadComponent)
      }
    ]
})
export class SignaturepadComponent implements ControlValueAccessor, AfterViewInit  {

 @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  @Input() disabled = false;
  disabledMode = false;

  //signature:any;
  signatureData:any;
  
  onChange = (fileUrl: string) => {};

  onTouched = () => {};

  ngAfterViewInit():void {
    this.initializeCanvas();
    if (this.signatureData) {
      this.loadSignature(this.signatureData);
    }
    this.disabledMode = this.disabled; 
  }
   
  private initializeCanvas() {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000000';

    
    /*// Handle high DPI displays
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvasEl.width = canvasEl.offsetWidth * ratio;
    canvasEl.height = canvasEl.offsetHeight * ratio;
    this.ctx.scale(ratio, ratio);*/
  }

  writeValue(obj: any): void {
   this.signatureData = obj;
    if (this.canvas && this.ctx) {
      const canvasEl = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      if (obj) {
        const img = new Image();
        img.src = obj;
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
        };
      }  
         
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    //this.disabled = isDisabled;
    // Disable canvas drawing logic here
    const canvasEl = this.canvas?.nativeElement as HTMLCanvasElement;
    if (canvasEl) {
      canvasEl.style.pointerEvents = this.disabled ? 'none' : 'auto';
    }
  }
  ngOnInit(): void {

  }
  onBlur(): void {
    this.onTouched();
  }

    // Called when the input value changes
  onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.signatureData = newValue;
    this.onChange(newValue);
  }

  
  /*ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
  }*/

  startDrawing(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.drawing = true;
    this.ctx.beginPath();

    const pos = this.getPosition(event);
    this.ctx.moveTo(pos.x, pos.y);
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.drawing) return;
    event.preventDefault();

    const pos = this.getPosition(event);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
    this.save();
  }

  private loadSignature(dataUrl: string): void {
    const img = new Image();
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };
    img.src = dataUrl;
   
  }

  save(): void {
    if (this.disabled) return;
    
    this.signatureData = this.canvas.nativeElement.toDataURL('image/png');
    this.onChange(this.signatureData);
    this.onTouched();
  }

  clear() {
    const canvasEl = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
  }

  private getPosition(event: MouseEvent | TouchEvent) {
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();

    if (event instanceof MouseEvent) {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    } else {
      const touch = event.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  }

  getImageDataUrl(): string {
    //const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    return this.canvas.nativeElement.toDataURL('image/png');
  }


}
