import { CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Note, NoteGet } from 'src/app/models/class/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, AfterViewInit {

  @Input() 
  note !: NoteGet;

  @Output()
  deleteNoteEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('resizeBox') resizeBox!: ElementRef;
  @ViewChild('dragHandleCorner') dragHandleCorner!: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight!: ElementRef;
  @ViewChild('dragHandleBottom') dragHandleBottom!: ElementRef;

  constructor(
    private ngZone: NgZone, 
    private noteService: NoteService
  ) {}

  basicData: any;
  modalOpen: boolean = false;

  ngOnInit(): void { 
    
  }

  ngAfterViewInit() {
    this.setAllHandleTransform();
  }

  dragEnd(e: any): void {
    this.note.position.x = e.dropPoint.x;
    this.note.position.y = e.dropPoint.y;
    
    this.edit();
    
  }

  toggleModalOpen(): void {
    this.modalOpen = !this.modalOpen
  }

  configItems = [
    { id: 'image', iconClass: 'pi pi-images', onClick: () => this.toggleModalOpen() },
    { id: 'edit', iconClass: 'pi pi-pencil', onClick: () => this.toggleModalOpen() },
    { id: 'trash', iconClass: 'pi pi-trash', onClick: () => this.deleteNote() },
  ];

  hasImage(): boolean {
    return Object.hasOwn(this.note, 'image');;
  }

  get resizeBoxElement(): HTMLElement {
    return this.resizeBox.nativeElement;
  }

  get dragHandleCornerElement(): HTMLElement {
    return this.dragHandleCorner.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  get dragHandleBottomElement(): HTMLElement {
    return this.dragHandleBottom.nativeElement;
  }

  setAllHandleTransform() {
    const rect = this.resizeBoxElement.getBoundingClientRect();
    this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');
    this.setHandleTransform(this.dragHandleRightElement, rect, 'x');
    this.setHandleTransform(this.dragHandleBottomElement, rect, 'y');
  }

  setHandleTransform(
    dragHandle: HTMLElement,
    targetRect: ClientRect | DOMRect,
    position: 'x' | 'y' | 'both'
  ) {
    const dragRect = dragHandle.getBoundingClientRect();
    const translateX = targetRect.width - dragRect.width;
    const translateY = targetRect.height - dragRect.height;

    if (position === 'x') {
      dragHandle.style.transform = `translate(${translateX}px, 0)`;
    }

    if (position === 'y') {
      dragHandle.style.transform = `translate(0, ${translateY}px)`;
    }

    if (position === 'both') {
      dragHandle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }

  dragMove(dragHandle: HTMLElement, $event: any) {
    this.ngZone.runOutsideAngular(() => {
      this.resize(dragHandle, this.resizeBoxElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement) {
    const dragRect = dragHandle.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const width = dragRect.left - targetRect.left + dragRect.width;
    const height = dragRect.top - targetRect.top + dragRect.height;

    target.style.width = width + 'px';
    target.style.height = height + 'px';
    this.note.width = width;
    this.note.height = height;

    this.setAllHandleTransform();
    this.edit();
  }

  deleteNote(): void {
    this.deleteNoteEmitter.emit();
  }

  edit(): void {
    this.noteService
      .patchAttribute(this.note)
      .subscribe();
  }

}
