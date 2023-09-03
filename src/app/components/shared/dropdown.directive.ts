import {Directive, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input('appDropdown') className = '';
  isClicked = false;

  @HostBinding('class') class = '';
  constructor() {}

  @HostListener('click') mouseclick() {
    if (this.isClicked) {
      this.class = '';
    } else {
      this.class = this.className;
    }

    this.isClicked = !this.isClicked;
  }
}
