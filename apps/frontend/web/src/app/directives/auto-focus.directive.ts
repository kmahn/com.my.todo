import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core'

@Directive({
  selector:'autofocus'
})
export class AutoFocus implements OnInit{

  constructor(
    private elementRef: ElementRef
  ){}


  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
