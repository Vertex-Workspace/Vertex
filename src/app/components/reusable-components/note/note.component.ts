import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { Note } from 'src/app/models/note';

export type ResizeAnchorType =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'

export type ResizeDirectionType =
  | 'x'
  | 'y'
  | 'xy';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input()
  note !: Note;
  @ViewChild('resizeCorner') resizeCornerRef!: ElementRef;

  @ViewChild('wrapper') wrapperRef!: ElementRef;

  @ViewChild('topBar') topBarRef!: ElementRef;

  position: { x: number, y: number } = { x: 100, y: 100 };

  size: { w: number, h: number } = { w: 200, h: 200 };

  lastPosition!: { x: number; y: number; };

  lastSize !: { w: number, h: number };

  minSize: { w: number, h: number } = { w: 200, h: 200 };

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _el: ElementRef) { }

  startDrag($event: { preventDefault: () => void; clientX: any; clientY: any; }): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e: { clientX: number; clientY: number; }) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = { ...this.position };
    };

    const finishDrag = (e: any) => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }

  startResize($event: { preventDefault: () => void; clientX: any; clientY: any; }, anchors: ResizeAnchorType[], direction: ResizeDirectionType): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;
    const lastX = this.position.x;
    const lastY = this.position.y;
    const dimensionWidth = this.resizeCornerRef.nativeElement.parentNode.offsetWidth;
    const dimensionHeight = this.resizeCornerRef.nativeElement.parentNode.offsetHeight;

    const duringResize = (e: { clientX: number; clientY: number; }) => {
      let dw = dimensionWidth;
      let dh = dimensionHeight;
      if (direction === 'x' || direction === 'xy') {
        if (anchors.includes('left')) {
          this.note.width += ( mouseX - e.clientX );
        } else if (anchors.includes('right')) {
          dw -= ( mouseX - e.clientX );
        }
      }
      if (direction === 'y' || direction === 'xy') {
        if (anchors.includes('top')) {
          dh += ( mouseY - e.clientY );
        } else if (anchors.includes('bottom')) {
          dh -= ( mouseY - e.clientY );
        }
      }

      if (anchors.includes('left')) {
        this.position.x = lastX + e.clientX - mouseX;
        this.size.w = Math.max(dw, this.minSize.w);
      }

      if (anchors.includes('top')) {
        this.position.y = lastY + e.clientY - mouseY;
        this.size.h = Math.max(dh, this.minSize.h);
      }

      if (anchors.includes('bottom') || anchors.includes('right')) {
        this.size.w = Math.max(dw, this.minSize.w);
        this.size.h = Math.max(dh, this.minSize.h);
      }

      this.lastSize = { ...this.size };
    };

    const finishResize = (e: any) => {
      this._document.removeEventListener('mousemove', duringResize);
      this._document.removeEventListener('mouseup', finishResize);
    };

    this._document.addEventListener('mousemove', duringResize);
    this._document.addEventListener('mouseup', finishResize);
  }

}
