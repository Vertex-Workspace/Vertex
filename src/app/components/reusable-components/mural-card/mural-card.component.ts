import { CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, 
         Component, 
         ElementRef, 
         Input, 
         NgZone, 
         OnInit, 
         ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-mural-card',
  templateUrl: './mural-card.component.html',
  styleUrls: ['./mural-card.component.scss'],
})
export class MuralCardComponent implements OnInit, AfterViewInit {

  @Input() 
  task !: Task;

  @ViewChild('resizeBox') resizeBox!: ElementRef;
  @ViewChild('dragHandleCorner') dragHandleCorner!: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight!: ElementRef;
  @ViewChild('dragHandleBottom') dragHandleBottom!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {  
  }

  ngAfterViewInit() {
    this.setAllHandleTransform();
  }

  configItems = [
    { id: 'link', iconClass: 'pi pi-link' },
    { id: 'image', iconClass: 'pi pi-images' },
    { id: 'edit', iconClass: 'pi pi-pencil' },
  ];

  hasImage(): boolean {
    return Object.hasOwn(this.task, 'image');;
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

  dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
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
    this.task.width = width + 'px';
    this.task.height = height + 'px';

    this.setAllHandleTransform();
  }

}
