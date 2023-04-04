import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appHighlightOnHover]",
})
export class HighlightOnHoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.color = this.defaultColor;
  }

  @Input() defaultColor: string = "white";
  @Input() highlight: string = "lime";

  @HostBinding("style.color") color: string = this.defaultColor;

  @HostListener("mouseenter") mouseover(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      "black"
    );

    this.color = this.highlight;
  }

  @HostListener("mouseleave") mouseleave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "background-color",
      "transparent"
    );
    this.color = this.defaultColor;
  }
}
